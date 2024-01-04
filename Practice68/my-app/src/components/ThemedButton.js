import React, { Component } from 'react'
import { themes } from '../utils/const'

export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {}
})

export class ThemedToggleButton extends Component {
    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <button
                        onClick={this.props.onClick}
                        style={{ backgroundColor: theme.background, backgroundImage: 'url(' + theme.icon + ')', width: '80px', height: '80px', backgroundRepeat: 'no-repeat', backgroundSize: 'contain'}}
                    >        
                    </button>
                )}
            </ThemeContext.Consumer>
        )
    }
}