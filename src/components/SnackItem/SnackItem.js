import React from 'react';

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

    const {
        snack: { snack_price, snack_size, snack_brand, imageUrl, title, id },
        classes
    } = props;

    let fetchURL = "https://snackit-v1.ritapbest.io/wp-json/wp/v2/snack_purchase?title=" + title + "&status=publish";

    const createPost = () => {
        fetch(
          fetchURL,
            {
                method: "POST",
                headers: {
                    Authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc25hY2tpdC12MS5yaXRhcGJlc3QuaW8iLCJpYXQiOjE1NTQ3NTM2MDAsIm5iZiI6MTU1NDc1MzYwMCwiZXhwIjoxNTU1MzU4NDAwLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIyIn19fQ.ZjTRdATZ28AfcR63XzHYVjoATSQUu_7zQJASa3yYQ90"
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