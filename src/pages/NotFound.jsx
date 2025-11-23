import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="container" style={{padding:'96px 0', textAlign:'center'}}>
      <h1 style={{fontSize:64, fontWeight:900}}>404</h1>
      <p style={{color:'var(--muted)'}}>We couldn’t find that page.</p>
      <Link className="btn btn-primary" style={{marginTop:24}} to="/">Go Home</Link>
    </div>
  )
}
