import React from 'react'

export const Pagination = (props) => {
    return (
        <div className='Pagination'>
            <div style={{color: `${props.color}`}}>Current page: {props.page}</div>
            <div className='Buttons'>
                
                <button onClick={props.page_fetchMinus} disabled={props.page === 1}>Previous page </button>
                <button onClick={props.page_fetchPlus} disabled={props.page === props.totalPages}>Next Page</button>

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
