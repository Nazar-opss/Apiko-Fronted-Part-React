'use client'
import React, { useEffect, useState } from 'react'
import CartItem from '../CartItem'

function CartComponent() {
    const [cartItems, setCartItems] = useState()
   
    useEffect(() => {
        let cartItems = sessionStorage.getItem('items')    
        cartItems = JSON.parse(cartItems)
        setCartItems(cartItems)
        console.log(cartItems)
    },[])

  return (
    <div className='w-full h-full max-w-[984px] min-h-full bg-white border border-[#E4E4E4] drop-shadow-md m-auto'>
        <p className='mt-[70px] ml-[39px] text-[25px] leading-[36.72px] tracking-[0.4px]'>Cart</p>
        <div className='mt-8 ml-[37px] flex'>
            <div className='flex flex-col justify-between'>
                {
                    cartItems?.map((elem) => {
                        return(
                            <CartItem
                                key={elem.id}
                                picture={elem.picture}
                                title={elem.title}
                                alt={elem.title}
                                price={elem.price}
                                totalPrice={elem.totalPrice}
                                quantity={elem.quantity}
                            />
                        )
                    })
                }
            </div>
            <div className='flex border-l-[1px] border-[#ECEEF0] h-[526px] ml-[88px] mr-[46px] '></div>
            <form>

            </form>
        </div>
    </div>
  )
}
// make form
export default CartComponent