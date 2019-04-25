import React, { useEffect, useContext, useState } from 'react';

// @material-ui components
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

// helper components
import PropTypes from 'prop-types';
import { SnackItContext } from "../SnackItContext";
import { filterSnacks } from "../HelperFunctions/filterSnacks";

// child components
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	filterSnackGroups: {
		flexGrow: 1,
		minHeight: 80,
		padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
		backgroundColor: theme.palette.primary.light,
		marginBottom: theme.spacing.unit * 4,
	},
	chip: {
		fontSize: 16,
		marginRight: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
	}
});



const SnacksTags = ( { classes } ) => {
	const [ filterValue, setFilterValue ] = useState( '' );
	const [ iconDisplay, setIconDisplay ] = useState( '' );
	const snacks = useContext( SnackItContext );
	let snackGroups = snacks.wpSnackGroups;

	useEffect(
		() => {
			filterSnacks( snacks, filterValue );
		},
		[ filterValue ]
	);

	const handleClick = label => {
		setIconDisplay( label );
		setFilterValue( label );
		console.log( label );
	};

	// render our searchField
	return (
		<div className={classes.filterSnackGroups}>
			{ snackGroups ? (
				<div>
					{ Object.keys( snackGroups ).map( key => (
						<Chip
							className={ classes.chip }
							color="primary"
							key={ key }
							index={ key }
							label={ snackGroups[key].name }
							onClick={ () => handleClick(snackGroups[key].name) }
							icon={ (iconDisplay == snackGroups[key].name) ? <DoneIcon /> : null }
						/>
					))}
				</div>
			) : <div>'No filter tags rendered'</div>
			}
		</div>
	);
};

SnacksTags.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles( styles )( SnacksTags );