import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Button,
  Badge,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton,
  Divider,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FilterAltIcon from "@material-ui/icons/Sort";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCatWiseProduct,
  removeCatWiseProduct,
} from "../Redux/Actions/action";
import Dashboard from "../Pages/Dashboard";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class PersistentDrawerLeft extends React.Component {
  state = {
    open: true,
    category: [],
    test: false
  };

  handleDrawerOpen = () => this.setState({ open: true });
  handleDrawerClose = () => this.setState({ open: false });

  handleCategory = (e) => {
    const item = e.target.name;
    const value = e.target.checked;
    const products = this.props.allProducts;
    const category = this.state.category;
    if (value) {
      this.setState({ category: [...category, item] });
      const data = products.filter((d) => d.category === item);
      let fileteredItems = [...new Set(data)];
      this.props.setCatWiseProducts(fileteredItems);
    } else {
      this.props.removeFromCat(item);
      const afterFilter = category.filter((data) => data !== item);
      this.setState({ category: afterFilter });
    }
  };

  selectedCategoryItems() {
    const products = this.props.allProducts;
    const category = this.state.category;
    if (category.includes("men's clothing")) {
      document.getElementById("men").checked = true;
      const data = products.filter((d) => d.category === "men's clothing");
      const filteredItems = [...new Set(data)];
      this.props.setCatWiseProducts(filteredItems);
    }

    if (category.includes("jewelery")) {
      document.getElementById("jewelery").checked = true;
      const data = products.filter((d) => d.category === "jewelery");
      const filteredItems = [...new Set(data)];
      this.props.setCatWiseProducts(filteredItems);
    }

    if (category.includes("electronics")) {
      document.getElementById("electronics").checked = true;
      const data = products.filter((d) => d.category === "electronics");
      const filteredItems = [...new Set(data)];
      this.props.setCatWiseProducts(filteredItems);
    }

    if (category.includes("women's clothing")) {
      document.getElementById("women").checked = true;
      const data = products.filter((d) => d.category === "women's clothing");
      const filteredItems = [...new Set(data)];
      this.props.setCatWiseProducts(filteredItems);
    }
  }

  componentDidMount() {
    if (localStorage.getItem("category")) {
      this.setState({ category: JSON.parse(localStorage.getItem("category")) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.category !== this.state.category) {
      localStorage.setItem("category", JSON.stringify(this.state.category))
    }

    if (prevState.open === true) {
      this.selectedCategoryItems()
    }

    if (prevState.test === this.state.test) {
      this.setState({ test: !this.state.test })
    }
  }

  logOut() {
    localStorage.removeItem("LoginToken");
    localStorage.removeItem("AllProducts");
    localStorage.removeItem("category");
    this.props.history.push("/");
    window.location.reload();
  }

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    const CartItemsWithQty = this.props.items.map((q) => q.quantity)
    let totalItems = 0;
    for (let i = 0; i < CartItemsWithQty.length; i++) {
      totalItems = totalItems + CartItemsWithQty[i];
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames("bg-dark", classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" color="inherit">
                <Link to="/" className="text-light drawer-header-text" >
                  HOUSE Of HERRY
                </Link>
              </Typography>
            </Box>
            <Button
              color="inherit"
              onClick={() => this.props.history.push("/cart")}
            >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </Button>
            <Button color="inherit" onClick={() => this.logOut()}>
              <PowerSettingsNewIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={(classes.drawerHeader)} >
            <IconButton onClick={this.handleDrawerClose} >
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem className='bg-dark text-light'>
              <ListItemIcon className='text-light'>
                <FilterAltIcon />
              </ListItemIcon>
              <ListItemText>Filters</ListItemText>
            </ListItem>

            <ListItem button>
              <ListItemText>
                <input
                  id="men"
                  type="checkbox"
                  name="men's clothing"
                  className="form-check-input check-input-mr-15px bg-dark"
                  onClick={(e) => this.handleCategory(e)}
                />
                <label className="text-capitalize">man's Clothing</label>
              </ListItemText>
            </ListItem>

            <ListItem button>
              <ListItemText>
                <input
                  type="checkbox"
                  name="jewelery"
                  id="jewelery"
                  className="form-check-input check-input-mr-15px bg-dark"
                  onClick={(e) => this.handleCategory(e)}
                />
                <label className="text-capitalize">jewelery</label>
              </ListItemText>
            </ListItem>

            <ListItem button>
              <ListItemText>
                <input
                  type="checkbox"
                  id="electronics"
                  name="electronics"
                  className="form-check-input check-input-mr-15px bg-dark"
                  onClick={(e) => this.handleCategory(e)}
                />
                <label className="text-capitalize">electronics</label>
              </ListItemText>
            </ListItem>

            <ListItem button>
              <ListItemText>
                <input
                  type="checkbox"
                  id="women"
                  name="women's clothing"
                  className="form-check-input check-input-mr-15px bg-dark"
                  onClick={(e) => this.handleCategory(e)}
                />
                <label className="text-capitalize">woman's clothing</label>
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <Dashboard />
          <div className={classes.drawerHeader} />
        </main>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.cart.cartItems,
  allProducts: state.allProducts.products,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCatWiseProducts: (data) => dispatch(getCatWiseProduct(data)),
    removeFromCat: (data) => dispatch(removeCatWiseProduct(data)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(PersistentDrawerLeft))
);
