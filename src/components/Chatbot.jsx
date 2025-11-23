// src/components/Chatbot.jsx
import { useEffect, useRef, useState } from 'react'
import { askAI } from '../utils/ai.js'
import { useToast } from '../context/ToastContext.jsx'

export default function Chatbot(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef()
  const startY = useRef(null)
  const currentY = useRef(0)
  const sheetRef = useRef()
  const { toast } = useToast()

  useEffect(()=>{
    if(listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, open])

  const send = async (e) => {
    if(e) e.preventDefault()
    if(!text.trim()) return
    const userMsg = { role: 'user', text }
    setMessages(m => [...m, userMsg])
    setText('')
    setLoading(true)
    try{
      const reply = await askAI(text)
      setMessages(m => [...m, { role: 'bot', text: reply }])
    }catch(err){
      console.error(err)
      setMessages(m => [...m, { role: 'bot', text: 'Sorry, I could not reach the AI service.' }])
      toast('AI service error')
    }finally{ setLoading(false) }
  }

  // Touch handlers for mobile bottom-sheet swipe-to-dismiss
  const onTouchStart = (e) => {
    if(e.touches && e.touches.length === 1){
      startY.current = e.touches[0].clientY
      currentY.current = 0
      if(sheetRef.current) sheetRef.current.style.transition = 'none'
    }
  }
  const onTouchMove = (e) => {
    if(startY.current == null) return
    const y = e.touches[0].clientY
    const dy = y - startY.current
    if(dy > 0){
      currentY.current = dy
      if(sheetRef.current) sheetRef.current.style.transform = `translateY(${dy}px)`
    }
  }
  const onTouchEnd = () => {
    if(startY.current == null) return
    if(currentY.current > 120){
      // dismiss
      setOpen(false)
    }else{
      // snap back
      if(sheetRef.current){
        sheetRef.current.style.transition = 'transform 220ms ease'
        sheetRef.current.style.transform = 'translateY(0)'
      }
    }
    startY.current = null
    currentY.current = 0
  }

  return (
    <div>
      <button className="fab" onClick={()=>setOpen(v=>!v)} aria-label="Toggle chat" aria-expanded={open}>🤖</button>
      {open && (
        <div
          className="chatbox chatbox-glass"
          ref={sheetRef}
          role="dialog"
          aria-label="Sports assistant chat"
          style={{right:24, bottom:96}}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="chatbox-head" style={{backgroundImage: `url('https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=1200&auto=format&fit=crop')`}}>
            <div className="chatbox-head-content">
              <div style={{fontWeight:800}}>Sports Assistant</div>
              <div style={{fontSize:12, color:'rgba(255,255,255,.95)'}}>Ask about gear, sizing, or orders</div>
            </div>
            <button type="button" className="btn btn-close" onClick={()=>setOpen(false)} aria-label="Close chat" style={{position:'absolute', right:10, top:10}}>✕</button>
          </div>
          <div ref={listRef} className="chatbox-list">
            {messages.map((m, i) => (
              <div key={i} className={m.role==='bot' ? 'msg msg-bot' : 'msg msg-user'}>{m.text}</div>
            ))}
            {loading && <div className="msg msg-bot">Typing…</div>}
          </div>
          <form onSubmit={send} className="chatbox-form">
            <input aria-label="Message" className="input" placeholder="Ask about products, sizing, or orders…" value={text} onChange={e=>setText(e.target.value)} />
            <button className="btn btn-primary" type="submit" disabled={loading} aria-disabled={loading}>{loading ? '...' : 'Send'}</button>
          </form>
        </div>
      )}
    </div>
  )
}
