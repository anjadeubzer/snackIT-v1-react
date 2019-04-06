import React, { useContext } from 'react';

// @material-ui components
import Grid from '@material-ui/core/Grid';

// helper components
import PropTypes from 'prop-types';

// child components
import { SnackItContext } from '../SnackItContext';
import SnackItem from '../SnackItem';

// helper functions
// import 'SnackList.scss';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		flexGrow: 1,
		minHeight: 100,
		padding: `0 ${theme.spacing.unit * 3}px`,
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
});



const SnackList = ( { classes } ) => {

	const availableSnacks = useContext( SnackItContext );
	console.log(availableSnacks);

	// render our contentWrapper
	return(
		<section className={classes.root}>
			{ availableSnacks ? (

				<Grid container className={classes.container} spacing={24} >

					{ availableSnacks.map( ( snack, key ) => (
						<Grid
							item
							xs={12} sm={6} lg={4} xl={3}
							key={ key }
							index={ key }
						>
							<SnackItem
								snack={ snack }
								key={ key }
							/>
						</Grid>
					))}

				</Grid>

			) : <div>'No Snacks here'</div>
			}
		</section>
	);
};

SnackList.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles(styles)(SnackList);