import NavigationElement from '@/components/shared/navigation'
import React from 'react'

function Header() {
  return (
      <div className='flex items-center justify-between m-4'>
          <div>
              Logo
          </div>
          <div className='flex gap-x-2'>
            <NavigationElement title='Home'/>
            <NavigationElement title='About'/>
            <NavigationElement title='Contact Us'/>
          </div>
    </div>
  )
}

export default Header