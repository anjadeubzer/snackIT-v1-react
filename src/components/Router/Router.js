import React, { Fragment, useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { RootContext } from '../RootContext';

// helper components
import DocumentTitle from 'react-document-title';

// adding a abstraction layer where I will handle all the REST API fetch processing
import { Snacks } from '../SnackItContext';

// child components / pages
import LoginPage from '../LoginPage';
import SnacksPage from '../SnacksPage';
import ProfilePage from '../ProfilePage';
// import ErrorMessage from '../ErrorMessage';
// import NotFound from '../NotFound';

const Router = ({ render, ...routeProps }) => {
    const  authenticated  = useContext(RootContext);

    return (
        <Fragment>
            <DocumentTitle title="SnackIT – your fridge app" />
            <BrowserRouter>
                <Snacks>
                    <Switch>
                        <Route exact path="/" component={ LoginPage } />
                        <Route
                            exact
                            render={() => ( authenticated ? render() : <Redirect to='/' />)}
                            path="/snacks"
                            // component={ LoginPage }
                        />
                        <Route
                            exact
                            render={() => ( authenticated ? render() : <Redirect to='/' />)}
                            path="/profile"
                            // component={ ProfilePage }
                        />
                        {/*<Route path="/error/:message/" component={ ErrorMessage } />*/}
                        {/*<Route component={ NotFound } />*/}

                    </Switch>
                </Snacks>
            </BrowserRouter>
        </Fragment>
    );
};

export default Router;