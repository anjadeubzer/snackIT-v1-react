import React, {Component, useContext, useState } from 'react';

// @material-ui components
import TextField from '@material-ui/core/TextField';
// import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

// helper components
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
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


//get suggestions
const suggestions = [
    {label: 'Coke'},
    {label: 'Tea'},
    {label: 'Drink'},
    {label: 'Algeria'},
    {label: 'American Samoa'},
    {label: 'Andorra'},
    {label: 'Angola'},
    {label: 'Anguilla'},
    {label: 'Antarctica'},
    {label: 'Antigua and Barbuda'},
    {label: 'Argentina'},
    {label: 'Armenia'},
    {label: 'Aruba'},
    {label: 'Australia'},
    {label: 'Austria'},
    {label: 'Azerbaijan'},
    {label: 'Bahamas'},
    {label: 'Bahrain'},
    {label: 'Bangladesh'},
    {label: 'Barbados'},
    {label: 'Belarus'},
    {label: 'Belgium'},
    {label: 'Belize'},
    {label: 'Benin'},
    {label: 'Bermuda'},
    {label: 'Bhutan'},
    {label: 'Bolivia, Plurinational State of'},
    {label: 'Bonaire, Sint Eustatius and Saba'},
    {label: 'Bosnia and Herzegovina'},
    {label: 'Botswana'},
    {label: 'Bouvet Island'},
    {label: 'Brazil'},
    {label: 'British Indian Ocean Territory'},
    {label: 'Brunei Darussalam'},
];


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

function renderSuggestion({
                              suggestion,
                              index,
                              itemProps,
                              highlightedIndex,
                              selectedItem
                          }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >pyttipanna!66

			{suggestion.label}
		</MenuItem>
    );
}

renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index:            PropTypes.number,
    itemProps:        PropTypes.object,
    selectedItem:     PropTypes.string,
    suggestion:       PropTypes.shape({label: PropTypes.string}).isRequired,
};

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                      count < 5 &&
                      suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
            if (keep) {
                count += 1;
            }
            return keep;
        });
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
const SnackAutocompleteSearch = ( props ) => {
    const [ searchArray, setSearchArray ] = useState( [] );
    const [ inputValue, setInputValue ] = useState( '' );
    const {classes} = props;

    const snacks = useContext(SnackItContext);

    const handleKeyDown = event => {
        if (
            searchArray.length &&
            !inputValue.length &&
            event.key === 'Backspace'
        ) {
            setSearchArray(
                searchArray.slice(0, searchArray.length - 1)
            );
            filterSnacks( snacks )
        }
    };

    const handleInputChange = event => {
        setInputValue( event.target.value );
        snacks.setSearchString( event.target.value );
    };

    const handleChange = item => {
        if (searchArray.indexOf(item) === -1) {
            let changeSelectedItem = [ ...searchArray, item ];
            setInputValue( '' );
            setSearchArray( changeSelectedItem );
        }
    };

    const handleDelete = item => () => {
        setSearchArray(
            searchArray.splice(searchArray.indexOf(item), 1)
        );
    };

    return (
        <div className={classes.root}>
            <Downshift
                id="downshift-multiple"
                inputValue={ inputValue }
                onChange={ handleChange }
                searchArray={ searchArray }>

                {
                    ({
                         getInputProps,
                         getItemProps,
                         isOpen,
                         inputValue:   inputValue2,
                         searchArray: searchArray2,
                         highlightedIndex,
                     }) => (
                        <div className={classes.container}>
                            {
                                renderInput({
                                    fullWidth:  true,
                                    label:      'Search',
                                    classes,
                                    InputProps: getInputProps({
                                        startAdornment: searchArray.map(item => (
                                            <Chip
                                                key={item}
                                                tabIndex={-1}
                                                label={item}
                                                className={classes.chip}
                                                onDelete={handleDelete(item)}
                                            />)),
                                        onChange:       handleInputChange,
                                        onKeyDown:      handleKeyDown,
                                        placeholder:    'Search for your Snack',
                                    }),
                                })
                            }

                            {
                                isOpen ? (
                                    <Paper className={classes.paper} square>
                                        {
                                            getSuggestions(inputValue2).map((suggestion, index) => renderSuggestion({
                                                suggestion,
                                                index,
                                                itemProps:    getItemProps({item: suggestion.label}),
                                                highlightedIndex,
                                                searchArray: searchArray2,
                                            }),)
                                        }
                                    </Paper>
                                ) : null
                            }
                        </div>
                    )
                }
            </Downshift>
        </div>
    );
}

SnackAutocompleteSearch.propTypes = {classes: PropTypes.object.isRequired};

export default withStyles(styles)(SnackAutocompleteSearch);