import OpenAI from "openai";

export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log("🔑 Clé OK :", Boolean(process.env.OPENAI_API_KEY));
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en gestion de patrimoine. Tu tutoies et donnes des réponses directes et humaines."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    return new Response(
      JSON.stringify({ response: chatCompletion.choices[0].message.content }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("🔥 Erreur dans /api/chat :", error);
    // On renvoie l’erreur brute pour debug dans le client
    return new Response(
      JSON.stringify({ response: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
