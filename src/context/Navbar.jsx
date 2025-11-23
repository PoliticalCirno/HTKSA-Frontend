import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'

const sports = ['soccer','basketball','baseball','hockey']

export default function Navbar(){
  const { user, logout } = useAuth()
  const { items } = useCart()

  return (
    <>
      <Link to="/" className="brand">
        <div className="brand-logo" />
        <span>HTKSA</span>
      </Link>

      <nav className="nav-links">
        {sports.map(s => (
          <NavLink key={s} to={`/sports/${s}`} className={({isActive}) => isActive ? 'active' : ''}>
            {s}
          </NavLink>
        ))}
      </nav>

      <div className="nav-right">
        <Link to="/cart" style={{position:'relative', display:'inline-block'}}>
          <span className="material-icons-outlined" style={{verticalAlign:'middle'}}>shopping_cart</span>
          {items.length>0 && <span className="cart-dot">{items.length}</span>}
        </Link>
        {!user ? (
          <>
            <Link to="/login" style={{fontSize:14}}>Login</Link>
            <Link to="/signup" className="btn btn-primary" style={{fontSize:14}}>Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/profile" style={{fontSize:14}}>Hi, {user.name.split(' ')[0]}</Link>
            <button onClick={logout} className="btn" style={{fontSize:14, background:'#fee2e2', color:'#b91c1c'}}>Logout</button>
          </>
        )}
      </div>
    </>
  )
}
