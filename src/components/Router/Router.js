import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// helper components
import DocumentTitle from 'react-document-title';

// adding a abstraction layer where I will handle all the REST API fetch processing
import { Snacks } from '../SnackItFetch';

// child components / pages
import LoginPage from '../LoginPage';
import SnacksPage from '../SnacksPage';
import ProfilePage from '../ProfilePage';
// import ErrorMessage from '../ErrorMessage';
// import NotFound from '../NotFound';


const Router = () => {
    return (
        <Fragment>
            <DocumentTitle title="SnackIT – your fridge app" />
            <BrowserRouter>
                <Snacks>
                    <Switch>
                        <Route exact path="/" component={ LoginPage } />
                        <Route exact path="/snacks" component={ SnacksPage } />
                        <Route exact path="/profile" component={ ProfilePage } />
                        {/*<Route path="/error/:message/" component={ ErrorMessage } />*/}
                        {/*<Route component={ NotFound } />*/}
                    </Switch>
                </Snacks>
            </BrowserRouter>
        </Fragment>
    );
};

export default Router;