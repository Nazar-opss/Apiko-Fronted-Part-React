import React, { useContext, useEffect } from 'react'
import { useParams, useLoaderData } from 'react-router-dom'
import { Order } from './MainPage'
import { CocktailContext } from '../App'

function Cocktail() {
  const { id } = useParams()
  const { jsonData } = useLoaderData()
  const context = useContext(CocktailContext)

  const handleSubmit = () => {
    context.setNumber(context.numberCart + 1)
    context.addToCart(jsonData.drinks[0])
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(context.cartItems));
  }, [context.cartItems]);

  const { strDrink, strDrinkThumb } = jsonData.drinks[0]

  return (
    <div className='cocktailPage'>
      <h4>
        {strDrink}
      </h4>
      <img src={strDrinkThumb} alt={strDrink} className='cocktailPage_img'></img>
      <Order handleClick={handleSubmit}/>
    </div>

  )
}

export default Cocktail