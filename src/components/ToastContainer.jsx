import { useToast } from '../context/ToastContext.jsx'

export default function ToastContainer(){
  const { toasts, remove } = useToast()
  return (
    <div style={{position:'fixed', right:16, top:16, display:'grid', gap:8, zIndex:9999}}>
      {toasts.map(t => (
        <div key={t.id} className="card" style={{padding:'10px 14px', minWidth:200}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:8}}>
            <div>{t.message}</div>
            <button onClick={()=>remove(t.id)} className="btn" style={{padding:'4px 8px'}}>x</button>
          </div>
        </div>
      ))}
    </div>
  )
}
