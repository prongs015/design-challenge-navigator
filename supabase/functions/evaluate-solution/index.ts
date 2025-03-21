
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { solution, challenge } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
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
      
      User's solution/reflection: ${solution}
      
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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert design evaluator that provides detailed, constructive feedback.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      console.error("Unexpected API response:", data);
      throw new Error('Failed to get evaluation from AI');
    }

    let evaluation;
    try {
      // Parse the AI response as JSON
      const content = data.choices[0].message.content;
      evaluation = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", e);
      console.log("Raw response:", data.choices[0].message.content);
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
