import React, { useState } from 'react'

export const RateSwitch = (props) => {
    const [visibility, setVisibility] = useState(true)

    const toggleSwitch = () =>{
        setVisibility(!visibility)
    }
    return (
        <div className='rateSwithcherBlock'>
            <div className='rateSwitch' style={{padding: '5px 5px', color: `${props.color}`}} onClick={toggleSwitch}>
                {visibility ? 'Show Rate' : props.popularity}
            </div>
            {
                !visibility && (
                    <div style={{paddingLeft: "10px", cursor: "pointer", color: `${props.color}`, textDecoration: 'underline'}} onClick={toggleSwitch}>Hide rate</div>
                )
            }
        </div>
    )
}

// export default class RateSwitch extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             show: true
//         };
//         this.toggleSwitch = this.toggleSwitch.bind(this)
//     }

//     toggleSwitch() {
//         this.setState({show: !this.state.show})
//     }

//     render() {
//         return (
//             <div className='rateSwithcherBlock'>
//                 <div className='rateSwitch' style={{padding: '5px 5px', color: `${this.props.color}`}} onClick={this.toggleSwitch}>
//                     {this.state.show ? 'Show Rate' : this.props.popularity}
//                 </div>
//                 {
//                     !this.state.show && (
//                         <div style={{paddingLeft: "10px", cursor: "pointer", color: `${this.props.color}`, textDecoration: 'underline'}} onClick={this.toggleSwitch}>Hide rate</div>
//                     )
//                 }
//             </div>
//         )
//     }
// }
