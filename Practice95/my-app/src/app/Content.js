'use client'
import React, { Suspense, useEffect } from 'react'
import { Item } from './Item'
import { useSelector } from 'react-redux'
import LoaderLine from './Loader';

    // make fetch better https://www.youtube.com/watch?v=MBlZ8Wzkbi4
    
// async function getData() {
//     const res = await fetch(`https://demo-api.apiko.academy/api/products?offset=0&limit=12&sortBy=latest`)
//     // The return value is *not* serialized
//     // You can return Date, Map, Set, etc.

//     if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//     }

//     return res.json()
// }
function Skeleton({ className }) {
    return <div className={`bg-orange_main/70 motion-safe:animate-pulse ${className}`} />;
}

export default function Content() {
    const fetchSearch = useSelector((state) => state.fetch.fetches)
    const isLoading = useSelector((state) => state.fetch.isLoading)
    // style no results and fix for first render
    console.log(fetchSearch)
    console.log(isLoading)
return (
    <>
        
        <LoaderLine isLoading={isLoading}/>
    {/* <Suspense fallback={<Skeleton className="w-[209px] h-[212px] "/>}> */}
    <Suspense fallback={<Skeleton className="w-[209px] h-[212px] "/>}>
    {
        fetchSearch?.length 
        ? <div className="flex justify-between flex-wrap w-full mt-5">
            {
                //data.map((elem) => {
                
                // make another name 
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
        : <div className=' text-center max-w-[347px]'> 
            <h1 className='text-[#101010] text-lg font-bold leading-[26.44px] tracking-[0.5px]'>
                No Results Found
            </h1>
            <span className='text-[15px] text-dark_1 leading-[22px]'>
                We did not find any article that matches this search
                Make sure that the search text is entered correctly
                Try using other search criteria
            </span>
        </div>
    }
    </Suspense>
    {/* </Suspense> */}
    <Skeleton  className="w-[209px] h-[212px] "/>
            
    </>
)
}