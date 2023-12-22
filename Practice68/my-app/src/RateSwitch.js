import React, { Component } from 'react'

export default class RateSwitch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        };
        this.toggleSwitch = this.toggleSwitch.bind(this)
    }

    toggleSwitch() {
        this.setState({show: !this.state.show})
    }

    render() {
        return (
            <div className='rateSwithcherBlock'>
                <div className='rateSwitch' style={{padding: '5px 5px'}} onClick={this.toggleSwitch}>
                    {this.state.show ? 'Show Rate' : this.props.popularity}
                </div>
                {
                    !this.state.show && (
                        <div style={{paddingLeft: "10px", cursor: "pointer"}} onClick={this.toggleSwitch}>Hide rate</div>
                    )
                }
            </div>
        )
    }
}
