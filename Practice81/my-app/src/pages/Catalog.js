import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { CocktailContext } from '../App'
import { useLoaderData, useParams } from 'react-router-dom'

// TODO: Make catalog great again!

function Catalog() {
  const { letter } = useParams()
  const { jsonData } = useLoaderData()
  console.log(jsonData)

  return (
    <div>
      Cocktails for {letter}
    </div>
  )
}

export default Catalog