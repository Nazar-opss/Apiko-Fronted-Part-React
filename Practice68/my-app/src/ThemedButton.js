import React, { Component } from 'react'

const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
}

const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {},
})



class ThemedToggleButton extends Component {
  render() {
    return (
        <ThemeContext.Consumer>
        {({theme, toggleTheme}) =>(
            <button
            onClick={toggleTheme}
            style={{backgroundColor: theme.background}}
            >
                <img src="./sun.svg" alt='sun' width={30} height={30}></img>
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
                    state.theme === themes.dark ? themes.light :themes.dark,
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