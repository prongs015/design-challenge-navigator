
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

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
    const { message, challenge, history } = await req.json();

    if (!geminiApiKey) {
      throw new Error('Gemini API key is not configured');
    }

    if (!message || !challenge) {
      throw new Error('Missing required parameters: message or challenge');
    }

    console.log("Processing chat assistant request for challenge:", challenge.title);

    // Convert the chat history to the format Gemini expects
    const formattedHistory = history.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Build a prompt for the AI to assist with whiteboarding
    const systemPrompt = {
      role: "system",
      parts: [{ 
        text: `
          You are an expert design mentor helping a user with a whiteboarding challenge.
          
          Challenge details:
          Title: ${challenge.title}
          Company: ${challenge.company}
          Description: ${challenge.description}
          Requirements: ${JSON.stringify(challenge.requirements)}
          
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

    // Call Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent', {
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

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      console.error("Unexpected API response:", data);
      throw new Error('Failed to get response from AI');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-assistant function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
