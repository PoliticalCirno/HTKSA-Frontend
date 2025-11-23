import ProductCard from '../components/ProductCard.jsx'

export default function Products(){
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <h1 style={{fontSize:28, fontWeight:800}}>All Products</h1>
        </div>

        <div className="mt-6 grid cols-2 md-cols-3 lg-cols-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  )
}
