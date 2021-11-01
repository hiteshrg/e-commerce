import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Box, CircularProgress } from "@material-ui/core";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { addToCart, getAllProduct } from "./../Redux/Actions/action";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Products: [],
      isLoading: false,
      quantity: 1,
      catWiseProducts: [],
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("LoginToken")) {
      this.props.history.push("/");
    }
    if (!localStorage.getItem("AllProducts")) {
      axios
        .get("https://fakestoreapi.com/products")
        .then((result) => {
          this.setState({ Products: result.data, isLoading: true });
          this.props.setAllProducts(this.state.Products);
          localStorage.setItem("AllProducts", JSON.stringify(result.data));
        })
        .catch((err) => console.log("Error :", err));
    } else {
      const data = JSON.parse(localStorage.getItem("AllProducts"));
      this.setState({ isLoading: true, isProducts: true, Products: data });
      this.props.setAllProducts(data);
    }
  }

  componentDidUpdate(prevProps) {
    const PrevCategory = prevProps.catWiseProducts;
    const CurrentCategory = this.props.catWiseProducts;

    if (prevProps.catWiseProducts !== CurrentCategory)
      this.setState({ isLoading: false });

    if (PrevCategory.length > 1 && CurrentCategory.length < 1)
      this.setState({ isLoading: true });

    if (PrevCategory !== CurrentCategory) {
      const unique = Array.from(new Set(CurrentCategory.map(JSON.stringify))).map(JSON.parse);
      this.setState({ catWiseProducts: unique });
    }
  }

  Loader() {
    return (
      <h1 className="text-center mt-5">
        <CircularProgress
          className="text-dark"
          style={{ marginTop: "15rem" }}
        />
      </h1>
    );
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Box className="row d-flex box-margin-5rem">
            {this.state.Products.map((item) => {
              return (
                <Card className="dashboard-card" key={item.id}>
                  <Link to={`/product/${item.id}`}>
                    <div className="image-container">
                      <CardMedia
                        component="img"
                        alt="product image"
                        image={item.image}
                        className="card-image"
                      />
                    </div>
                  </Link>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      className="title"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-muted description"
                    >
                      {item.description}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {item.category}
                    </Typography>
                    <Typography variant="h5">$. {item.price}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      className="my-2 border-dark"
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        this.props.setData({
                          ...item,
                          quantity: this.state.quantity,
                          total: item.price,
                        });
                      }}
                    >
                      Add To Cart
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        ) : (
          ""
        )}

        {this.state.catWiseProducts.length > 0 ? (
          <Box className="row d-flex box-margin-5rem">
            {this.state.catWiseProducts.map((item, i) => {
              return (
                <Card className="dashboard-card" key={i}>
                  <Link to={`/product/${item.id}`}>
                    <Box className="image-container">
                      <CardMedia
                        component="img"
                        alt="product image"
                        image={item.image}
                        className="card-image"
                      />
                    </Box>
                  </Link>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      className="title"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-muted description"
                    >
                      {item.description}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {item.category}
                    </Typography>
                    <Typography variant="h5">$. {item.price}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      className="my-2 border-dark"
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        this.props.setData({
                          ...item,
                          quantity: this.state.quantity,
                          total: item.price,
                        });
                      }}
                    >
                      Add To Cart
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        ) : (
          ""
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  catWiseProducts: state.allProducts.catWiseProduct,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setData: (data) => dispatch(addToCart(data)),
    setAllProducts: (data) => dispatch(getAllProduct(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
