import React, { Fragment, useEffect, useState, useContext } from 'react';
// import Cookies from "js-cookie";
import formurlencoded from "form-urlencoded";
import { Redirect } from 'react-router-dom';

// import { state } from "../state";
// import { getEl, createEl, isRendered } from "../helpers.js";
// import { sidebar, loginForm, username, password } from "../config";

import PropTypes from 'prop-types';

// @material-ui components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// child components
import NavBar from '../NavBar';
import { AuthenticationContext } from '../AuthenticationContext';

// styles
import withStyles from '@material-ui/core/styles/withStyles';
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

const LoginPage = ( props ) => {

    // const username = "example-user";
    // const password = "example-password";
    const {
        classes
    } = props;

    const token = useContext( AuthenticationContext );

    const [ loggedIn, setLoggedIn ] = useState( false );
    const [ loginError, setLoginError ] = useState( null );


    const handleLogin = ( event ) => {
        event.preventDefault();

        // console.log( event.target.email.value );
        // console.log( event.target.password.value );

        const username = event.target.email.value;
        const password = event.target.password.value;

        fetch("https://snackit-v1.ritapbest.io/wp-json/jwt-auth/v1/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formurlencoded({
                username: username,
                password: password
            })
        })
            .then( response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then( response => {
                setLoggedIn( true );
                token.setWpToken( response.token );
                token.setWpUser( response.user_display_name );
                console.log("Logged in");
            })
            .catch(error => {
                console.error( error );
                // return error.json().then(error => {
                //     console.error( error );
                //     setLoginError( error.message );
                // });
            });
    };


    // const handleLogout = () => {
    //     token.setWpToken( null );
    // };


    return (
        <Fragment>
            { token.wpToken &&
            <Redirect to="/snacks" />
            }
            { /** user login & links to Settings/FAQs/help email **/ }
            <NavBar />


            { /** login form **/ }
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <p>You are currently {loggedIn ? "" : "not"} logged in.</p>
                    { loginError && (
                        <p dangerouslySetInnerHTML={{ __html: loginError }} />
                    )}
                    <form
                        className={classes.form}
                        onSubmit={ handleLogin }
                    >
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={ classes.submit }
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </main>

        </Fragment>
    );
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
