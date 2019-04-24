import React, { Fragment, useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

// helper components
import DocumentTitle from 'react-document-title';
import Cookies from "js-cookie";

// adding a abstraction layer where I will handle all the REST API fetch processing
import { AuthenticationContext } from '../AuthenticationContext';
import { Snacks } from '../SnackItContext';

// page components
import LoginPage from '../LoginPage';
import SnacksPage from '../SnacksPage';
import ProfilePage from '../ProfilePage';

// todo: ErrorPage and 404Page
// import ErrorMessage from '../ErrorMessage';
// import NotFound from '../NotFound';



const Router = ( { render, ...routeProps } ) => {
	const authenticated = useContext( AuthenticationContext );

	// let see if we can stay logged in on page reload
	const stayLoggedin = () => {
		// Check cookie to see if already authenticated
		// if ( Cookies.get( 'wpToken' ) === undefined ) {
		// 	console.log( 'wpLoggedIn: ' + authenticated.wpLoggedIn );
		// 	console.log( 'logged out' );
		// }
		// else {
		// 	let cookieToken = Cookies.get( 'wpToken' );
		// 	console.log( 'logged in : ' + cookieToken );
		// 	console.log( 'wpLoggedIn: ' + authenticated.wpLoggedIn );
		// }
	};

	return (
		<Fragment>
			{ stayLoggedin() }
            <DocumentTitle title="SnackIT – your fridge app" />
            <BrowserRouter>
                    <Snacks>
                        <Switch>
                            <Route
	                            exact
	                            path="/"
	                            component={ LoginPage }
                            />
                            <Route
	                            exact
	                            render={ () => ( authenticated.wpToken ? <SnacksPage /> : <Redirect to='/' /> ) }
	                            path="/snacksPage"
                            />
                            <Route
	                            exact
	                            render={ () => ( authenticated.wpToken ? <ProfilePage /> : <Redirect to='/' /> ) }
	                            path="/profilePage"
                            />
	                        { /*<Route path="/error/:message/" component={ ErrorMessage } />*/ }
	                        { /*<Route component={ NotFound } />*/ }

                        </Switch>
                    </Snacks>
            </BrowserRouter>
        </Fragment>
	);
};

export default Router;