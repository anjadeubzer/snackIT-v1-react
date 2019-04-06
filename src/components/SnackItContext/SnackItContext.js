import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';


/**
 * SnackItContext Component
 *
 * fetch the data from wordpress
 * Filter out unused data
 * and provide it via context
 *
 * @class
 * @augments which parent component does have this class nested
 *
 */
const SnackItContext = React.createContext();
const Snacks = ( props ) => {
    const [ snacks, setSnacks ] = useState( [] );
    const [ error, setError ] = useState( false );

    useEffect( () => {
        // let dataURL = "http://hackathon.local/wp-json/wp/v2/";
        let dataURL = "https://snackit.ritapbest.io/wp-json/wp/v2/";
        // let dataURL = "https://snackit-v1.ritapbest.io/wp-json/wp/v2/";

        window.fetch(dataURL + 'snack?_embed=1&per_page=100')
            .then( ( res ) => {
                if ( res.ok ) {
                    return res.json();
                }
                throw res.error;
            })
            .then( ( res ) => {

                // Map over the data and only use the props you need -
                // thank you @fabian for pointing us to this direction
                const snackData = res.map( ( snack ) => {

                    // If images are not set revert to default image
                    let defaultImageUrl = "https://placeimg.com/300/300/animals/" + snack.id;
                    if( snack._embedded['wp:featuredmedia'] ){
                        defaultImageUrl = snack._embedded[ 'wp:featuredmedia' ][ 0 ].media_details.sizes.thumbnail.source_url;
                    }

                    return Object.assign(
                        {},
                        {
                            id: snack.id,
                            title: snack.title.rendered,
                            slug: snack.slug,
                            content: snack.content.rendered,
                            description: snack.meta.snack_description,
                            snack_size: snack.meta.snack_size,
                            snack_price: snack.meta.snack_price,
                            snack_brand: snack.meta.snack_brand,
                            imageUrl: defaultImageUrl,
                        }
                    );
                } );
                setSnacks( snackData );
                localStorage.setItem( 'snackData', JSON.stringify( snackData ) );
            } )
            .catch( ( fetchError ) => {
                setError( fetchError );
            } );
    }, [] );

    return (
        <Fragment>
            { error &&
            <Redirect to={ `/error/${ error }` } />
            }
            <SnackItContext.Provider value={ snacks }>
                { props.children }
            </SnackItContext.Provider>
        </Fragment>
    );

};

export { Snacks, SnackItContext };