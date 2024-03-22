import React, { useState } from 'react'
import { useEffect } from 'react';

function Main() {

  const [cocktail, setCocktail] = useState('')

//   const useFetchRandom = () => {
 
  
//   return { cocktail };
// }
const fetch = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data)
    setCocktail(data)
  } catch (error) {
      console.log("Error", error)
  } finally {
    console.log('Finally')
  }
}
  useEffect(() => {
    fetch()
  }, [])
// const { cocktail } = useFetchRandom()
// console.log(cocktail)
  return (
    <div className=''>
      <h2  >Для вибору коктейлю скористайтесь пошуком або фільтром</h2>
    </div>
  )
}

export default Main