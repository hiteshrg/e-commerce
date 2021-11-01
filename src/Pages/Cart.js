import React, { Component } from "react";
import NavBar from "../components/Navbar";
import { connect } from "react-redux";
import ClearIcon from "@material-ui/icons/Clear";
import { Link, withRouter } from "react-router-dom";
import emptyBasket from "../assets/empty_basket.webp";
import { addToCart, removeToCart } from "../Redux/Actions/action";
import { Box, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      check: false,
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("LoginToken")) this.props.history.push("/");
    this.setState({ cartItems: this.props.items });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.items !== this.props.items)
      this.setState({ cartItems: this.props.items });
    if (prevState.cartItems !== this.state.cartItems)
      this.setState({ cartItems: this.state.cartItems });
  }

  AddQuantity(id, qty) {
    const test = this.state.cartItems.find((data) => data.id === id);
    const index = this.state.cartItems.findIndex((item) => item.id === id);
    test.quantity = qty + 1;
    test.total = test.quantity * test.price; // eslint-disable-next-line
    this.state.cartItems[index] = test;
    this.setState({ check: !this.state.check });
  }

  RemoveQuantity(id, qty) {
    const test = this.state.cartItems.find((data) => data.id === id);
    const index = this.state.cartItems.findIndex((item) => item.id === id);
    test.quantity = qty - 1;
    test.total = test.quantity * test.price; // eslint-disable-next-line
    this.state.cartItems[index] = test;
    this.setState({ check: !this.state.check });
  }

  render() {
    const total = this.state.cartItems.map((p) => p.total);
    let totalPrice = 0;
    for (let i = 0; i < total.length; i++) {
      totalPrice = totalPrice + total[i];
    }

    return (
      <>
        {this.state.cartItems.length > 0 ? (
          <div>
            <NavBar />
            <button
              className="btn btn-light link-arrow-back"
              onClick={() => this.props.history.goBack()}
            >
              <ArrowBackIosIcon /> Continue Shopping
            </button>
            <div className="container-fluid table-div">
              <h4 className="float-end mb-3 totalPrice ">
                <span className="text-muted">Total :</span> ${" "}
                {totalPrice.toFixed(2)}
              </h4>
              <table className="table table-hover table-container">
                <thead className="table-dark">
                  <tr className="text-center">
                    <th scope="col"></th>
                    <th scope="col">#</th>
                    <th scope="col">Product Title</th>
                    <th scope="col">Product Image</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {this.state.cartItems.map((item) => {
                    return (
                      <tr style={{ height: "100px" }} key={item.id}>
                        <td>
                          <button
                            className="btn btn-light"
                            onClick={() => this.props.setData(item.id)}
                          >
                            <ClearIcon />
                          </button>
                        </td>
                        <td>{item.id}</td>
                        <td
                          onClick={() =>
                            this.props.history.push(`/product/${item.id}`)
                          }
                        >
                          {item.title}
                        </td>
                        <td>
                          <img src={item.image} alt="..." width="50px" />
                        </td>
                        <td>$. {item.price}</td>

                        <td>
                          <Box className="d-flex justify-content-center align-items-center">
                            <button
                              className="btn btn-sm border-dark"
                              disabled={item.quantity <= 1 ? true : false}
                              onClick={() =>
                                this.RemoveQuantity(item.id, item.quantity)
                              }
                            >
                              <RemoveIcon />
                            </button>
                            <Typography style={{ width: "50px" }}>
                              {item.quantity}
                            </Typography>
                            <button
                              className="btn btn-sm border-dark"
                              onClick={() =>
                                this.AddQuantity(item.id, item.quantity)
                              }
                            >
                              <AddIcon />
                            </button>
                          </Box>
                        </td>
                        <td>$. {item.total.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <hr />
          </div>
        ) : (
          <div className="text-center my-3">
            <img
              src={emptyBasket}
              alt="empty-baskey"
              style={{
                display: "flex",
                margin: "auto auto",
              }}
              width="50%"
            />
            <Link className="btn btn-dark my-3" to="/dashboard">
              <HomeIcon />
              <span className="mx-2">Continue Shoping</span>
            </Link>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setData: (data) => dispatch(removeToCart(data)),
    AddToCart: (data) => dispatch(addToCart(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
