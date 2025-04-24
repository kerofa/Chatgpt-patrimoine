import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { firstName, lastName, email, phone, agreeCallback } = await req.json();
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: `\"Chatbot Patrimoine\" <${process.env.SMTP_USER}>`,
      to: process.env.RDV_RECIPIENT_EMAIL,
      subject: "Demande de RDV via Chatbot",
      html: `
        <h3>Demande de RDV</h3>
        <p><strong>Prénom :</strong> ${firstName}</p>
        <p><strong>Nom :</strong> ${lastName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Accepte rappel :</strong> ${agreeCallback ? "Oui" : "Non"}</p>
      `,
    });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("RDV error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}