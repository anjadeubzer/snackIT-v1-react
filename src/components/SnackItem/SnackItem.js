import React, { Fragment, useContext, useState, useEffect } from 'react';

// @material-ui components
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import CartIcon from '@material-ui/icons/AddShoppingCart';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


// helper components
import PropTypes from 'prop-types';
import { AuthenticationContext } from '../AuthenticationContext';

//helper functions
import { formatPrice } from '../HelperFunctions/formatPrice';

//@material-ui styles
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ( {

	card: {
		display:         'flex',
		backgroundColor: theme.palette.primary.main,
	},

	cardMedia: {
		width:     '20%',
		minWidth:  100,
		// minHeight: 100,
		// flexGrow:  0,
		backgroundColor: '#FFFFFF',
	},

	cardContent: {
		flexDirection:   'column',
		flexGrow:        2,
		minHeight:       100,
		boxSizing:       'border-box',
		color:           theme.palette.secondary.contrastText,
		backgroundColor: theme.palette.primary.light,
	},

	cardActions: {
		flexDirection:   'column',
		justifyContent:  'center',
		width:           '20%',
		minWidth:        100,
		minHeight:       100,
		color:           theme.palette.primary.contrastText,
		backgroundColor: theme.palette.primary.main,
	},
	cardActionArea: {
		display:   'flex',
		flexDirection:   'column',
		justifyContent:  'center',
		width:           '20%',
		minWidth:        100,
		minHeight:       100,
		height:         '100%',
		color:           theme.palette.primary.contrastText,
		backgroundColor: theme.palette.primary.main,
	},
	close:       {
		padding: theme.spacing.unit / 2,
	},
} );

const SnackItem = ( props ) => {

	const [ open, setOpen ] = useState( false );
	const [ purchaseCanceled, setPurchaseCanceled ] = useState( false );
	const {
		      snack: {
			             snack_price,
			             snack_size,
			             snack_brand,
			             snack_group,
			             imageUrl,
			             title,
			             id
		             },
		      classes
	      } = props;

	useEffect(
		() => {
			// console.log( 'Purchase variable set!!');
			// console.log( purchaseCanceled );
		},
		[ purchaseCanceled ]
	);
	const token = useContext( AuthenticationContext );

	const restApiUrl = "https://snackit-v1.ritapbest.io/wp-json/wp/v2/";
	const restApiPostType = "snackpurchase";

	// build fetch url
	let fetchURL = restApiUrl + restApiPostType + "?title=" + title + "&meta[snack_id]=" + id + "&meta[purchase_price]=" + snack_price + "&meta[purchase_paid]=false&status=publish";

	const purchaseMessage = "product " + title + " purchased";

	const createPost = () => {
		fetch(
			fetchURL,
			{
				method:  "POST",
				headers: { Authorization: "Bearer " + token.wpToken }
			}
		)
			.then( response => {
				if ( response.ok ) {
					console.log( response );
				}
				else {
					throw response;
				}
			} )
			.catch( error => console.error( error ) );
	};

	const purchaseCountdown = ( event ) => {
		event.preventDefault();

		// after 5 sec -> send purchase
		setTimeout( () => {
			if ( purchaseCanceled === false ) {
				console.log( 'Purchase sent!' );
				console.log( purchaseCanceled );
				createPost();
			}
			else {
				console.log( 'Purchase canceled!' );
				console.log( purchaseCanceled );
			}
		}, 5500 );

		// immediately -> open snackbox
		setOpen( true );
	};

	const cancelPurchase = ( event ) => {
		event.preventDefault();
		setPurchaseCanceled( true );
		// setOpen( false );
		console.log( 'cancel Button clicked! ' );
		console.log( purchaseCanceled );
	};

	const handleSnackbarClose = ( event, reason ) => {
		if ( reason === 'clickaway' ) {
			return;
		}
		setOpen( false );
	};

	return (
		<Fragment>
			<Card className={ classes.card + ' snack-item snack-item-' + id }>
				<CardMedia
					className={ classes.cardMedia }
					image={ imageUrl }
					title={ title }
				/>
				<CardContent className={ classes.cardContent }>
					<Typography component="h3" variant="h5">
					{ title }
					</Typography>
					<Typography variant="subtitle1" gutterBottom>
					{ snack_brand }
					</Typography>
					<Typography variant="subtitle2">
					{ snack_size } – { snack_group }
					</Typography>
				</CardContent>

				<CardActions className={ classes.cardActions }>
					<CardActionArea onClick={ purchaseCountdown }  className={ classes.cardActionArea } >
					<CartIcon fontSize="large" />
					<Typography variant="subtitle1">
					{ formatPrice( snack_price ) }
					</Typography>
					</CardActionArea>
				</CardActions>
			</Card>


            <Snackbar
	            anchorOrigin={ {
		            vertical:   'bottom',
		            horizontal: 'left',
	            } }
	            open={ open }
	            autoHideDuration={ 5000 }
	            onClose={ handleSnackbarClose }
	            ContentProps={ { 'aria-describedby': 'purchaseMessage', } }
	            message={ purchaseMessage }
	            action={ [
		            <Button key="undo" color="secondary" size="small" onClick={ cancelPurchase }>
                        UNDO
                    </Button>,
		            <IconButton
			            key="close"
			            aria-label="Close"
			            color="inherit"
			            className={ classes.close }
			            onClick={ handleSnackbarClose }
		            >
                        <CloseIcon />
                    </IconButton>,
	            ] }
            />
        </Fragment>
	);
};

SnackItem.propTypes = {
	classes: PropTypes.object.isRequired,
	// enqueueSnackbar: PropTypes.func.isRequired,
};


export default withStyles( styles )( SnackItem );

