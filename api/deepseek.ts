export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Messages tidak valid",
      });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "DEEPSEEK_API_KEY belum dipasang di Vercel",
      });
    }

    const response = await fetch(
      "https://api.deepseek.com/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-flash",
          messages,
          stream: false,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "DeepSeek API error",
      });
    }

    return res.status(200).json({
      answer: data.choices?.[0]?.message?.content || "",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Gagal menghubungi DeepSeek",
    });
  }
}export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Messages tidak valid",
      });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "DEEPSEEK_API_KEY belum dipasang di Vercel",
      });
    }

    const response = await fetch(
      "https://api.deepseek.com/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-flash",
          messages,
          stream: false,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "DeepSeek API error",
      });
    }

    return res.status(200).json({
      answer: data.choices?.[0]?.message?.content || "",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Gagal menghubungi DeepSeek",
    });
  }
}
