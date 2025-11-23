import { useParams } from 'react-router-dom'
import SportHero from '../components/SportHero.jsx'
import products from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Sports(){
  const { sport } = useParams()
  const list = products.filter(p => p.category === sport)

  return (
    <div>
      <SportHero sport={sport} />
      <div className="container" style={{paddingBottom:48}}>
        {list.length===0 ? <p>No products found.</p> : (
          <div className="grid cols-2 md-cols-3 lg-cols-4">
            {list.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
