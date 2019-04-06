import React, { Component } from 'react';

// @material-ui components
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';

// helper components
import PropTypes from 'prop-types';

//helper functions
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
	splashScreen: {
		backgroundColor: theme.palette.background.paper,
	},
});



class SplashStart extends Component {

	constructor() {
		super();
		this.state = {
		}
	}



	// render our searchField
	render() {
		const { classes } = this.props;
		return (
			<section className={classes.splashScreen}>

			</section>

		)
	}
}

SplashStart.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles( styles )( SplashStart );