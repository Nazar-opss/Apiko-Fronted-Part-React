import React from 'react'
import arrow_left from './arrow_left.svg'

const PrevSubButton = (props) => {
    return (
        <div className='form_buttons'>
            <button className='form_previous' onClick={props.prevHandle}>
                <img src={arrow_left} alt='arrow'></img>
                Previous
            </button>
            <button className='form_continue' onClick={props.nextHandle} disabled={props.disabled}>
                {props.continue}
            </button>
        </div>
    )
}

export default PrevSubButton