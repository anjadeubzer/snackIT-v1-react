import React, { useState, useContext } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// @material-ui components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// child components
import { AuthenticationContext } from '../AuthenticationContext';


// styles
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ( {
	root:       {
		flexGrow: 1,
	},
	grow:       {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft:  -12,
		marginRight: 20,
	},
	appBar:     {
		backgroundColor: theme.palette.primary.dark,
	}
} );


const NavBar = ( props ) => {
	const { classes } = props;
	const token = useContext( AuthenticationContext );

	// custom hooks to handle menu and redirect
	const [ anchorEl, setAnchorEl ] = useState( null );
	const [ showSettings, setShowSettings ] = useState( false );
	const [ showSnacks, setShowSnacks ] = useState( false );

	// Menu open/close
	const handleMenu = event =>     { setAnchorEl( event.currentTarget ); };
	const handleClose = () =>       { setAnchorEl( null ); };
	const open = Boolean( anchorEl );

	// Menu redirects
	const showSettingsPage = () =>  {
		setAnchorEl( null );
		setShowSettings( true );
		setShowSnacks( false );
	};
	const showSnacksPage = () =>    {
		setShowSnacks( true );
		setShowSettings( false );
	};

	return (
		<React.Fragment>
			{ showSettings && <Redirect to="/profilePage" /> }
			{ showSnacks && <Redirect to="/snacksPage" /> }
			<AppBar position="static" className={ classes.appBar }>
				<Toolbar>

					<Typography
						variant="h6"
						color="inherit"
						className={ classes.grow }
						onClick={ showSnacksPage }
					>
						<a onClick={ showSettingsPage }>SnackIT App</a>
					</Typography>

					{ token.wpToken && (
						<div>
							<span>{ 'Welcome ' + token.wpUser }</span>
							<IconButton
								aria-owns={ open ? 'menu-appbar' : undefined }
								aria-haspopup="true"
								onClick={ handleMenu }
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={ anchorEl }
								anchorOrigin={ {
									vertical:   'top',
									horizontal: 'right',
								} }
								transformOrigin={ {
									vertical:   'top',
									horizontal: 'right',
								} }
								open={ open }
								onClose={ handleClose }
							>
								<MenuItem onClick={ showSettingsPage }>Profile</MenuItem>
								<MenuItem onClick={ showSettingsPage }>My account</MenuItem>
							</Menu>
						</div>
					) }

					{ /*<Button color="inherit">Login</Button>*/ }

				</Toolbar>
			</AppBar>
		</React.Fragment>
	)
};

NavBar.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles( styles )( withRouter( NavBar ) );
