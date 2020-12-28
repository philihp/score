import React from 'react'
import Link from 'next/link'

const Header = () => (
  <>
    <h1>Kennerspiel</h1>
    <Link href="/games">
      <a>games</a>
    </Link>
  </>
)

export default Header
