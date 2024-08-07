import React from 'react'
import styles from './Catalog.module.css'
import dynamic from 'next/dynamic';
import Filter from './Filter';

const Content = dynamic(
    () => import('./Content'),
    { ssr: false }
)

export default async function Catalog() {
    
    return (
        <div className={styles.container}>
            <Filter/>
            <Content/>
        </div>
    );
}
