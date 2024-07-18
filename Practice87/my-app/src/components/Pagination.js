import React from 'react'
import { redirect, useNavigate } from 'react-router-dom';

export const Pagination = (props) => {
    const navigate = useNavigate();
    return (
        <div className='Pagination'>
            <div style={{color: `${props.color}`}}>Current page: {props.page}</div>
            <div className='Buttons'>
                <button onClick={() => navigate(`/${props.page - 1}`)} disabled={props.page === 1}>Previous page </button>
                <button onClick={() => navigate(`/${props.page + 1}`)} disabled={props.page === props.totalPages}>Next Page</button>
            </div>
        </div>
    )
}
// export default class Pagination extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//         }
//     }
//     render() {
//         return (
//             <div className='Pagination'>
//                 <div style={{color: `${this.props.color}`}}>Current page: {this.props.page}</div>
//                 <div className='Buttons'>
//                     <button onClick={() => this.props.changePage(this.props.page - 1)} disabled={this.props.page === 1}>Previous page </button>
//                     <button onClick={() => this.props.changePage(this.props.page + 1)} disabled={this.props.page === this.props.totalPages}>Next Page</button>
//                 </div>
//             </div>
//         )
//     }
// }
