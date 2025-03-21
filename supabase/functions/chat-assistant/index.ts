
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      console.error('Failed to parse request body:', error);
      return new Response(JSON.stringify({ error: 'Invalid request format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { message, challenge, history } = requestBody;

    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY is not configured in environment variables');
      return new Response(JSON.stringify({ 
        error: 'Gemini API key is not configured',
        details: 'The GEMINI_API_KEY environment variable is missing or empty' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!message) {
      console.error('Missing required parameter: message');
      return new Response(JSON.stringify({ error: 'Missing required parameter: message' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log("Processing chat assistant request for challenge:", challenge?.title || "Unknown challenge");
    console.log("Using Gemini API key:", geminiApiKey ? "Key is present (not showing for security)" : "Missing key");

    // Convert the chat history to the format Gemini expects
    const formattedHistory = history && history.length > 0 
      ? history.map((msg) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }))
      : [];

    // Build a prompt for the AI to assist with whiteboarding
    const systemPrompt = {
      role: "system",
      parts: [{ 
        text: `
          You are an expert design mentor helping a user with a whiteboarding challenge.
          
          ${challenge ? `
          Challenge details:
          Title: ${challenge.title || 'Untitled Challenge'}
          Company: ${challenge.company || 'Unknown Company'}
          Description: ${challenge.description || 'No description provided'}
          Requirements: ${challenge.requirements ? JSON.stringify(challenge.requirements) : 'No specific requirements'}
          ` : 'The user is working on a design challenge.'}
          
          Your role is to guide the user through their whiteboarding process. Be helpful, prompt them with 
          good questions, and offer constructive advice. Help them:
          
          1. Understand the problem space
          2. Define user needs and requirements
          3. Brainstorm creative solutions
          4. Structure their whiteboard effectively
          5. Develop clear user flows and wireframes
          6. Articulate their design decisions
          
          Be concise and practical in your responses. Focus on helping them develop a structured approach 
          to the challenge. Provide specific suggestions rather than general advice. If they ask for specific
          examples or templates, provide them.
        `
      }]
    };

    console.log("Sending request to Gemini API...");
    
    // Call Gemini API with proper error handling
    try {
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
      
      console.log(`Making request to: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': geminiApiKey
        },
        body: JSON.stringify({
          contents: [
            systemPrompt,
            ...formattedHistory,
            {
              role: "user",
              parts: [{ text: message }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API error (${response.status}):`, errorText);
        
        // Try to parse the error for more details
        let parsedError = "Unknown API error";
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error) {
            parsedError = `${errorData.error.message || errorData.error.status || "API Error"}`;
            console.error("Structured API error:", errorData.error);
          }
        } catch (e) {
          // If parsing fails, use the raw error text
          parsedError = errorText || `HTTP Error ${response.status}`;
        }
        
        throw new Error(`Gemini API error: ${parsedError}`);
      }

      const data = await response.json();
      console.log("Response data structure:", JSON.stringify(Object.keys(data)));
      
      if (!data.candidates || data.candidates.length === 0) {
        console.error("Unexpected API response:", JSON.stringify(data));
        
        // Check for specific error patterns in the response
        if (data.error) {
          console.error("API error details:", data.error);
          throw new Error(`Gemini API error: ${data.error.message || JSON.stringify(data.error)}`);
        }
        
        if (data.promptFeedback && data.promptFeedback.blockReason) {
          throw new Error(`Content blocked by Gemini: ${data.promptFeedback.blockReason}`);
        }
        
        throw new Error('Failed to get response from Gemini AI (no candidates returned)');
      }

      const aiResponse = data.candidates[0].content.parts[0].text;
      console.log("Successfully received response from Gemini API");

      return new Response(JSON.stringify({ response: aiResponse }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (apiError) {
      console.error('Error calling Gemini API:', apiError);
      return new Response(JSON.stringify({ 
        error: 'Failed to communicate with Gemini AI',
        details: apiError.message || 'Unknown API error'
      }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Unexpected error in chat-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error', 
      details: error.message || 'Unknown error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
