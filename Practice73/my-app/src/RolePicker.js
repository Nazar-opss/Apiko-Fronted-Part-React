import React, { useState } from 'react'
import home_owner from './home_work.svg'
import business_center from './business_center.svg'
import arrow_right from './arrow_right.svg'

const Role = (props) =>{
    return(
        <>
            <input type='radio' id={props.role_name} name='role' className='role_radio'></input>
            <label htmlFor={props.role_name} className='role_choice'>
                <img src={props.icon} alt='icon' className='role_icon'></img>
                <div className='role_text' style={{ padding: '14px 0px', width: '100%' }}>
                    <p style={props.titleStyle}>{props.title}</p>
                    <p style={props.descStyle}>{props.desc}</p>
                </div>
            </label>
        </>
    )
}

function RolePicker() {
    const [active, setActive] = useState("");
    const handleClick = (event) => {
        setActive(event.target.id);
    }

    function onSubmit(event) {
        console.log("OK")
        event.preventDefault();
    }
    const role_choice_title = {fontWeight: '500', letterSpacing: '0.15px', lineHeight: '28px'}
    const role_choice_desc = {fontSize: '13px', lineHeight: '15px'}
    const roleText = {
        homeowner: {
            title: 'Homeowner',
            desc: 'I am a homeowner or interesed in home design.'
        },
        professional: {
            title: 'Professional',
            desc: 'I offer home improvement services or sell home products.'
        }
    }
    return (
        <div className='form'>
            <div className='container'>
                <h5 style={{marginBottom:'45px', marginTop: '0px'}}>Which describes you best?</h5>
                <div className='role_selector'>
                    <form>
                        <Role
                            role_name={'homeowner'}
                            icon={home_owner}
                            titleStyle={role_choice_title}
                            descStyle={role_choice_desc}
                            title={roleText.homeowner.title}
                            desc={roleText.homeowner.desc}
                        />
                        <Role
                            role_name={'professional'}
                            icon={business_center}
                            titleStyle={role_choice_title}
                            descStyle={role_choice_desc}
                            title={roleText.professional.title}
                            desc={roleText.professional.desc}
                        />
                        <input type="submit" value='Next >' className='role_submit' onClick={onSubmit}></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RolePicker