import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions.js";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants.js";

import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const pageNumber = useParams() || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history("/login");
    }
    if (successCreate) {
      history(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    successDelete,
    successCreate,
    createdProduct,
    userInfo,
    pageNumber,
  ]);

  const createProductHandler = () => {
    if (window.confirm("Are You Sure?")) {
      dispatch(createProduct());
    }
  };
  const deleteProductsHandler = (id) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(deleteProduct(id));
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fa fa-plus"></i>Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fa fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteProductsHandler(product._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
