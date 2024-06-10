import React from 'react'
import { useParams, useLoaderData } from 'react-router-dom'

function Cocktail() {
  const { id } = useParams()
  const { jsonData } = useLoaderData()
  return (
    <div>Cocktail {id}</div>
  )
}

export default Cocktail