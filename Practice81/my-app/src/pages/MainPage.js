import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CocktailContext } from '../App';

const RandomCocktail = (props) => {
  return ( 
    <div className='random_cocktail'>
      <img src={props.img} alt={props.drinkName} className='random_cocktail_img'></img>
      <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop:'10px'}}>
        <h3>{props.drinkName}</h3>
        {props.order}
      </div>
    </div>
  )
}

// TODO: Find why page re fetching cocktail when adding to cart

const Order = (props) => {
  return (
    <Button onClick={props.handleClick} variant="contained" endIcon={<ShoppingCartIcon />} 
      sx={{
        backgroundColor:'black',
        ':hover': {
          backgroundColor: '#ed6c02'
        }
      }}>
      Замовити
    </Button>
  )
}


const useFetchCocktails = () => {
    const [cocktail, setCocktail] = useState('')
    const context = useContext(CocktailContext)
    useEffect(() => {
      const fetch = async () => {
        try {
          await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(async response => await response.json())
            .then(data => setCocktail(data.drinks[0]))
            .catch((error) => console.log(error));
        } catch (error) {
          console.log("Error", error)
        }
      }
      fetch()
  }, [context.number])
    return { cocktail }
  }

function MainPage() {
  const context = useContext(CocktailContext)
  
  const { cocktail } = useFetchCocktails()

  // useEffect(() => {
  //   // const fetch = async () => {
  //   //   const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  //   //   const newData = await response.json();
  //   //   setCocktail(newData);
  //   fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  //     .then(response => response.json())
  //     .then(data => setCocktail(data.drinks[0]))
  //     .catch((error) => console.log(error));
  //   console.log("foe")
  //   // fetch()
  // }, [context.number])
console.log(cocktail)
const { strDrinkThumb, strDrink } = cocktail
  return (
    <div className=''>
      <h2  >Для вибору коктейлю скористайтесь пошуком або фільтром</h2>
      <div className='random'>
        <h2>Персональна рекомендація</h2>
        <RandomCocktail img={strDrinkThumb} drinkName={strDrink} order={<Order handleClick={context.handleClick} />}/>    
      </div>
    </div>
  )
}

export default MainPage