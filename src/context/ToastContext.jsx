/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message, opts = {}) => {
    const id = Date.now() + Math.random()
    const t = { id, message, ...opts }
    setToasts((s) => [...s, t])
    if(!opts.sticky){
      setTimeout(() => setToasts((s) => s.filter(x => x.id !== id)), opts.duration || 2500)
    }
    return id
  }, [])

  const remove = useCallback((id) => setToasts((s) => s.filter(t => t.id !== id)), [])

  return (
    <ToastContext.Provider value={{ toast, remove, toasts }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast(){ return useContext(ToastContext) }
