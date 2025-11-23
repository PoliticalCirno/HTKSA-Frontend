import { useCart } from '../context/CartContext.jsx'
import { Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext.jsx'

export default function ProductCard({ product }){
  const { add } = useCart()
  const { toast } = useToast()
  return (
    <div className="card" style={{display:'flex', flexDirection:'column'}}>
      <Link to={`/product/${product.id}`} style={{display:'block', borderRadius:12, overflow:'hidden'}}>
        <img src={product.image} alt={product.name} style={{aspectRatio:'4/3', objectFit:'cover', width:'100%'}} />
      </Link>
      <div style={{marginTop:12, flex:1}}>
        <Link to={`/product/${product.id}`} style={{textDecoration:'none', color:'inherit'}}>
          <div style={{fontWeight:600}}>{product.name}</div>
        </Link>
        <div style={{fontSize:14, color:'var(--muted)'}}>{product.brand}</div>
      </div>
      <div style={{marginTop:12, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <span style={{fontWeight:700}}>${product.price.toFixed(2)}</span>
        <button className="btn btn-primary" onClick={()=>{ add(product); toast('Added to cart') }}>Add to Cart</button>
      </div>
    </div>
  )
}
