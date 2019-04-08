import React, { useEffect, useContext, useState } from 'react';

// @material-ui components
import TextField from '@material-ui/core/TextField';

// helper components
import PropTypes from 'prop-types';
import { SnackItContext } from "../SnackItContext";
import { filterSnacks } from "../HelperFunctions/filterSnacks";


// styling
import {withStyles} from '@material-ui/core/styles';
const styles = theme => ({
    root:       {
        flexGrow:        1,
        padding:         `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px`,
        backgroundColor: theme.palette.primary.light,
        marginBottom:    theme.spacing.unit * 4,
    },
    container:  {
        minHeight: 80,
        flexGrow:  1,
        position:  'relative',
    },
    paper:      {
        position:  'absolute',
        zIndex:    1,
        marginTop: theme.spacing.unit,
        left:      0,
        right:     0,
    },
    chip:       {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    inputRoot:  {
        flexWrap: 'wrap',
    },
    inputInput: {
        width:    'auto',
        flexGrow: 1,
    },
    divider:    {
        height: theme.spacing.unit * 2,
    },
});



// helper functions
function renderInput(inputProps) {
    const {InputProps, classes, ref, ...other} = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes:  {
                    root:  classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}





/**
 * const SnackSearch
 *
 * search field with autocompletion from Material UI search examples
 *
 * **/
const SnackSearch = ( props ) => {
    const [ searchArray, setSearchArray ] = useState( [] );
    const [ inputValue, setInputValue ] = useState( '' );
    const {classes} = props;

    const snacks = useContext(SnackItContext);

    useEffect(
        () => {
            filterSnacks( snacks, inputValue );
        },
        [ inputValue ]
    );

    const handleInputChange = event => {
        setInputValue( event.target.value );
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                 <TextField
                     autoComplete
                     id="standard-search"
                     fullWidth
                     label="Search"
                     type="search"
                     // className={classes.inputInput}
                     margin="normal"
                     value={ inputValue }
                     onChange={ handleInputChange }
                     InputLabelProps={{
                         shrink: true,
                     }}
                 />
            </div>
        </div>
    );
};

SnackSearch.propTypes = {classes: PropTypes.object.isRequired};

export default withStyles(styles)(SnackSearch);