import React from 'react'

function MenuItem({title, link}) {
  const handler = (e) => {
    console.log(title)
    if (link == null) {
      alert("This page is under construction yet")
    }
  }
  return (
    <a className='menuLinks' href={link} target="_blank" rel='noreferrer' onClick={handler}>{title}</a>
  )
}

export default MenuItem