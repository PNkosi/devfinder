import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='bg-background px-6'>
      <div className='container flex items-center justify-between h-[10dvh] '>
        <h3 className='tracking-widest'>devfinder</h3>
        <ThemeSwitcher />
      </div>
    </nav>
  )
}

export default Navbar