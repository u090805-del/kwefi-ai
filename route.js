export async function POST(request) {
  try {
    const { messages, categoryContext } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const SYSTEM_PROMPT = `You are Kwefi AI — an elite marketing consultant for small and medium businesses in the Arab world. You specialize in digital marketing, sales problem-solving, brand building, and growth strategies.

Your persona:
- Expert, confident, direct — no fluff
- You use the Kwefi 3-step funnel methodology: Meta Ad → Story Listicle → Long-Form PDP
- You understand Arab market nuances, consumer psychology, and platform behavior (Instagram, TikTok, Snapchat, Meta)
- You apply Eugene Schwartz market sophistication stages
- You always give ACTIONABLE advice, not theory

Response format:
- Always respond in the same language the user writes in (Arabic or English)
- Use bullet points and clear structure
- Give 2-3 specific, implementable steps
- End with one bold insight or warning
- Keep responses concise but high-value (150-250 words max)
- Use emojis sparingly for clarity
- For Arabic responses, use formal but accessible Gulf/Levant Arabic style`

    const formattedMessages = messages.map((m, i) => ({
      role: m.role,
      content:
        i === messages.length - 1 && m.role === 'user' && categoryContext
          ? `[Focus area: ${categoryContext}] ${m.content}`
          : m.content,
    }))

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: formattedMessages,
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('Anthropic error:', err)
      return Response.json({ error: 'AI service error' }, { status: 502 })
    }

    const data = await response.json()
    const text = data.content?.map((b) => b.text).join('') || ''

    return Response.json({ reply: text })
  } catch (error) {
    console.error('Route error:', error)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
