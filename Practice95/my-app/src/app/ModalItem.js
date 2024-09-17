'use client'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemDetails } from './state/slice/FetchSlice'

const ModalItem = (props) => {
    const itemInfo = useSelector((state) => state.fetch.itemInfo)
    const {picture, title, price, description} = itemInfo
    const [quantity, setQuantity] =useState(1)
    const [totalPrice, setTotal] =useState(1)

    useEffect(() => {
        setTotal(price)
        console.log(totalPrice)
    }, [price])
    // console.log(totalPrice)
    
    // fix total prices
    const increase = () => {
        setQuantity(quantity + 1)
        setTotal(price * quantity)
        console.log(totalPrice)
    }

    const decrease = () => {
        setQuantity(quantity - 1)
        setTotal(totalPrice - price)
        console.log(totalPrice)
    }
    return (
        <div>
            <Dialog
            open={props.isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={props.close}
            >
            <DialogBackdrop className="fixed inset-0 bg-black/70" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                <div className="flex flex-col min-h-full items-center justify-center p-4 ">
                <DialogPanel
                    transition
                    className="w-full max-w-[1003px] h-full max-h-[697px] rounded duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                    <div className='bg-white'>
                        <DialogTitle as="h3" className="text-center text-dark_1 relative">
                            <Image
                            onClick={props.close}
                            className='absolute right-[35px] top-[35px] cursor-pointer'
                            src='/close.svg'
                            alt='Close button'
                            width={18}
                            height={18}
                            />
                        </DialogTitle>
                        <div className='flex px-[87px] pt-[141px] pb-[127px]'>
                            {picture ? (
                            <div className='border border-[#E4E4E4] rounded-[3px] max-w-[411px] max-h-[300px] items-center justify-center flex '>
                                <Image
                                    className='max-w-[401px] max-h-[296px] m-1 rounded-[3px] object-contain'
                                    src={picture}
                                    alt={title || 'Image description'}
                                    width={401}
                                    height={296}
                                />
                            </div>
                            ) : (
                            <p>Loading image...</p>
                            )}
                            <div className='flex flex-col ml-[38.42px] max-w-[321px]'>
                                <p className='text-dark_1 font-bold text-lg leading-[26.44px] tracking-[0.5px]'>
                                    {title}
                                </p>
                                <span className='text-dark_2 text-[15px] leading-[22.03px] mt-[10px]'>
                                    {description}
                                </span>
                                <span className='text-dark_1 text-sm font-medium leading-[26px]'>
                                    PRICE <span className='ml-[154px] text-dark_1 font-bold text-lg leading-[26.44px] tracking-[0.5px]'>${price}</span>
                                </span>
                                <div className='flex max-w-[81px] justify-between'>
                                    <button 
                                        className='text-dark_2 w-full h-full max-w-[26px] max-h-[26px] rounded-[100%] bg-dark_3 flex justify-center items-center'
                                        onClick={() => decrease()}
                                        disabled={quantity <= 0}
                                    >
                                        -
                                    </button>
                                    <div className='text-[15px] leading-[22.03px]'>
                                        {quantity}
                                    </div>
                                    <button 
                                        className='w-full h-full text-dark_2  max-w-[26px] max-h-[26px] rounded-[100%] bg-dark_3 flex justify-center items-center'
                                        onClick={() => increase()}
                                    >
                                        +
                                    </button>
                                </div>
                                <p>Items:    {quantity}</p>
                                <p>Total:    {totalPrice}</p>

                            </div>
                        </div>
                    </div>
                </DialogPanel>
                </div>
            </div>
            </Dialog>
        </div>
    )
}

export default ModalItem