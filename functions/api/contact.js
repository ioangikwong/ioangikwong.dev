const JSON_HEADERS = { "Content-Type": "application/json" };

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ error: "RESEND_API_KEY not configured" }),
      { status: 500, headers: JSON_HEADERS }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON" }),
      { status: 400, headers: JSON_HEADERS }
    );
  }

  const { nom, courriel, message } = body;

  if (!nom || !courriel || !message) {
    return new Response(
      JSON.stringify({ error: "Missing fields" }),
      { status: 400, headers: JSON_HEADERS }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL || "onboarding@resend.dev",
        to: "ioan@ioangikwong.dev",
        reply_to: courriel,
        subject: `Nouveau message de ${nom}`,
        text: [`Nom: ${nom}`, `Courriel: ${courriel}`, "", message].join("\n"),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response(
        JSON.stringify({ error: `Resend: ${err}` }),
        { status: 500, headers: JSON_HEADERS }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: JSON_HEADERS }
    );
  } catch (error) {
    console.error("Resend error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: JSON_HEADERS }
    );
  }
}
