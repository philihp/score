import React from 'react'
import Meta from './meta'
import Footer from './footer'
import Header from './header'

const Layout = ({ children }) => (
  <>
    <Meta />
    <main className="p-2">
      <Header />
      {children}
      <Footer />
    </main>
  </>
)

export default Layout
