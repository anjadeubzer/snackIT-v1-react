import React, { useState, useContext} from 'react';

// child components
import NavBar from '../NavBar';
import SnackHero from '../SnackHero';
import SnackList from '../SnackList';

// styles - only in component based scss file
import './SnacksPage.scss';

/**
 * SnacksPage Component
 *
 * Explain what it does.
 *
 * @class
 * @augments which parent component does have this class nested
 *
 */
const SnacksPage = () => {
    return (
        <div className="SnackIT">
            { /** user login & links to Settings/FAQs/help email **/ }
            <NavBar />

            <main>
                { /** Hero unit - a decorative visual header
                 * that helps to understand where you are **/}
                <SnackHero
                    // filterSearch={filterSearch}
                    // typeSearch={typeSearch}
                    // snackGroups={this.props.snackGroups}
                />

                {/** -- list of snacks
                 * a grid with grid items expanding on touch/click
                 * todo: expanding on click
                 * todo: buy with one click ( has to be a simple fast process again ) **/}
                <SnackList />

            </main>

        </div>
    );
};

export default SnacksPage;