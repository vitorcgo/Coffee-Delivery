import { useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Checkout } from './pages/Checkout'
import { Home } from './pages/Home'
import { Success } from './pages/Success'

export function App() {
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)

  useEffect(() => {
    const titles: Record<string, string> = {
      '/checkout': 'Complete seu pedido | Coffee Delivery',
      '/success': 'Pedido confirmado | Coffee Delivery',
    }
    document.title = titles[pathname] ?? 'Coffee Delivery'
    window.scrollTo(0, 0)
    if (previousPath.current !== pathname) {
      document.getElementById('conteudo')?.focus({ preventScroll: true })
      previousPath.current = pathname
    }
  }, [pathname])

  return (
    <>
      <a href="#conteudo" className="skip-link">Ir para o conteúdo</a>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
