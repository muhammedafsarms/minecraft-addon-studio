import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are a Minecraft Bedrock Addon Expert.

When asked to create an addon:
- Generate addon structure
- Generate BP files
- Generate RP files
- Generate recipes
- Explain folder structure

Return clear text.
`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    });

    return Response.json({
      success: true,
      response: completion.choices[0].message.content
    });

  } catch (error) {

    return Response.json({
      success: false,
      error: error.message
    });

  }
}