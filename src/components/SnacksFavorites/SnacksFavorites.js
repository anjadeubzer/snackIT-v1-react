import React, {Component} from 'react';

// @material-ui components
// import Element from '@material-ui/core/Element';

// child components


// helper components
import PropTypes from 'prop-types';


// helper functions
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: 80,
        padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px`,
        backgroundColor: theme.palette.primary.light,
        marginBottom: theme.spacing.unit * 4,
    },
});


/**
 * SnacksFavorites Component
 *
 * Explain what it does.
 *
 * @class
 * @augments which parent component does have this class nested
 *
 */
class SnacksFavorites extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={ classes.root }>
                <h3>Your Favorites</h3>
                <p>Sorted by frequency and date of purchase</p>
            </div>
        );
    }
}


SnacksFavorites.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SnacksFavorites);