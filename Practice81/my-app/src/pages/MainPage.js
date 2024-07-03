import React, { useContext, useState, useCallback, memo, useReducer, useMemo } from 'react'
import { useEffect } from 'react';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink, useNavigate } from "react-router-dom";
import { CocktailContext } from '../App';

export const RandomCocktail = (props) => {
  const navigate = useNavigate();
  return ( 
    <div className='random_cocktail' onClick={props.handleOnClick}>
      <img 
        src={props.img} 
        alt={props.drinkName} 
        onClick={() => navigate(`catalog/cocktail/${props.idDrink}`)} 
        className='random_cocktail_img'>
      </img>
      <div className='random_cocktail_nb'>
        <h3 onClick={() => navigate(`catalog/cocktail/${props.idDrink}`)}>{props.drinkName}</h3>
        {props.order}
      </div>
    </div>
  )
}

export const Order = (props) => {
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
      const fetchData = async () => {
        try {
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

function MainPage (props) { 
  const context = useContext(CocktailContext)
  
  const { cocktail } = useFetchCocktails()
  
  const { strDrinkThumb, strDrink, idDrink } = cocktail
  
  const handleSubmit = () => {
    context.setNumber(context.numberCart + 1)
    context.addToCart(cocktail)    
  }

console.log(cocktail)
  return (
    <div className=''>
      <h2  >Для вибору коктейлю скористайтесь пошуком або фільтром</h2>
      <div className='random'>
        <h2>Персональна рекомендація: {}</h2>
        <RandomCocktail 
          img={strDrinkThumb} 
          drinkName={strDrink} 
          order={<Order handleClick={handleSubmit} />}
          idDrink={idDrink}
          />
      </div>
    </div>
  )
}

export default MainPage