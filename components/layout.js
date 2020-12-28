import React from 'react'
import Meta from './meta'
import Footer from './footer'
import Header from './header'
import Octocat from './octocat'

const Layout = ({ children }) => (
  <>
    <Meta />
    <main className="p-4">
      <Octocat />
      <Header />
      {children}
      <Footer />
    </main>
  </>
)

export default Layout
