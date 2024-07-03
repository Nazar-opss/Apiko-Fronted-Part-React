import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { CocktailContext } from '../App'
import { useLoaderData, useParams, useNavigate } from 'react-router-dom'
// TODO: ...start separated page about each cocktail 

const Cocktail = (props) => {
  return ( 
    <div className='catalog_cocktail' onClick={props.handleOnClick}>    
      <img src={props.img} alt={props.drinkName} className='catalog_cocktail_img'></img>
      <div className='catalog_cocktail_nb'>
        <h3>{props.drinkName}</h3>
        {/* <NavLink to={`cocktail/${props.idDrink}`}>{props.drinkName}</NavLink> */}
      </div>
    </div>
  )
}

function Catalog() {
  const { letter, name } = useParams()
  const { jsonData } = useLoaderData()
  const navigate = useNavigate();
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
            <Cocktail 
              key={drink.strDrink} 
              img={drink.strDrinkThumb} 
              drinkName={drink.strDrink} 
              // idDrink={drink.idDrink}
              handleOnClick={() =>  navigate(`../cocktail/${drink.idDrink}`)} 
            />
          ))
        }
      </div>

    )
  }
  return (
    <div>
      <h4>
        Cocktails for {name || letter}
      </h4>
      <FillCatalog/>
    </div>
  )
}
// letter.toUpperCase(letter) WTF, find smth better
export default Catalog