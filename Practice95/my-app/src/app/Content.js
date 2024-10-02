'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { Item } from './Item'
import { useDispatch, useSelector } from 'react-redux'
import LoaderLine from './Loader';
import { unstable_noStore } from 'next/cache';
import { fetchCountries, fetchItemsList, fetchUniversal, loadMore } from './state/slice/FetchSlice';
import { usePathname, useSearchParams } from 'next/navigation';

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
    // unstable_noStore() find a way to use it with suspense
    const [limit, setLimit] = useState(0)
    const fetchSearch = useSelector((state) => state.fetch.fetches)
    const isLoading = useSelector((state) => state.fetch.isLoading)
    // const limit = useSelector((state) => state.fetch.limit)
    // style no results and fix for first render

    const searchParams = useSearchParams()
    const pathname = usePathname()

    // const { replace } = useRouter()

    const dispatch = useDispatch()

    console.log(limit)
    console.log(fetchSearch)
    const handleMore = (limit) => {
        const params = new URLSearchParams(searchParams)
        setLimit(limit + 12)
        dispatch(loadMore())
        dispatch(fetchUniversal({limit, categoryId: searchParams.get('id'), sortBy: searchParams.get('sortBy')}))
    }
return (
    <>
        
        <LoaderLine isLoading={isLoading}/>
    {/* <Suspense fallback={<Skeleton className="w-[209px] h-[212px] "/>}> */}
    <Suspense fallback={<Skeleton className="w-[209px] h-[212px] "/>}>
    {
        fetchSearch?.length 
        ? <>
            <div className="flex justify-between items-center flex-wrap w-full mt-5">
                {   
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
            <button 
                onClick={() => handleMore(limit)}
                type="button" 
                className="text-white bg-blue_btn w-full max-w-[150px] mt-10 font-medium rounded text-sm  leading-6 px-4 py-1.5 mb-[85px] hover:opacity-80">
                Load More...
            </button>
        </> 
        : <div className=' text-center w-full h-full flex flex-col mt-[209px] justify-center items-center'> 
            <h1 className='text-[#101010] text-lg font-bold max-w-[347px] leading-[26.44px] tracking-[0.5px]'>
                No Results Found
            </h1>
            <span className='text-[15px] text-dark_1 max-w-[347px] mt-[10px] leading-[22px]'>
                We did not find any article that matches this search
                Make sure that the search text is entered correctly
                Try using other search criteria
            </span>
        </div>
    }
    </Suspense>
    {/* </Suspense> */}
    {/* <Skeleton  className="w-[209px] h-[212px] "/> */}
            
    </>
)
}