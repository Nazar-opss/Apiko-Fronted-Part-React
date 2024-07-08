import React from 'react'
import { useLoaderData, useParams, useNavigate } from 'react-router-dom'

const Cocktail = (props) => {
  return ( 
    <div className='catalog_cocktail' onClick={props.handleOnClick}>    
      <img src={props.img} alt={props.drinkName} className='catalog_cocktail_img'></img>
      <div className='catalog_cocktail_nb'>
        <h3>{props.drinkName}</h3>
      </div>
    </div>
  )
}

function Catalog() {
  const { letter, name } = useParams()
  const { jsonData } = useLoaderData()
  const navigate = useNavigate();
  console.log(jsonData.drinks)
  const drinks = jsonData.drinks

  const FillCatalog = () => {

    if ( drinks === null) {
      return <h4>Коктейлів не знайдено</h4>
    } else {
      return (
        <div className='catalog_container'>
          {
            drinks.map(drink => (
              <Cocktail 
                key={drink.strDrink} 
                img={drink.strDrinkThumb} 
                drinkName={drink.strDrink} 
                handleOnClick={() =>  navigate(`../cocktail/${drink.idDrink}`)} 
              />
            ))
          }
        </div>
      )
    }
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

export default Catalog