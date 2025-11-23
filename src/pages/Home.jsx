import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import products from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home(){
  const featured = products.slice(0,8)
  const images = [
    { url: "https://images7.alphacoders.com/932/932702.jpg", category: 'soccer' },
    { url: "https://media.cnn.com/api/v1/images/stellar/prod/160204101907-nba-slam-dunk-5.jpg?q=w_4725,h_2658,x_0,y_0,c_fill", category: 'basketball' },
    { url: "https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/96487370-fd0f-41eb-b635-fab751973027/7d63fa99b54c512c5b83be83766162997974c3e4.jpg?host=wbd-images.prod-vod.h264.io&partner=beamcom", category: 'baseball' },
    { url: "https://house-fastly-signed-us-east-1-prod.brightcovecdn.com/image/v1/static/6415718365001/f7808ef6-b438-47af-be0c-6ac729853b6b/44373612-e210-4ace-94bc-f867724cb06a/1280x720/match/image.jpg?fastly_token=NmFlNTRkZjVfYzljMjQ3YzQ4NzA3OGU4NDFiZmYwZmZkNjA2NjVlZGQ0ZjI5OGIzZmI2NGUxNGMwYWU4Y2I2YWQ5NzQzNjU1N19odHRwczovL2hvdXNlLWZhc3RseS1zaWduZWQtdXMtZWFzdC0xLXByb2QuYnJpZ2h0Y292ZWNkbi5jb20vaW1hZ2UvdjEvc3RhdGljLzY0MTU3MTgzNjUwMDEvZjc4MDhlZjYtYjQzOC00N2FmLWJlMGMtNmFjNzI5ODUzYjZiLzQ0MzczNjEyLWUyMTAtNGFjZS05NGJjLWY4Njc3MjRjYjA2YS8xMjgweDcyMC9tYXRjaC9pbWFnZS5qcGc%3D", category: 'hockey' }
  ]

  const [idx, setIdx] = useState(0)
  useEffect(()=>{
    const t = setInterval(()=> setIdx(i => (i+1) % images.length), 3000)
    return ()=> clearInterval(t)
  }, [images.length])

  return (
    <div>
      <Link to={`/sports/${images[idx].category}`} style={{textDecoration:'none', color:'inherit'}} aria-label={`Open ${images[idx].category} category`}>
      <section className="hero">
        <div className="hero-slides">
          {images.map((img, i) => (
            <div
              key={i}
              className={`hero-slide ${i === idx ? 'active' : ''}`}
              style={{ backgroundImage: `url('${img.url}')` }}
            />
          ))}
        </div>
        <div className="hero-overlay">
          <div className="container">
            <h1>Move Different.</h1>
            <p className="mt-2">Premium gear for Soccer, Basketball, Baseball, and Hockey. Designed for performance, tuned for style.</p>
            <div className="mt-6" style={{display:'flex', flexWrap:'wrap', gap:12}} role="navigation" aria-label="Shop categories">
              {['soccer','basketball','baseball','hockey'].map(s => (
                <Link key={s} to={`/sports/${s}`} className="shop-btn" aria-label={`Shop ${s}`}>Shop {s}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      </Link>

      <section className="section">
        <div className="container">
          <div className="row">
            <h2 className="m-0" style={{fontSize:24, fontWeight:800}}>Featured</h2>
            <Link to="/products" className="browse-all">Browse all</Link>
          </div>
          <div className="mt-6 grid cols-2 md-cols-3 lg-cols-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
