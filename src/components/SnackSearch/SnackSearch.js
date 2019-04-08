import React, {Component, useContext, useState } from 'react';

// @material-ui components
import TextField from '@material-ui/core/TextField';

// helper components
import PropTypes from 'prop-types';
import { SnackItContext } from "../SnackItContext";
// import { filterSnacks } from "../HelperFunctions/filterSnacks";


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

const filterSnacks = ( snacks ) => {
    // const snacks = useContext(SnackItContext);
    let wpSnacksFiltered = snacks.wpSnacks;
    let filterTerm = snacks.searchString;

    function escapeRegExp(s) {
        return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    }

    const theWords = filterTerm
        .split(/\s+/g)
        .map(s => s.trim())
        .filter(s => !!s);

    const hasTrailingSpace = filterTerm.endsWith(" ");

    const searchRegex = new RegExp(
        theWords
            .map((oneWord, i) => {
                if (i + 1 === theWords.length && !hasTrailingSpace) {
                    // The last word - ok with the word being "startswith"-like
                    return `(?=.*\\b${escapeRegExp(oneWord)})`;
                }
                else {
                    // Not the last word - expect the whole word exactly
                    return `(?=.*\\b${escapeRegExp(oneWord)}\\b)`;
                }
            })
            .join("") + ".+",
        "gi" // gi means case insensitiv
    );


    wpSnacksFiltered = wpSnacksFiltered.filter((snack) => {

        if (
            searchRegex.test(snack.title) === true
            || searchRegex.test(snack.snack_brand) === true
            || searchRegex.test(snack.snack_price) === true
            || searchRegex.test(snack.snack_size) === true
            || searchRegex.test(snack.description) === true
        ) {
            return true;
        }
        else {
            return false;
        }
    });
    snacks.setFilteredSnacks(wpSnacksFiltered);
};



/**
 * class SnackSearch
 *
 * search field with autocompletion from Material UI search examples
 *
 * **/
const SnackSearch = ( props ) => {
    const [ searchArray, setSearchArray ] = useState( [] );
    const [ inputValue, setInputValue ] = useState( '' );
    const {classes} = props;

    const snacks = useContext(SnackItContext);

    const handleInputChange = event => {
        setInputValue( event.target.value );
        snacks.setSearchString( event.target.value );
        filterSnacks( snacks );
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