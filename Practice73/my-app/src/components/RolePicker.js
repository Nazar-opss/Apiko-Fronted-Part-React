import React, { useContext, useState } from 'react'
import home_owner from '../icons/home_owner.svg'
import business_center from '../icons/business_center.svg'
import arrow_right from '../icons/arrow_right.svg'
import { UserContext } from '../App'

const Role = (props) =>{
    return(
        <>
            <input type='radio' id={props.role_name} name='role' className='role_radio' onClick={props.handleClick}></input>
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

function RolePicker(props) {
    const user = useContext(UserContext);
    const [active, setActive] = useState(null);

    const handleClick = (event) => {
        console.log(event.target.id);
        setActive(event.target.id);
        user.setProfession(event.target.id);
    }

    function validRole(active) {
        const validValues = ['homeowner', 'professional'];
        return !validValues.includes(active);
    }
    
    const role_choice_title = {fontWeight: '500', letterSpacing: '0.15px', lineHeight: '28px'}
    const role_choice_desc = {fontSize: '13px', lineHeight: '15px'}
    const roleText = {
        homeowner: {
            id: 'homeowner',
            title: 'Homeowner',
            desc: 'I am a homeowner or interesed in home design.'
        },
        professional: {
            id: 'professional',
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
                            role_name={roleText.homeowner.id}
                            icon={home_owner}
                            titleStyle={role_choice_title}
                            descStyle={role_choice_desc}
                            title={roleText.homeowner.title}
                            desc={roleText.homeowner.desc}
                            handleClick={handleClick}
                        />
                        <Role
                            role_name={roleText.professional.id}
                            icon={business_center}
                            titleStyle={role_choice_title}
                            descStyle={role_choice_desc}
                            title={roleText.professional.title}
                            desc={roleText.professional.desc}
                            handleClick={handleClick}
                        />
                        <button 
                            type="submit" 
                            className='role_submit form_continue' 
                            onClick={props.handle}
                            disabled={validRole(active)}
                        >
                            Next 
                            <img 
                                src={arrow_right} 
                                alt='Next' 
                                style={{marginLeft: '5px'}}>
                            </img>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RolePicker