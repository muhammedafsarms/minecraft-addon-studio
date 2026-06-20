import Groq from "groq-sdk";

const groq = new Groq({
apiKey: process.env.GROQ_API_KEY
});

export async function POST(req) {
try {
const { prompt } = await req.json();

const completion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  temperature: 0.3,
  messages: [
    {
      role: "system",
      content: `

You are a Minecraft Bedrock Addon Generator.

Return ONLY valid JSON.

Format:

{
"files": [
{
"path": "BP/manifest.json",
"content": "{...}"
}
]
}

Rules:

- Return JSON only

- No markdown

- No code fences

- No explanations

- Always include a files array
  `
  },
  {
  role: "user",
  content: prompt
  }
  ]
  });
  
  const aiResponse =
  completion.choices[0].message.content;
  
  console.log("AI RESPONSE:");
  console.log(aiResponse);
  
  return Response.json({
  success: true,
  response: aiResponse
  });
  
  } catch (error) {
  
  console.error(error);
  
  return Response.json({
  success: false,
  error: error.message
  });
  }
  }