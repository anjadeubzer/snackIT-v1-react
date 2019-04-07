import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

// @material-ui components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// helper components
import PropTypes from 'prop-types';

// helper functions
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { AuthenticationContext } from '../AuthenticationContext';



const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	appBar: {
		backgroundColor: theme.palette.primary.dark,
	}
});



const NavBar = ( props ) => {
	const [ anchorEl, setAnchorEl ] = useState( null );
	const [ loadSettings, setLoadSettings ] = useState( false );

    const token = useContext( AuthenticationContext );

    const handleMenu = event => {
        setAnchorEl( event.currentTarget );
	};

    const handleClose = ( href ) => {
        setAnchorEl( null );
        setLoadSettings( true );
		props.history.push( href );
	};

	const { classes } = props;
	const open = Boolean(anchorEl);

	return (
		<React.Fragment>
			{ loadSettings &&
            	<Redirect to="/profile" />
            }
			<AppBar position="static" className={classes.appBar}>
				<Toolbar>

					<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
						<MenuIcon />
					</IconButton>

					<Typography variant="h6" color="inherit" className={classes.grow}>
						SnackIT App
					</Typography>

					{ token.wpToken && (
						<div>
							<span>{ 'Welcome ' + token.wpUser }</span>
							<IconButton
								aria-owns={open ? 'menu-appbar' : undefined}
								aria-haspopup="true"
								onClick={ handleMenu }
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={ handleClose }
							>
								<MenuItem onClick={ handleClose }>Profile</MenuItem>
								<MenuItem onClick={ handleClose }>My account</MenuItem>
							</Menu>
						</div>
					)}

					{/*<Button color="inherit">Login</Button>*/}

				</Toolbar>
			</AppBar>
		</React.Fragment>
	)
};

NavBar.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles(styles)( withRouter( NavBar ) );
