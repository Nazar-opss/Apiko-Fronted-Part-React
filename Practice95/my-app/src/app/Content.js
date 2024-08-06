
import React from 'react'

async function getData() {
    const res = await fetch(`https://demo-api.apiko.academy/api/products?offset=0&limit=20&sortBy=latest`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
    }

    return res.json()
}
export default async function Content() {
    const data = await getData()
    console.log(data)
return (
    <div>
        {
            data.map((elem) => {
                return(
                    <div>{elem.title}</div>
                )
            }) 
        }
    </div>
)
}