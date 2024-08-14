
import Image from 'next/image'
import React from 'react'

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

const Item = (props) => { 
    return(
        <div class="w-full max-w-[209px] max-h-[212px] mb-2.5 flex flex-col relative justify-between bg-white border border-dark_3 rounded-sm shadow item-shadow dark:bg-gray-800 dark:border-gray-700" >
            <a href="#" className='flex justify-center'>
                <Image
                    className='max-w-[201px] max-h-[147px] mt-1 rounded-[3px] mb-[6px] object-contain'
                    src={props.picture}
                    alt={props.title}
                    width={201}
                    height={147}
                />
            </a>

            <div className='w-full h-full max-w-[30px] max-h-[30px] right-[8px] drop-shadow-md absolute rounded-[100%] bottom-[46px] bg-white flex justify-center'>
                <Image
                    src='/item_like.svg'
                    alt='item like button'
                    width={18}
                    height={17}
                />
            </div>
            <div class="px-3">
                <a href="#">
                    <h5 class="truncate text-[15px] tracking-tight text-gray-900 dark:text-dark_1">{props.title}</h5>
                </a>
                <div class="flex items-center justify-between align-text-bottom mb-[5px]">
                    <span class="text-lg font-bold text-gray-900 dark:text-dark_1">${props.price}</span>
                </div>
            </div>
        </div>
    )
}

export default async function Content() {
    const data = await getData()
    
    console.log(data)
return (
    <>
    <div className='flex justify-between flex-wrap w-full mt-5'>
        {
            data.map((elem) => {
                return(
                    <Item
                        key={elem.id}
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
            class="text-white bg-blue_btn w-full max-w-[150px] mt-10 font-medium rounded text-sm  leading-6 px-4 py-1.5 mb-[85px] hover:opacity-80">
            Load More...
        </button>
    </>
)
}