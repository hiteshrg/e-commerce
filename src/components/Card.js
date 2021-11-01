import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "./../Redux/Actions/action";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }
  render() {
    const { quantity } = this.state;
    return (
      <>
        <Link
          className="my-2 btn btn-light"
          to="/dashboard"
          style={{ position: "relative", top: "15px", left: "50px" }}
        >
          <KeyboardBackspaceIcon />
        </Link>
        <Box className="row d-flex justify-content-evenly">
          <Card
            className="col-md-3 border border-dark p-5"
            style={{ width: "550px", margin: "10px" }}
          >
            <Box className="image-container">
              <CardMedia
                component="img"
                className="card-image"
                alt="product image"
                image={this.props.image}
              />
            </Box>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className=""
              >
                {this.props.title}
              </Typography>
              <Typography variant="body2" className="text-muted ">
                {this.props.description}
              </Typography>
              <Typography variant="body2" className="my-2 text-capitalize">
                {this.props.category}
              </Typography>
              <Box className="d-flex justify-content-between">
                <Typography variant="h5">$. {this.props.price}</Typography>
                <Box className="d-flex align-items-center justify-content-evenly">
                  {quantity > 1 ? (
                    <button
                      className="btn btn-sm border-dark"
                      onClick={() => this.setState({ quantity: quantity - 1 })}
                    >
                      <RemoveIcon />
                    </button>
                  ) : (
                    ""
                  )}
                  <Typography variant="body1" className="mx-3">
                    {quantity}
                  </Typography>
                  <button
                    className="btn btn-sm border-dark "
                    onClick={() => {
                      this.setState({ quantity: quantity + 1 });
                    }}
                  >
                    <AddIcon />
                  </button>
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                className="my-2 bg-dark text-light"
                variant="contained"
                onClick={() => {
                  // this.props.setData(this.props);
                  alert("Added");
                }}
                fullWidth
              >
                Add To Cart
              </Button>
            </CardActions>
          </Card>
        </Box>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    setData: (data) => dispatch(addToCart(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CardComponent)
);

// ---------------------------------------------------
// for Future use
// import Card from "../components/Card";

// <Card
//   image={this.state.Product.image}
//   title={this.state.Product.title}
//   description={this.state.Product.description}
//   category={this.state.Product.category}
//   price={this.state.Product.price}
// />;
