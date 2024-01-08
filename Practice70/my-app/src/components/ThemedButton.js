import React from 'react'
import { themes } from '../utils/const'
import { useContext } from 'react'

export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {}
})

export const ThemedToggleButton = (props) =>{
    const theme = useContext(ThemeContext)
    return (
        <button
            onClick={props.onClick}
            style={{ backgroundColor: `${theme.theme.background}`, backgroundImage: `url(${theme.theme.icon})`, width: '80px', height: '80px', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}
            className='themetoggle'
        >
        </button>
    )
}
// export class ThemedToggleButton extends Component {
//     render() {
//         return (
//             <ThemeContext.Consumer>
//                 {({ theme }) => (
//                     <button
//                         onClick={this.props.onClick}
//                         style={{ backgroundColor: theme.background, backgroundImage: 'url(' + theme.icon + ')', width: '80px', height: '80px', backgroundRepeat: 'no-repeat', backgroundSize: 'contain'}}
//                     >        
//                     </button>
//                 )}
//             </ThemeContext.Consumer>
//         )
//     }
// }