import { useMediaQuery } from 'react-responsive'
import React, { useEffect } from 'react';
//import AppRoutes from "./routes/AppRoutes"
//import theme from "./styles/customTheme"
import { MuiThemeProvider } from '@material-ui/core/styles';


const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

export { Desktop, Tablet, Mobile, Default }


// const Responsive = (props) => {
//   const [themeState, setThemeState] = React.useState(true);
//   if (localStorage.getItem("theme") == null || localStorage.getItem("theme") == undefined) {
//     localStorage.setItem("theme", "light");
//     setThemeState(true);
//   }
//   const handleThemeToggle = () => {
//     (localStorage.getItem("theme") == "dark") ? localStorage.setItem("theme", "light") : localStorage.setItem("theme", "dark");
//     (localStorage.getItem("theme") == "dark") ? setThemeState(true) : setThemeState(false);


//   };






//   return (<div>
//     <Desktop>
//       <MuiThemeProvider theme={theme(localStorage.getItem("theme"))}>
//         <AppRoutes type="Desktop" toggleTheme={handleThemeToggle} />
//       </MuiThemeProvider>

//     </Desktop>
//     <Tablet>
//       Tablet view not supported
//     </Tablet>
//     <Mobile>
//       Mobile view not supported
//     </Mobile>

//   </div>)

// }



// export default Responsive