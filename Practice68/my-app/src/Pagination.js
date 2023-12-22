import React, { Component } from 'react'

export default class Pagination extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        return (
            <div className='Pagination'>
                <div>Current page: {this.props.page}</div>
                <div className='Buttons'>
                    <button onClick={() => this.props.changePage(this.props.page - 1)} disabled={this.props.page === 1}>Previous page </button>
                    <button onClick={() => this.props.changePage(this.props.page + 1)} disabled={this.props.page === this.props.totalPages}>Next Page</button>
                </div>
            </div>
        )
    }
}
