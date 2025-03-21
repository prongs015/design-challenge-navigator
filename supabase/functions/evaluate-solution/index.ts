
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
    const { solution, challenge } = await req.json();

    if (!geminiApiKey) {
      throw new Error('Gemini API key is not configured');
    }

    if (!solution || !challenge) {
      throw new Error('Missing required parameters: solution or challenge');
    }

    console.log("Evaluating solution for challenge:", challenge.title);

    // Build a prompt for the AI to evaluate the solution
    const prompt = `
      You are an expert design mentor evaluating a product design solution.
      
      Challenge details:
      Title: ${challenge.title}
      Company: ${challenge.company}
      Description: ${challenge.description}
      Requirements: ${JSON.stringify(challenge.requirements)}
      
      User's solution: ${solution}
      
      Please evaluate this solution on a scale of 1-100 based on the following criteria:
      1. Problem Understanding (25 points) - How well did they understand the core problem?
      2. Design Thinking (25 points) - How creative and methodical was their approach?
      3. Requirements Fulfillment (25 points) - How well did they address the stated requirements?
      4. Communication (25 points) - How clearly did they articulate their solution?
      
      For each criterion, provide:
      - A score (out of 25)
      - A brief explanation of the score
      - One specific suggestion for improvement
      
      Finally, provide an overall score (sum of the four categories) and a summary paragraph with actionable feedback.
      
      Format your response as a JSON object with the following structure:
      {
        "problem_understanding": { "score": number, "feedback": "string", "improvement": "string" },
        "design_thinking": { "score": number, "feedback": "string", "improvement": "string" },
        "requirements_fulfillment": { "score": number, "feedback": "string", "improvement": "string" },
        "communication": { "score": number, "feedback": "string", "improvement": "string" },
        "overall_score": number,
        "summary": "string"
      }
    `;

    // Call Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiApiKey
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      })
    });

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      console.error("Unexpected API response:", data);
      throw new Error('Failed to get evaluation from AI');
    }

    let evaluation;
    try {
      // Parse the AI response as JSON
      const content = data.candidates[0].content.parts[0].text;
      // Find the JSON object in the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not extract JSON from the response');
      }
      evaluation = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", e);
      console.log("Raw response:", data.candidates[0].content.parts[0].text);
      throw new Error('Failed to parse evaluation results');
    }

    return new Response(JSON.stringify(evaluation), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in evaluate-solution function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
