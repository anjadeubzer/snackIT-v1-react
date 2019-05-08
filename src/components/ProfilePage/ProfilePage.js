import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// @material-ui components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

// child components
import NavBar from '../NavBar';

//helper functions
import { formatPrice } from '../HelperFunctions/formatPrice';

// styles
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: 100,
        padding: `0 ${theme.spacing.unit * 3}px`,

        width: '80%',
        marginTop: theme.spacing.unit * 6,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    headline: {
        marginTop: theme.spacing.unit * 9,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },

    // root: {
    //     width: '100%',
    //     marginTop: theme.spacing.unit * 3,
    // },
});
const actionsStyles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit * 2.5,
	},
});
const toolbarStyles = theme => ({
	root: {
		// paddingRight: theme.spacing.unit,
		paddingRight: 0,
		paddingLeft: 0,
	},
	highlight:
	      theme.palette.type === 'light'
		      ? {
			      color: theme.palette.secondary.main,
			      backgroundColor: lighten(theme.palette.secondary.light, 0.85),
		      }
		      : {
			      color: theme.palette.text.primary,
			      backgroundColor: theme.palette.secondary.dark,
		      },
	spacer: {
		flex: '1 1 100%',
	},
	actions: {
		color: theme.palette.text.secondary,
	},
	title: {
		flex: '0 0 auto',
	},
});


let counter = 0;

function createData( key, snack_title, purchase_price, purchase_date) {
    counter += 1;
    return { id: key, snack_title, purchase_price, purchase_date };
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}
function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}



const rows = [
	// { id: 'snack_id', numeric: true, disablePadding: false, label: 'Snack ID' },
    { id: 'snack_title', numeric: false, disablePadding: true, label: 'Snack' },
    { id: 'purchase_price', numeric: true, disablePadding: false, label: 'Price' },
    { id: 'purchase_date', numeric: true, disablePadding: false, label: 'Date' },
];



class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
        <TableRow>
            {rows.map(
                row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <Tooltip
                            title="Sort"
                            placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                            enterDelay={300}
                        >
                            <TableSortLabel
                                active={orderBy === row.id}
                                direction={order}
                                onClick={this.createSortHandler(row.id)}
                            >
                                {row.label}
                            </TableSortLabel>
                        </Tooltip>
                    </TableCell>
                ),
                this,
            )}
        </TableRow>
      </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
            {numSelected > 0 ? (
                <Typography color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography variant="h6" id="tableTitle">
                    Your Purchased Snacks
                </Typography>
            )}
            </div>
      <div className={classes.spacer} />
    </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);




let restApiUrl = "https://snackit-v1.ritapbest.io/wp-json/wp/v2/";
let snackPurchases = {};
// first get the Snacks
window.fetch( restApiUrl + 'snackpurchase?_embed=1&per_page=100&author=2' )
    .then( ( res ) => {
        if ( res.ok ) {
            return res.json();
        }
        throw res.error;
    } )
    .then( ( res ) => {

        snackPurchases = res.map( (purchase, index)  => {
            let date =
                    new Date(purchase.date).toLocaleDateString() +
                    ' um ' +
                    new Date(purchase.date).toLocaleTimeString() +
                    ' Uhr';

            return Object.assign(
                {},
                {
                    key:            index,
                    snack_title:    purchase.title.rendered,
                    snack_id:       purchase.meta.snack_id,
                    purchase_price: purchase.meta.purchase_price,
                    purchase_date:  date,
                }
            );
        } );

        console.log( snackPurchases );
    } )
    .catch( ( fetchError ) => {
        // setError( fetchError );
    } );


class EnhancedTable extends React.Component {

    state = {
        order: 'desc',
        orderBy: 'purchase_date',
        selected: [],
        data: snackPurchases,
        page: 0,
        rowsPerPage: 8,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Fragment>
                <NavBar />

                <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} />

                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />

                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map( n => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={ n.key }
                                        >
                                            <TableCell scope="row">{n.snack_title}</TableCell>
                                            <TableCell align="right">{ formatPrice( n.purchase_price ) }</TableCell>
                                            <TableCell align="right">{ n.purchase_date }</TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={4} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <TablePagination
                    rowsPerPageOptions={[8, 16, 24, 48, 80]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
            </Fragment>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);