import React, { Component } from 'react'

export default class Pagination extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
        this.previousPage = this.previousPage.bind(this)
        this.nextPage = this.nextPage.bind(this)

    }
    previousPage = () =>{
        this.props.page = this.props.page - 1
    }
    nextPage = () =>{
        this.props.page = this.props.page + 1
    }
    render() {
        let nextPage = () =>{
            this.props.page = this.props.page + 1
        }
        return (
            <div>
                <div>Current page: {this.props.page}</div>
                <button onClick={()=>{ this.props.page = this.props.page - 1 }} disabled={this.props.page === 1}>Previous page </button>
                <button onClick={nextPage} disabled={this.props.page === this.props.totalPages}>Next Page</button>
            </div>
        )
    }
}
