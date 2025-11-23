import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup(){
  const { signup } = useAuth()
  const nav = useNavigate()
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault(); setError('')
    try { await signup(name, email, password); nav('/') } catch (err) { setError(err.message) }
  }

  return (
    <div className="container" style={{padding:'64px 0', maxWidth:520}}>
      <h1 style={{fontSize:32, fontWeight:800}}>Create account</h1>
      <form className="form" onSubmit={submit}>
        {error && <div style={{color:'#b91c1c', fontSize:14}}>{error}</div>}
        <input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn btn-primary" style={{width:'100%'}}>Sign up</button>
        <p style={{fontSize:14}}>Already have an account? <Link to="/login" style={{color:'var(--accent)'}}>Login</Link></p>
      </form>
    </div>
  )
}
