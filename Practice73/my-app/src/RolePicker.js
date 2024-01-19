import React, { useState } from 'react'
import home_work from './home_work.svg'
import business_center from './business_center.svg'
import arrow_right from './arrow_right.svg'

function RolePicker() {
    const [active, setActive] = useState("");
    const handleClick = (event) => {
        setActive(event.target.id);
    }
    const role_choice_title = {fontWeight: '500', letterSpacing: '0.15px', lineHeight: '28px'}
    const role_choice_desc = {fontSize: '13px', lineHeight: '15px'}
    return (
        <div className='form'>
            <div className='container'>
                <h5 style={{marginBottom:'45px', marginTop: '0px'}}>Which describes you best?</h5>
                <div className='role_selector'>
                    <form>
                    {/* Переробити це в компоненти і передавати текст і стилін пропсою */}
                        <input type='radio' id='homework' name='role' className='role_radio'></input>
                        <label htmlFor='homework' className='role_choice'>
                            <img src={home_work} alt='icon' className='role_icon'></img>
                            <div className='role_text' style={{padding: '14px 0px', width:'100%'}}>
                                <p style={role_choice_title}>Homeowner</p>
                                <p style={role_choice_desc}>I am a homeowner or interesed in home design.</p>
                            </div>
                        </label>
                        <input type='radio' id='professional' name='role' className='role_radio'></input>
                        <label htmlFor='professional' className='role_choice'>
                            <img src={business_center} alt='icon' className='role_icon'></img>
                            <div className='role_text' style={{padding: '14px 0px'}}>
                                <p style={role_choice_title}>Professional</p>
                                <p style={role_choice_desc}>I offer home improvement services or sell home products.</p>
                            </div>
                        </label>
                        <input type="submit" value='Next' className='role_submit'></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RolePicker