import React, { useContext, useState, useCallback, memo, useReducer, useMemo } from 'react'
import { useEffect } from 'react';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CocktailContext } from '../App';

const RandomCocktail = memo((props) => {
  return ( 
    <div className='random_cocktail'>
      <img src={props.img} alt={props.drinkName} className='random_cocktail_img'></img>
      <div className='random_cocktail_nb'>
        <h3>{props.drinkName}</h3>
        {props.order}
      </div>
    </div>
  )
})

// TODO: Find why page re fetching cocktail when adding to cart

const Order = memo((props) => {
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
})

// fix re render

const useFetchCocktails = () => {
    const [cocktail, setCocktail] = useState('')
    const context = useContext(CocktailContext)
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          // await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
          //   .then(async response => await response.json())
          //   .then(data => setCocktail(data.drinks[0]))
          //   .catch((error) => console.log(error));
          const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
          const jsonData = await response.json();
          setCocktail(jsonData.drinks[0]);
        } catch (error) {
          console.log("Error", error)
        }
      }
      fetchData()
  }, [])
    return { cocktail }
  }

function MainPage () { 
  const context = useContext(CocktailContext)
  const [numberCart, setNumber] = useState(0)
  const { cocktail } = useFetchCocktails()
  

  function handleClick() {
      setNumber(numberCart => numberCart + 1)
  }
  
console.log(cocktail)
const { strDrinkThumb, strDrink } = cocktail
return useMemo(() =>{
  return (
    <div className=''>
      <h2  >Для вибору коктейлю скористайтесь пошуком або фільтром</h2>
      <div className='random'>
        <h2>Персональна рекомендація: {numberCart}</h2>
        <RandomCocktail img={strDrinkThumb} drinkName={strDrink} 
        order={<Order handleClick={() => context.dispatch({type: 'increment'})} />}/>    
        {/* order={<Order handleClick={handleClick} />}/>     */}
      </div>
    </div>
  )
}, [strDrink, strDrinkThumb, context, numberCart])
}

export default MainPage