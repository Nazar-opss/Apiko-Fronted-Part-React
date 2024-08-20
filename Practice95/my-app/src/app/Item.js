import Image from "next/image"

export const Item = (props) => { 
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