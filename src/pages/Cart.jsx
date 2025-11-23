import { useCart } from '../context/CartContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Cart(){
  const { items, setQty, remove, clear, total } = useCart()
  const navigate = useNavigate()
  return (
    <div className="container section">
      <h1 style={{fontSize:32, fontWeight:800}}>Your Cart</h1>
      {items.length===0 ? (
        <p className="mt-4" style={{color:'var(--muted)'}}>Cart is empty.</p>
      ) : (
        <div className="mt-6" style={{display:'grid', gap:12}}>
          {items.map(p => (
            <div key={p.id} className="card" style={{display:'flex', alignItems:'center', gap:14}}>
              <img src={p.image} alt={p.name} style={{height:80, width:100, objectFit:'cover', borderRadius:12}} />
              <div style={{flex:1}}>
                <div style={{fontWeight:600}}>{p.name}</div>
                <div style={{fontSize:14, color:'var(--muted)'}}>${p.price.toFixed(2)}</div>
              </div>
              <input type="number" min="1" value={p.qty} onChange={e=>setQty(p.id, parseInt(e.target.value||'1'))} className="input" style={{width:70}} />
              <button onClick={()=>remove(p.id)} className="btn" style={{background:'#fee2e2', color:'#b91c1c'}}>Remove</button>
            </div>
          ))}
          <div className="row">
            <div style={{fontSize:18, fontWeight:700}}>Total: ${total.toFixed(2)}</div>
              <div style={{display:'flex', gap:12}}>
              <button onClick={clear} className="btn">Clear</button>
              <button onClick={()=>navigate('/checkout')} className="btn btn-primary">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
