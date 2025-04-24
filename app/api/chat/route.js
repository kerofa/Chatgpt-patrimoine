import OpenAI from "openai";

export async function POST(req) {
  try {
    const { message } = await req.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Tu es un expert en gestion de patrimoine, tutoiement, direct." },
        { role: "user", content: message },
      ],
    });
    return new Response(JSON.stringify({ response: completion.choices[0].message.content }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ response: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}