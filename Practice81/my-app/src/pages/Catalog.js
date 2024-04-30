import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { CocktailContext } from '../App'

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
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
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

function Catalog() {
  const { cocktail } = useFetchCocktails()

  return (
    <>
      HYI
    </>
  )
}

export default Catalog