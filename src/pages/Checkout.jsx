import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { processPayment } from '../utils/fakeApi.js'
import { useCart } from '../context/CartContext.jsx'

export default function Checkout(){
  const { items, total, clear } = useCart()
  const navigate = useNavigate()
  const [card, setCard] = useState({ name:'', number:'', exp:'', cvv:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const pay = async (e) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try{
      const res = await processPayment({ amount: total, card })
      setSuccess(res)
      clear()
      // navigate to a simple confirmation (or keep on page)
      // show confirmation for a moment then go home
      setTimeout(()=> navigate('/'), 2000)
    }catch(err){
      setError(err.message)
    }finally{ setLoading(false) }
  }

  if(items.length===0 && !success) return (
    <div className="container section">
      <h2>Your cart is empty.</h2>
    </div>
  )

  return (
    <div className="container section">
      <h1 style={{fontSize:28, fontWeight:800}}>Checkout</h1>
      {success ? (
        <div className="card mt-4">
          <h2>Payment successful</h2>
          <p>Order ID: {success.id}</p>
          <p>Amount charged: ${success.amount.toFixed(2)}</p>
        </div>
      ) : (
        <form onSubmit={pay} className="card mt-4" style={{display:'grid', gap:12}}>
          <div style={{fontWeight:700}}>Total: ${total.toFixed(2)}</div>
          <label>Cardholder name<input className="input" value={card.name} onChange={e=>setCard({...card, name:e.target.value})} required /></label>
          <label>Card number<input className="input" value={card.number} onChange={e=>setCard({...card, number:e.target.value})} required /></label>
          <div style={{display:'flex', gap:8}}>
            <label style={{flex:1}}>Expiry<input className="input" value={card.exp} onChange={e=>setCard({...card, exp:e.target.value})} required /></label>
            <label style={{width:120}}>CVV<input className="input" value={card.cvv} onChange={e=>setCard({...card, cvv:e.target.value})} required /></label>
          </div>
          {error && <div style={{color:'#b91c1c'}}>{error}</div>}
          <div style={{display:'flex', gap:12}}>
            <button type="button" className="btn" onClick={()=>navigate(-1)}>Back</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Processing...' : 'Pay now'}</button>
          </div>
        </form>
      )}
    </div>
  )
}
