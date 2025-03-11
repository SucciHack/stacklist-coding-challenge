import ListContainer from '@/components/UI-components/list-container'
import { NavBar } from '@/components/UI-components/navbar'
import React from 'react'

export default function page() {
  return (
    <div>
      <NavBar/>
      <div className='min-h-screen'>
        <ListContainer/>
      </div>
    </div>
  )
}
