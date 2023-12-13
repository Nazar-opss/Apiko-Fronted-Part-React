import React from 'react'
import { MenuLinks } from '../utils/constants'
import MenuItem from './MenuItem'
function Menu() {
    const Menu = MenuLinks.map(elem =>{
        return(
            <MenuItem key={elem.title}
                title={elem.title}
                link={elem.link}
            />
        ) 
    })
  return (
    <div className='header'>{Menu}</div>
  )
}

export default Menu