// Lightweight AI helper. Uses OpenAI Chat Completions if VITE_OPENAI_KEY is provided.
export async function askAI(prompt) {
  const key = import.meta.env.VITE_OPENAI_KEY
  if (!key) {
    // fallback canned response for development
    return `Hi! I don't have an API key configured. You asked: "${prompt}" — this is a sample reply. Set VITE_OPENAI_KEY in your .env to enable real AI replies.`
  }

  const url = 'https://api.openai.com/v1/chat/completions'
  const body = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful sports gear assistant. Answer concisely and suggest related products when helpful.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 500,
    temperature: 0.6
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`AI API error: ${res.status} ${txt}`)
  }

  const data = await res.json()
  // extract assistant message
  const msg = data?.choices?.[0]?.message?.content
  return msg || 'Sorry, I could not generate a response.'
}
