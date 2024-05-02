import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { CocktailContext } from '../App'
import { useLoaderData, useParams } from 'react-router-dom'

// TODO: Make catalog great again! and again!

function Catalog() {
  const { letter } = useParams()
  const { jsonData } = useLoaderData()
  console.log(jsonData.drinks)

  const FillCatalog = () => {
    const drinks = jsonData.drinks
    return (
      <>
        {
          drinks.map(drink => (
            <div key={drink.strDrink}>{drink.strDrink}</div>
          ))
        }
      </>

    )
  }
  return (
    <div>
      Cocktails for {letter.toUpperCase(letter)}
      <FillCatalog/>
    </div>
  )
}
// letter.toUpperCase(letter) WTF, find smth better
export default Catalog