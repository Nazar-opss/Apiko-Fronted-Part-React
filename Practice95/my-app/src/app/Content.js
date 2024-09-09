'use client'
import React from 'react'
import { Item } from './Item'
import { useSelector } from 'react-redux'

    // make fetch better https://www.youtube.com/watch?v=MBlZ8Wzkbi4
    
async function getData() {
    const res = await fetch(`https://demo-api.apiko.academy/api/products?offset=0&limit=12&sortBy=latest`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Content() {

    const fetchSearch = useSelector((state) => state.fetch.fetches)

    const data = await getData()
    
    console.log(data)
    console.log(fetchSearch)
return (
    <>
    <div className="flex justify-between  flex-wrap w-full mt-5">
        {
            // make fetch with search
            //data.map((elem) => {
            fetchSearch.map((elem) => {
                return(
                    <Item
                        key={elem.id}
                        id={elem.id}
                        price={elem.price}
                        title={elem.title}
                        picture={elem.picture}
                    />
                )
            }) 
        }
    </div>
        <button 
            type="button" 
            className="text-white bg-blue_btn w-full max-w-[150px] mt-10 font-medium rounded text-sm  leading-6 px-4 py-1.5 mb-[85px] hover:opacity-80">
            Load More...
        </button>
    </>
)
}