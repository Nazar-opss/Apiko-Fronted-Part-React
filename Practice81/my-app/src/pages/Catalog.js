import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { CocktailContext } from '../App'
import { useLoaderData, useParams } from 'react-router-dom'
import { RandomCocktail } from './MainPage'
// TODO: ...start separated page about each cocktail 

function Catalog() {
  const { letter, name } = useParams()
  const { jsonData } = useLoaderData()
  console.log(jsonData.drinks)
  // console.log(jsonSearch)
  const FillCatalog = () => {
    const drinks = jsonData.drinks || jsonData
    console.log(drinks)
    return (
      <div className='catalog_container'>
        {
          drinks.map(drink => (
            /* TODO: fix click on cocktail and text it is out of image and text */
            <RandomCocktail 
              key={drink.strDrink} 
              img={drink.strDrinkThumb} 
              drinkName={drink.strDrink} 
              handleOnClick={() => console.log(`Handle ${drink.strDrink} `)} />
          ))
        }
      </div>

    )
  }
  return (
    <div>
      Cocktails for {name || letter}
      <FillCatalog/>
    </div>
  )
}
// letter.toUpperCase(letter) WTF, find smth better
export default Catalog