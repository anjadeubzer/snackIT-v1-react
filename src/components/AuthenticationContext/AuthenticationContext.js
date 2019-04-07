import React, { useEffect, useState } from 'react';

const AuthenticationContext = React.createContext();
const Authentication = ( props ) => {

    const [ wpToken, setWpToken ] = useState( null );
    const [ wpUser, setWpUser ] = useState( null );

    const token = {
        wpToken: wpToken,
        setWpToken: setWpToken,
        wpUser: wpUser,
        setWpUser: setWpUser,
    };

    return (
        <AuthenticationContext.Provider value={ token }>
            { props.children }
        </AuthenticationContext.Provider>
    );

};
// export default ({ children }) => {
    // const prevAuth = window.localStorage.getItem('auth') || false;
    // const prevAuthBody = window.localStorage.getItem('authBody') || null;
    // const [authenticated, setAuthenticated] = useState(prevAuth);
    // const [authBody, setAuthBody] = useState(prevAuthBody);
    //
    // useEffect(
    //     () => {
    //         window.localStorage.setItem('authenticated', authenticated);
    //         window.localStorage.setItem('authBody', authBody);
    //     },
    //     [authenticated, authBody]
    // );
    //
    // const defaultContext = {
    //     authenticated,
    //     setAuthenticated,
    //     authBody,
    //     setAuthBody
    // };
// };

export { Authentication, AuthenticationContext };

