import React from 'react'
import { themes } from '../utils/const'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { themeChanged } from '../state/slice/themeSlice'

// export const ThemeContext = React.createContext({
//     theme: themes.dark,
//     toggleTheme: () => {}
// })

export const ThemedToggleButton = (props) =>{
    // const theme = useContext(ThemeContext)

    const theme = useSelector((state) => state.theme.theme)
    const dispatch = useDispatch();
    console.log(theme)

    const currentTheme = themes[theme];
    return (
        <button
            // onClick={ props.onClick }
            onClick={() => dispatch(themeChanged())}
            style={{ backgroundColor: currentTheme.background, backgroundImage: `url(${currentTheme.icon})`, width: '80px', height: '80px', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}
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