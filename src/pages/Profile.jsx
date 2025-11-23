import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Profile(){
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const logoutAndLoginAnother = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="container section">
      <h1 style={{fontSize:32, fontWeight:800}}>Profile</h1>
      <div className="card" style={{padding:24, marginTop:24}}>
        <div style={{fontWeight:600}}>Name</div>
        <div style={{marginBottom:12}}>{user?.name}</div>
        <div style={{fontWeight:600}}>Email</div>
        <div>{user?.email}</div>

        <div style={{marginTop:18, display:'flex', gap:12}}>
          <button className="btn" onClick={logout}>Log out</button>
          <button className="btn btn-primary" onClick={logoutAndLoginAnother}>Log out & sign in another account</button>
        </div>
      </div>
    </div>
  )
}
