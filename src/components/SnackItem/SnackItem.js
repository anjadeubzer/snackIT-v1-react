import React, { useContext } from 'react';

// @material-ui components
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import CartIcon from '@material-ui/icons/AddShoppingCart';

// helper components
import PropTypes from 'prop-types';
import { AuthenticationContext } from '../AuthenticationContext';

//helper functions
import { formatPrice } from '../HelperFunctions/formatPrice';

//@material-ui styles
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({

    cardAction: {
        display: 'flex',
        backgroundColor: theme.palette.primary.main,
    },

    cardMedia: {
        display: 'flex',
        width: '20%',
        flexGrow: 0,
        minHeight: 120,
    },

    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        minHeight: 120,
        boxSizing: 'border-box',
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.primary.light,
    },

    cardActions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '20%',
        minHeight: 120,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
    },
});

const SnackItem = ( props ) => {
    const  token  = useContext( AuthenticationContext );
    console.log( token.wpToken );

    const {
        snack: { snack_price, snack_size, snack_brand, imageUrl, title, id },
        classes
    } = props;

    let restApiUrl = "https://snackit-v1.ritapbest.io/wp-json/wp/v2/";
    let fetchURL = restApiUrl + "snack_purchase?title=" + title + "&status=publish";

    const createPost = () => {
        fetch(
          fetchURL,
            {
                method: "POST",
                headers: {
                    Authorization:
                        "Bearer " + token.wpToken
                }
            }
        )
            .then(response => {
                if (response.ok) {
                    console.log(response);
                } else {
                    throw response;
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <Card className={ 'snack-item snack-item-' + id }>
            <CardActionArea
                className={ classes.cardAction }
                onClick={ createPost }
            >

                <CardMedia
                    className={ classes.cardMedia }
                    image={ imageUrl }
                    title={ title }
                />

                <CardContent className={ classes.cardContent } >
                    <Typography component="h3" variant="h5" >
                        { title }
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom >
                        { snack_brand }
                    </Typography>

                    <Typography variant="body1">
                        { snack_size }
                        {/*{Object.keys( props.snack._embedded["wp:term"][0] ).map( key => ( <a key={ key } index={ key } href={'#' + props.snack._embedded["wp:term"][1][key].name} >{props.snack._embedded["wp:term"][1][key].name}</a> ))}*/}
                    </Typography>
                </CardContent>

                <CardActions className={ classes.cardActions } >
                    <div>
                        <CartIcon fontSize="large" />
                    </div>
                    <div>
                        <Typography variant="subtitle1">
                            { formatPrice( snack_price ) }
                        </Typography>
                    </div>
                </CardActions>

            </CardActionArea>
        </Card>
    );
};
SnackItem.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles(styles)(SnackItem);