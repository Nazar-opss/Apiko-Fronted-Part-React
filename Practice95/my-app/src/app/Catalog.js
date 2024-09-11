import React, { Suspense } from 'react'
import styles from './Catalog.module.css'
import dynamic from 'next/dynamic';

const Content = dynamic(
    () => import('./Content'),
    { ssr: false }
)
const Filter = dynamic(
    () => import('./Filter'),
    { ssr: false }
    
)

// TODO: get out fetch from here
async function getCategories() {
    const res = await fetch(`https://demo-api.apiko.academy/api/categories`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Catalog() {
    const categories = await getCategories()

    function Skeleton({ className }) {
        return <div className={`bg-orange_main/70 motion-safe:animate-pulse ${className}`} />;
    }

    return (
        <div className={styles.container}>
            <Filter categories={categories}/>
            <Suspense fallback={<Skeleton  className="w-[209px] h-[212px] "/>}>
                <Content/>
            </Suspense>
            <button 
                type="button" 
                className="text-white bg-blue_btn w-full max-w-[150px] mt-10 font-medium rounded text-sm  leading-6 px-4 py-1.5 mb-[85px] hover:opacity-80">
                Load More...
            </button>
        </div>
    );
}
