import React, { Component } from "react";
import {
  CircularProgress,
  Typography,
  Grid,
  Box,
  Button,
} from "@material-ui/core";
import NavBar from "./../components/Navbar";
import { withRouter } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import { addToCart } from "./../Redux/Actions/action";
import { connect } from "react-redux";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Herry from "./../assets/h-logo.jpg";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Product: [],
      isLoading: false,
      quantity: 1,
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("LoginToken")) {
      this.props.history.push("/");
    }
    const PRODUCTS = this.props.products;
    const ID = this.props.match.params.id;
    const filtered = PRODUCTS.filter((item) => item.id === Number(ID));
    this.setState({ Product: filtered[0], isLoading: true });
  }

  addToCart(item) {
    this.props.setData({
      ...item,
      quantity: this.state.quantity,
      total: item.price * this.state.quantity,
    });
    this.props.history.push("/");
  }

  render() {
    const item = this.state.Product;
    return (
      <>
        <NavBar />
        {this.state.isLoading ? (
          <div className="container mb-2 mt-3">
            <button
              className="mb-4 btn btn-light"
              onClick={() => this.props.history.goBack()}
              style={{ position: "relative", top: "15px" }}
            >
              <KeyboardBackspaceIcon />
            </button>
            <Grid container className="product-container">
              <Grid item lg={1} />
              <Grid item lg={4} className="product-grid">
                <Box className="hover14 product-image">
                  <figure>
                    <img
                      className="product-image"
                      style={{ width: "350px" }}
                      src={item.image}
                      alt={item.title}
                    />
                  </figure>
                </Box>
              </Grid>
              <Grid item lg={2} />

              <Grid item lg={4} className="product-grid">
                <Box>
                  <Typography className="my-3" variant="h4">
                    {item.title}
                  </Typography>
                  <Typography className="my-3" variant="body2">
                    {item.description}
                  </Typography>
                  <Typography
                    className="my-3 text-capitalize"
                    variant="h6"
                    color="primary"
                  >
                    {item.category}
                  </Typography>
                  <Box className="d-flex align-items-center justify-content-between">
                    <Typography variant="h6">Add Quantity :</Typography>
                    <Box className="d-flex align-items-center">
                      <button
                        className="btn btn-sm border-dark"
                        disabled={this.state.quantity <= 1 ? true : false}
                        onClick={() =>
                          this.setState({ quantity: this.state.quantity - 1 })
                        }
                      >
                        <RemoveIcon />
                      </button>
                      <Typography variant="body1" className="mx-3">
                        {this.state.quantity}
                      </Typography>
                      <button
                        className="btn btn-sm border-dark "
                        onClick={() =>
                          this.setState({ quantity: this.state.quantity + 1 })
                        }
                      >
                        <AddIcon />
                      </button>
                    </Box>
                  </Box>
                  <Typography className="my-3" variant="h4">
                    $. {item.price}
                  </Typography>
                  <hr />
                  <Box className="check">
                    <Typography variant="body1" style={{ padding: "10px" }}>
                      Hitesh Gohel
                      <br />
                      <small>
                        Excellent Product. Excellent Product. Excellent Product.
                        Excellent Product. Excellent Product.
                      </small>
                      <br />
                      <StarIcon className="text-warning" />
                      <StarIcon className="text-warning" />
                      <StarIcon className="text-warning" />
                      <StarHalfIcon className="text-warning" />
                    </Typography>
                    <img
                      src={Herry}
                      width="85px"
                      style={{
                        borderRadius: "50%",
                      }}
                      alt="..."
                    />
                  </Box>

                  <Button
                    className="my-2 bg-dark text-light"
                    variant="contained"
                    onClick={() => this.addToCart(item)}
                    fullWidth
                  >
                    Add To Cart
                  </Button>
                </Box>
                <Grid item lg={1} />
              </Grid>
            </Grid>
          </div>
        ) : (
          <Typography
            variant="h1"
            className="text-center"
            style={{ marginTop: "10rem" }}
          >
            <CircularProgress className="text-dark" />
          </Typography>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.allProducts.products,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setData: (data) => dispatch(addToCart(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
