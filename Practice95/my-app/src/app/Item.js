'use client'
import Image from "next/image"
import Item_like from "../../public/item_like.svg"
import { useDispatch, useSelector } from "react-redux"
import Favorite_CTA from "./Favorite_CTA"
import { useState } from "react"
import { addFavorite } from "./state/slice/UserSlice"

export const Item = (props) => { 
    const [isOpen, setIsOpen] = useState(false)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    const {id} = props

    const closeModal = () => {
        setIsOpen(false)
    };
    
    const handleLike = (id) => {
        console.log(isOpen)
        if (isLoggedIn === false) {
            setIsOpen(true)
        } else {
            dispatch(addFavorite(id))
        }
    }

    return(
        <div className="w-full max-w-[209px] max-h-[212px] mb-2.5 flex flex-col relative justify-between bg-white border border-dark_3 rounded-sm shadow item-shadow dark:bg-gray-800 dark:border-gray-700" >
            <a href="#" className='flex justify-center'>
                <Image
                    className='max-w-[201px] max-h-[147px] mt-1 rounded-[3px] mb-[6px] object-contain'
                    src={props.picture}
                    alt={props.title}
                    width={201}
                    height={147}
                />
            </a>
            
            {
                isLoggedIn === false && isOpen && <Favorite_CTA close={closeModal} isOpen={isOpen}/>
            }
            <div className='w-full h-full max-w-[30px] max-h-[30px] right-[8px] drop-shadow-md absolute rounded-[100%] bottom-[46px] bg-white flex justify-center items-center'>
                <Item_like width='18' onClick={() => handleLike(id)} height='17' className=' hover:fill-dark_2 hover:cursor-pointer'/>
            </div>
            <div className="px-3">
                <a href="#">
                    <h5 className="truncate text-[15px] tracking-tight text-gray-900 dark:text-dark_1">{props.title}</h5>
                </a>
                <div className="flex items-center justify-between align-text-bottom mb-[5px]">
                    <span className="text-lg font-bold text-gray-900 dark:text-dark_1">${props.price}</span>
                </div>
            </div>
        </div>
    )
}