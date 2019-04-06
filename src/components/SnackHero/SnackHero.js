import React, { Component } from 'react';

// child components
import SearchSnacks from '../SearchSnacks';
import FilterSnacks from '../FilterSnacks';

// helper components
import PropTypes from 'prop-types';

// importing images for the component
import heroImg from '../assets/img/fogg-coffee-break.png' // relative path to image


// @material-ui components
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FilterIcon from '@material-ui/icons/FilterList';



// material UI styling
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	heroSection: {
		margin: '0 -20',
		// backgroundColor: theme.palette.background.paper,
	},
	heroContent: {
		margin: '0 auto',
		padding: `${theme.spacing.unit * 8}px 0 0 ${theme.spacing.unit * 11}px`,
		backgroundColor: theme.palette.primary.contrastText,
		backgroundImage: `url(${heroImg})`,
		backgroundSize: 'auto 95%',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: '0% 50%',
	},
	heroHeadline: {
		fontSize: '8vw',
		fontWeight: '500',
	},

	tabsContainer: {
		type: 'dark',
		marginLeft: `-${theme.spacing.unit * 11}px`,
		marginTop: theme.spacing.unit * 6,
		backgroundColor: theme.palette.secondary.light,
	},
	tabbedContent: {
		// color: theme.palette.primary.contrastText,
		flexGrow: 1,
		minHeight: 80,
		padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px`,
		backgroundColor: theme.palette.primary.light,
		marginBottom: theme.spacing.unit * 4,
	},
});



class SnackHero extends Component {

	state = {
		value: 0,
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	// render our searchField
	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			<section className={classes.heroSection}>
				<div className={classes.heroContent}>

					<Typography variant="h1" align="center" className={classes.heroHeadline}>
						Welcome
					</Typography>

					<Typography variant="h4" align="center" gutterBottom>
						Choose your snack …
					</Typography>

					<Tabs
						className={classes.tabsContainer}
						value={this.state.value}
						onChange={this.handleChange}
						variant="fullWidth"
						indicatorColor="secondary"
						textColor="secondary"
					>
						<Tab icon={<SearchIcon />} label="Search" />
						<Tab icon={<FilterIcon />} label="Filter" />
						<Tab icon={<FavoriteIcon />} label="My Favorites" />
					</Tabs>



					{/** -- quick filter possibilities
					 * todo: create two(three) ways of filtering
					 * It is possible to choose one! no combination for the sake of simplicity (KISS)
					 * 1) tag filtering by showing snackGroups and tags ( search by touch/click )
					 * 2) search input ( search by typing )
					 * 3) favorites - latest checkout products sorted by times of consumption **/}

				</div>

				{ // the first tab shows the search by typing the name of the product
					value === 0 &&
					<SearchSnacks
						className={classes.tabbedContent}
						typeSearch={ this.props.typeSearch }
					/>
				}
				{ // the second tab shows the search by clicking the category or tag name
					value === 1 &&
					<FilterSnacks
						className={classes.tabbedContent}
						filterSearch={this.filterSearch}
						snackGroups={ this.props.snackGroups }
					/> }
				{ // the third tab shows the latest purchases
					value === 2 &&
					<div className={classes.tabbedContent}>My latest Purchases</div>
				}

			</section>
		)
	}
}

SnackHero.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles( styles )( SnackHero );