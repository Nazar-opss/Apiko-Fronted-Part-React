import React, { Component } from 'react'
import { themes } from './const'

export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {}
})

class ThemedToggleButton extends Component {
    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme, toggleTheme }) => (
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

export class ThemedButton extends Component {
    constructor(props) {
        super(props)

        this.toggleTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark ? themes.light : themes.dark,
            }))
        }
        this.state = {
            theme: themes.light,
            toggleTheme: this.toggleTheme
        }
    }
    render() {
        return (
            <ThemeContext.Provider value={this.state}>
                <ThemedToggleButton/>
            </ThemeContext.Provider>
        )
    }
}

export default ThemedButton