import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import * as api from '../utils/fakeApi.js'

export default function Reviews({ productId }) {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  useEffect(() => {
    let cancelled = false
    api.listReviews(productId).then(data => {
      if (!cancelled) {
        setReviews(data)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [productId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const saved = await api.saveReview({
        productId,
        rating: Number(rating),
        comment
      })
      setReviews(prev => {
        const idx = prev.findIndex(r => r.id === saved.id)
        if (idx >= 0) {
          const copy = [...prev]
          copy[idx] = saved
          return copy
        }
        return [saved, ...prev]
      })
      setComment('')
    } catch (err) {
      alert(err.message || 'Could not save review')
    }
  }

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <section className="section" style={{ marginTop: 32, background: '#f9fafb' }}>
      <div className="container">
        <h2 style={{ fontSize: 24, marginBottom: 8 }}>Customer reviews</h2>

        {avgRating && (
          <div style={{ marginBottom: 16, fontSize: 14 }}>
            Average rating: <strong>{avgRating}</strong> / 5 · {reviews.length} review{reviews.length !== 1 && 's'}
          </div>
        )}

        {user ? (
          <form
            onSubmit={handleSubmit}
            style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}
          >
            <div>
              <label style={{ fontSize: 14, fontWeight: 500 }}>
                Rating
                <select
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  style={{ marginLeft: 8 }}
                >
                  {[5, 4, 3, 2, 1].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="What did you think about this product?"
                rows={3}
                style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ddd' }}
                required
              />
            </div>
            <button className="btn btn-primary" type="submit" style={{ alignSelf: 'flex-start' }}>
              Submit review
            </button>
          </form>
        ) : (
          <p style={{ fontSize: 14, marginBottom: 24 }}>
            <Link to="/login">Log in</Link> to write a review.
          </p>
        )}

        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p style={{ fontSize: 14 }}>No reviews yet. Be the first to review!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {reviews.map(r => (
              <div
                key={r.id}
                style={{ padding: 12, borderRadius: 12, border: '1px solid #eee', background: '#fff' }}
              >
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {r.userName || 'Anonymous'} · {r.rating}★
                </div>
                <div style={{ fontSize: 13, color: '#555', marginTop: 4 }}>
                  {r.comment}
                </div>
                <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>
                  {new Date(r.updatedAt || r.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
