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

	const [ error, setError ] = useState( false );
	const [ wpSnacks, setWpSnacks ] = useState( [] );
	const [ wpSnackGroups, setWpSnackGroups ] = useState( [] );
	const [ filteredSnacks, setFilteredSnacks ] = useState( [] );
	const [ searchString, setSearchString ] = useState( '' );
	const [ searchArray, setSearchArray ] = useState( [] );

	useEffect( () => {
		let restApiUrl = "https://snackit-v1.ritapbest.io/wp-json/wp/v2/";

		// first get the Snacks
		window.fetch( restApiUrl + 'snack?_embed=1&per_page=100' )
			.then( ( res ) => {
				if ( res.ok ) {
					return res.json();
				}
				throw res.error;
			} )
			.then( ( res ) => {

				// Map over the data and only use the props you need -
				// thank you @fabiankaegy for pointing us to this direction
				const snackData = res.map( ( snack ) => {

					// If images are not set revert to default image
					let snackGroup = [];
					let defaultImageUrl = "https://snackit-v1.ritapbest.io/wp-content/uploads/2019/04/snack_default.jpg";
					if ( snack._embedded[ 'wp:featuredmedia' ] ) {
						defaultImageUrl = snack._embedded[ 'wp:featuredmedia' ][ 0 ].media_details.sizes.thumbnail.source_url;
					}
					if ( snack._embedded[ 'wp:term' ] ) {
						snackGroup =
							snack._embedded[ 'wp:term' ][0].map( (key) => {
								return key.name + " / "
							}
						);
					} else {
						snackGroup = [ 'no_group' ];
					}

					return Object.assign(
						{},
						{
							id:          snack.id,
							title:       snack.title.rendered,
							slug:        snack.slug,
							content:     snack.content.rendered,
							description: snack.meta.snack_description,
							snack_size:  ( snack.meta.snack_size ? snack.meta.snack_size : '100ml' ),
							snack_price: ( snack.meta.snack_price ? snack.meta.snack_price : '50' ),
							snack_brand: ( snack.meta.snack_brand ? snack.meta.snack_brand : '' ),
							imageUrl:    defaultImageUrl,
							snack_group: snackGroup,
						}
					);
				} );
				setWpSnacks( snackData );
				setFilteredSnacks( snackData );
				localStorage.setItem( 'snackData', JSON.stringify( snackData ) );
			} )
			.catch( ( fetchError ) => {
				setError( fetchError );
			} );

		// then get the snack_groups
		window.fetch( restApiUrl + 'snack_groups?per_page=100' )
			.then( ( res ) => {
				if ( res.ok ) {
					return res.json();
				}
				throw res.error;
			} )
			.then( ( res ) => {

				// Map over the data - we only need the name, slug and id
				const snackGroups = res.map( ( snackgroup ) => {
					return Object.assign(
						{},
						{
							id:          snackgroup.id,
							name:        snackgroup.name,
							slug:        snackgroup.slug,
							description: snackgroup.meta.snack_description,
						}
					);
				} );
				setWpSnackGroups( snackGroups );
				localStorage.setItem( 'snackGroups', JSON.stringify( snackGroups ) );
			} )
			.catch( ( fetchError ) => {
				setError( fetchError );
			} );

	}, [] );

	const snacks = {
		wpSnacks:          wpSnacks,                     // the snacks that we fetched from WP REST API
		setWpSnacks:       setWpSnacks,               // the setState for prop above
		wpSnackGroups:     wpSnackGroups,           // the snack_groups that we fetched from WP REST API
		setWpSnackGroups:  setWpSnackGroups,     // the setState for prop above
		filteredSnacks:    filteredSnacks,         // the snack that are filtered through SnackSearch or SnackGrous
		setFilteredSnacks: setFilteredSnacks,   // the setState for prop above
		searchString:      searchString,             // the Search String of SnackSearch
		setSearchString:   setSearchString,       // the setState for prop above
		searchArray:       searchArray,               // the Search String of SnackSearch
		setSearchArray:    setSearchArray,         // the setState for prop above
	};

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