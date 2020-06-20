
import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles';
import { red, green } from "@material-ui/core/colors";

const drawerWidth = 200;


const darkTheme = {
    'cardHeader': "#9e9e9e"

}

const lightTheme = {
    'cardHeader': "#e0e0e0"
}

const setTheme = (themeStatus) => {
    const themeSettings = (themeStatus == "light") ? lightTheme : darkTheme;
    const theme1 =
        createMuiTheme({
            palette: {
                // type: 'light'

                primary: {
                    main: "#0066cc "
                },
                secondary: {
                    main: '#ff9100',
                },
                // secondary: {
                //     light: '#0066ff',
                //     main: '#0044ff',
                //     // dark: will be calculated from palette.secondary.main,
                //     contrastText: '#ffcc00',
                // }
            },
            typography: {
                //fontFamily: 'Comic Sans',
                fontFamily: [
                    'Arial',
                    'sans-serif',
                ].join(','),
                subtitle1: {
                    fontSize: 14,
                },
                body1: {
                    fontWeight: 500,
                },
                // button: {
                //     textTransform: 'none'
                // }

            },
            overrides: {
                MuiDrawer: {

                    root: {
                        backgroundColor: '#4D000000',
                        width: drawerWidth,

                    },
                    paper: {
                        backgroundColor: '#4D000000',
                        width: drawerWidth,
                    },
                },

                MuiCardHeader: {
                    root: {
                        backgroundColor: themeSettings.cardHeader,
                        color: 'black',

                    },
                    title: {
                        color: 'black',
                        fontSize: '14px',
                        lineHeight: '1em'
                    },
                    subheader: {
                        color: 'black'
                    }

                },

                MuiTextField: {
                    root: {
                        borderRadius: 0,
                        fontSize: '18px',
                        color: "#303030",

                    },
                },

                MuiInputLabel: {
                    root: {
                        color: '#303030',
                        fontSize: '16px'
                    },

                },

                MuiInput: {
                    root: {
                        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                            display: "none",
                            margin: 80
                        },
                        "&$disabled": {
                            color: '#303030',
                            '&:before': {
                                // borderBottom: 'none!important',
                            },
                            '& svg': {
                                display: 'none',
                            },
                        },

                    },
                    underline: {

                        '&:after': {
                            borderBottom: '1px solid red',
                            transition: 'none',
                        },
                    },
                },
        
                MuiStepConnector: {
                    alternativeLabel: {
                        top: 10,
                        left: 'calc(-50% + 16px)',
                        right: 'calc(50% + 16px)',
                    },
                    active: {
                        '& $line': {
                            borderColor: '#0066cc',
                        },
                    },
                    completed: {
                        '& $line': {
                            borderColor: '#0066cc',
                        },
                    },
                    line: {
                        borderColor: '#eaeaf0',
                        borderTopWidth: 3,
                        borderRadius: 1,
                    },
                }
            }
        });

   
    return (
        theme1

    )

}

export default setTheme;