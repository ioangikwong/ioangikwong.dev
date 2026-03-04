export async function onRequestPost(context) {
  const { request, env } = context;

  const { nom, courriel, message } = await request.json();

  if (!nom || !courriel || !message) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "forms@ioangikwong.dev",
        to: "ioan@ioangikwong.dev",
        reply_to: courriel,
        subject: `Nouveau message de ${nom}`,
        text: [`Nom: ${nom}`, `Courriel: ${courriel}`, "", message].join("\n"),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return Response.json({ error: "Failed to send" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Failed to send" }, { status: 500 });
  }
}
