import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Badge,
} from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import LineWeightIcon from "@material-ui/icons/LineWeight";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { connect } from "react-redux";
class Navbar extends Component {
  render() {
    const CartItemsWithQty = this.props.items.map((q) => q.quantity)
    let totalItems = 0;
    for (let i = 0; i < CartItemsWithQty.length; i++) {
      totalItems = totalItems + CartItemsWithQty[i];
    }
    return (
      <AppBar position="static" id="navbar" className="bg-dark">
        <Toolbar color="secondary">
          <Box sx={{ flexGrow: 1 }}>
            <Link style={{ color: "inherit" }} to="/dashboard">
              <IconButton edge="start" color="inherit" aria-label="menu">
                <LineWeightIcon />
                <span className="mx-3 drawer-header-text">HOUSE Of HERRY</span>
              </IconButton>
            </Link>
          </Box>
          <Button
            color="inherit"
            onClick={() => {
              this.props.history.push("/cart");
            }}
          >
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem("LoginToken");
              localStorage.removeItem("AllProducts");
              localStorage.removeItem("category");
              this.props.history.push("/");
            }}
          >
            <PowerSettingsNewIcon />
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart.cartItems,
});

export default withRouter(connect(mapStateToProps)(Navbar));
