const FAQ = [
  { q: /return|refund/i, a: 'We offer 30-day returns on unused items with tags. Keep your receipt or order email.' },
  { q: /ship|delivery|shipping/i, a: 'Standard shipping arrives in 3–7 business days. Free over $75 within Canada/US.' },
  { q: /size|fit/i, a: 'Most shoes run true-to-size. For wide feet, consider half-size up. Apparel size guides are on each product page.' },
  { q: /soccer|basketball|baseball|hockey/i, a: 'Looking for gear by sport? Try “Show me hockey sticks” or open the Hockey category from the header.' },
]
export async function reply(text){
  const hit = FAQ.find(f => f.q.test(text))
  if (hit) return hit.a
  if (/recommend|best|suggest/i.test(text)) {
    if (/soccer/i.test(text)) return 'Top soccer pick: Velocity Pro Cleats for grip and touch.'
    if (/basket/i.test(text)) return 'Hoops favorite: Skyline Highs — great ankle support and bounce.'
    if (/baseball/i.test(text)) return 'For sluggers: Slugger Bat Elite — balanced swing and pop.'
    if (/hockey/i.test(text)) return 'On the ice: Glacier Stick Pro — lightweight with great flex.'
    return 'Check our Featured section on the home page for staff picks.'
  }
  return "I’m not sure yet, but I’m learning. Ask about returns, shipping, sizing, or say a sport like ‘soccer’."
}
