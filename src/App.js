import React, { Component } from 'react';

// main components
import Router from './components/Router';

// styles
import './App.scss'; //--> The big container for styles

import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles/index';

const theme = createMuiTheme({
    palette: {
        // type: 'dark',
        typography: {
            useNextVariants: true,
        },
        primary: {
            light: '#8BC8E8',
            main: '#0088ce',
            dark: '#005b9d',
            contrastText: '#fff',
        },
        secondary: {
            light: '#FFCC8B',
            main: '#ff8f00',
            dark: '#BA6900',
            contrastText: '#fff',
        },
    },
});




class App extends Component {

    state = {
        snacks: [],
        snackGroups: [],
        filteredSnacks: [],

        searchArray: [],
        searchString: "",
    };

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Router snackGroups={this.props.snackGroups} filteredSnacks={this.props.filteredSnacks} />
			</MuiThemeProvider>
		);
	}
}

export default App;
