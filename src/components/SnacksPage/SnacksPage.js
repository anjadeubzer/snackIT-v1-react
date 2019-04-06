import React, {Component} from 'react';

// @material-ui components
// import Element from '@material-ui/core/Element';

// child components
import SnackList from '../SnackList';
import SnackHero from '../SnackHero';
import NavBar from '../NavBar';

// helper components
import PropTypes from 'prop-types';


// helper functions
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        border: '1px solid red',
    },
});



// filter function
const filterSnacks = ( filterTerm ) => {
    let filteredSnacks = this.state.snacks;

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
                    return `(?=.*\\b${escapeRegExp( oneWord )})`;
                } else {
                    // Not the last word - expect the whole word exactly
                    return `(?=.*\\b${escapeRegExp( oneWord )}\\b)`;
                }
            })
            .join("") + ".+",
        "gi" // gi means case insensitiv
    );

    filteredSnacks = filteredSnacks.filter(( snack ) => {

        if (
            searchRegex.test( snack.title.rendered ) === true

            || searchRegex.test( snack.meta.snack_brand ) === true
            || searchRegex.test( snack.meta.snack_price ) === true
            || searchRegex.test( snack.meta.snack_size ) === true
            || searchRegex.test( snack.meta.snack_description ) === true

        ) {
            return true;
        }
        else {
            return false;
        }
    });

    this.setState({
        filteredSnacks
    })
};

// getting State from Search
const typeSearch = ( searchString ) => {
    this.setState({
        searchString: searchString,
    });
    this.filterSnacks( searchString );
    // console.log( searchString );
};

// getting State from Search
const filterSearch = ( searchArray ) => {
    this.setState({
        searchArray: searchArray,
    });
    console.log( searchArray );
};


/**
 * SnacksPage Component
 *
 * Explain what it does.
 *
 * @class
 * @augments which parent component does have this class nested
 *
 */
class SnacksPage extends Component {

    constructor() {
        super();
        this.state = {
            searchArray: [],
            searchString: [],
        };
    };

    render() {
        return (
            <div className="SnackIT">

                { /** -- Splash Screen on App Start
                   * todo: function that loads Splash screens function their condition
                   * -- first start ( onboarding - with a little help!? )
                   * -- simple quick start ( get the drink quick without hassle )
                   * -- after 6pm beer screen ( have fun! ) **/ }
                {/*<SplashStart />*/}

                { /** user login & links to Settings/FAQs/help email **/ }
                <NavBar />


                <main>
                    { /** Hero unit - a decorative visual header
                     * that helps to understand where you are **/}
                    <SnackHero
                        filterSearch={filterSearch}
                        typeSearch={typeSearch}
                        snackGroups={this.props.snackGroups}
                    />

                    {/** -- list of snacks
                     * a grid with grid items expanding on touch/click
                     * todo: expanding on click
                     * todo: buy with one click ( has to be a simple fast process again ) **/}
                    <SnackList />

                </main>

            </div>
        );
    }
}


SnacksPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SnacksPage);