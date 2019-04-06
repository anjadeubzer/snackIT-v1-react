import React, { Component, Fragment } from 'react';

// helper components
import DocumentTitle from 'react-document-title';
import PropTypes from 'npm install --save prop-types';


/**
 * NotFoundPage Component
 *
 * Explain what it does.
 *
 * @class
 * @augments which parent component does have this class nested
 *
 */
class NotFoundPage extends Component {
    render() {
        return (
            <Fragment>
                <DocumentTitle title="Nothing found" />
                <p>Nothing to see here...</p>
            </Fragment>
        );
    }
}


NotFoundPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default NotFoundPage;