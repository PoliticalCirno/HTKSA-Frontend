import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login(){
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault(); setError('')
    try { await login(email, password); nav('/') } catch (err) { setError(err.message) }
  }

  return (
    <div className="container" style={{padding:'64px 0', maxWidth:520}}>
      <h1 style={{fontSize:32, fontWeight:800}}>Login</h1>
      <form className="form" onSubmit={submit}>
        {error && <div style={{color:'#b91c1c', fontSize:14}}>{error}</div>}
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn btn-primary" style={{width:'100%'}}>Sign in</button>
        <p style={{fontSize:14}}>No account? <Link to="/signup" style={{color:'var(--accent)'}}>Create one</Link></p>
      </form>
    </div>
  )
}
