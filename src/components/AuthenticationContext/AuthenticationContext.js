import React, { useState } from 'react';

const AuthenticationContext = React.createContext();
const Authentication = ( props ) => {

    const [ wpLoggedIn, setWpLoggedIn ] = useState( false );
    const [ wpToken, setWpToken ] = useState( null );
    const [ wpUser, setWpUser ] = useState( null );
    const [ wpUserID, setWpUserID ] = useState( null );

    const token = {
	    wpLoggedIn: wpLoggedIn,
	    setWpLoggedIn: setWpLoggedIn,
        wpToken: wpToken,
        setWpToken: setWpToken,
        wpUser: wpUser,
        setWpUser: setWpUser,
        wpUserID: wpUserID,
        setWpUserID: setWpUserID,
    };

    return (
        <AuthenticationContext.Provider value={ token }>
            { props.children }
        </AuthenticationContext.Provider>
    );
};

export { Authentication, AuthenticationContext };

