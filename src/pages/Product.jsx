import { useParams, Link } from 'react-router-dom'
import products from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import { useState, useEffect } from 'react'

export default function Product(){
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const [active, setActive] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  useEffect(()=>{
    const onKey = (e) => { if(e.key === 'Escape') setZoomOpen(false) }
    if(zoomOpen) window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [zoomOpen])

  if(!product) return (
    <div className="section">
      <div className="container">
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/">Back to home</Link>
      </div>
    </div>
  )

  // Since product data only includes one image, create a small gallery by reusing the image and placeholders
  const gallery = [product.image, product.image, product.image]

  const others = products.filter(p => p.id !== product.id && p.category === product.category).slice(0,4)

  return (
    <>
    <div className="section">
      <div className="container">
        <div style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:24}}>
          <div>
            <div className="product-gallery" style={{borderRadius:12, overflow:'hidden'}} tabIndex={0} onKeyDown={(e)=>{
              if(e.key === 'ArrowRight') setActive((a)=> (a+1) % gallery.length)
              if(e.key === 'ArrowLeft') setActive((a)=> (a-1+gallery.length) % gallery.length)
            }}>
              {gallery.map((g, i) => (
                <img
                  key={i}
                  src={g}
                  alt={`${product.name} ${i}`}
                  className={`product-main ${i === active ? 'active' : ''}`}
                  style={{width:'100%', height:420, objectFit:'cover', cursor: i===active ? 'zoom-in' : 'default'}}
                  onClick={() => { if(i===active) setZoomOpen(true) }}
                />
              ))}
            </div>

            <div style={{display:'flex', gap:8, marginTop:12}}>
              {gallery.map((g, i) => (
                <button key={i} type="button" onClick={()=>setActive(i)} aria-pressed={i===active} className={`thumb ${i===active? 'thumb-active':''}`} style={{border:0, padding:0, background:'none', borderRadius:8}}>
                  <img src={g} alt={`${product.name} ${i}`} style={{width:100, height:70, objectFit:'cover', borderRadius:8, boxShadow: i===active ? '0 6px 18px rgba(0,0,0,.12)' : 'none'}} />
                </button>
              ))}
            </div>

            <h1 style={{marginTop:18}}>{product.name}</h1>
            <p style={{color:'var(--muted)'}}>Brand: {product.brand} • Category: {product.category}</p>
            <p style={{marginTop:12}}>{product.description}</p>
          </div>

          <aside>
            <div className="card">
              <div style={{fontSize:20, fontWeight:800}}>${product.price.toFixed(2)}</div>
              <div style={{marginTop:12}}>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>

            <div style={{marginTop:18}}>
              <h3>Other {product.category} products</h3>
              <div style={{display:'grid', gap:12, marginTop:8}}>
                {others.map(p=> (
                  <Link key={p.id} to={`/product/${p.id}`} style={{textDecoration:'none'}}>
                    <div style={{display:'flex', gap:12, alignItems:'center'}}>
                      <img src={p.image} alt={p.name} style={{width:64, height:48, objectFit:'cover', borderRadius:8}} />
                      <div style={{fontSize:14}}>{p.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
    {zoomOpen && (
      <div className="lightbox" role="dialog" aria-label="Image preview" onClick={(e)=>{ if(e.target.classList.contains('lightbox')) setZoomOpen(false) }}>
        <div className="lightbox-inner">
          <button type="button" className="btn btn-close" onClick={()=>setZoomOpen(false)} aria-label="Close image">✕</button>
          <img src={gallery[active]} alt={product.name} style={{maxWidth:'92vw', maxHeight:'92vh', objectFit:'contain'}} />
        </div>
      </div>
    )}
    </>
  )
}
