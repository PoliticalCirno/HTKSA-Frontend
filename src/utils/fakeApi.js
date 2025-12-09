const USERS_KEY = 'htksa_users_v1'
const SESSION_KEY = 'htksa_session_v1'
const REVIEWS_KEY = 'htksa_reviews_v1'

function saveUsers(users){ localStorage.setItem(USERS_KEY, JSON.stringify(users)) }
function loadUsers(){ return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') }

export function getCurrentUser(){
  const email = localStorage.getItem(SESSION_KEY)
  if (!email) return null
  const users = loadUsers()
  return users.find(u => u.email === email) || null
}

export async function login(email, password){
  const users = loadUsers()
  const u = users.find(u => u.email === email && u.password === password)
  if (!u) throw new Error('Invalid credentials')
  localStorage.setItem(SESSION_KEY, u.email)
  return { name: u.name, email: u.email }
}
export async function signup(name, email, password){
  const users = loadUsers()
  if (users.some(u => u.email === email)) throw new Error('Email already used')
  const u = { name, email, password }
  users.push(u); saveUsers(users)
  localStorage.setItem(SESSION_KEY, email)
  return { name, email }
}
export function logout(){ localStorage.removeItem(SESSION_KEY) }

// Simulate a payment processor. Resolves with an order id or rejects on failure.
export async function processPayment({ amount, card }){
  // card: { name, number, exp, cvv }
  return new Promise((resolve, reject) => {
    // basic validation
    if(!card || !card.number) return reject(new Error('Invalid card'))
    setTimeout(() => {
      // simulate a decline when card number ends with 0 (for testing)
      if(String(card.number).slice(-1) === '0') {
        return reject(new Error('Card was declined'))
      }
      const orderId = 'ord_' + Date.now()
      resolve({ id: orderId, amount })
    }, 1000)
  })
}


function loadReviews() {
  return JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]')
}

function saveAllReviews(reviews) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
}

// Get all reviews for one product
export async function listReviews(productId) {
  const all = loadReviews()
  return all
    .filter(r => r.productId === productId)
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
}

// Create or update a review for the current user
export async function saveReview({ productId, rating, comment }) {
  const user = getCurrentUser()
  if (!user) throw new Error('You must be logged in to leave a review')

  const all = loadReviews()
  const now = new Date().toISOString()

  const idx = all.findIndex(
    r => r.productId === productId && r.userEmail === user.email
  )

  let review
  if (idx >= 0) {
    review = { ...all[idx], rating, comment, updatedAt: now }
    all[idx] = review
  } else {
    review = {
      id: 'rev_' + Date.now(),
      productId,
      userEmail: user.email,
      userName: user.name || user.email.split('@')[0],
      rating,
      comment,
      createdAt: now,
      updatedAt: now,
    }
    all.push(review)
  }

  saveAllReviews(all)
  return review
}
