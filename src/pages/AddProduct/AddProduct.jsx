import React from 'react'
import Navbar from '../../components/Navbar'
import styled from "styled-components";
import { useState, useEffect } from 'react';
import axios from "axios";


const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [product, setProduct] = useState([]);


  const getProduct = async () => {
    const res = await axios("http://localhost:8080/getProduct", {
      method: "GET",
    });
    setProduct(res.data.product);
  };

  const handleClick = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:8080/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title, price, description, productImage
      })
    })

    const result = await res.json();
    const statusCode = res.status;

    if (statusCode === 422 || !result) {
      alert('Product Add Failed !!!')
    } else {
      alert('Product Added!!!')
      getProduct();
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch("http://localhost:8080/deleteProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id
      })
    })

    const result = await res.json();
    getProduct();
  }


  return (
    <>
      <Navbar />
      <div style={{ marginTop: "3rem" }}>
        <Wrapper>
          <Title>CREATE PRODUCT</Title>
          <Form>
            <Input
              placeholder="Product Name"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="Product Amount"
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              placeholder="Product Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              placeholder="Product Image"
              onChange={(e) => setProductImage(e.target.value)}
            />
            <Button onClick={handleClick}>
              Add Product
            </Button>
          </Form>
        </Wrapper>

        <h2 style={{ marginLeft: "1rem" }}>Products</h2>

        <div className="recent_purchase" style={{ marginLeft: "1rem", marginBottom: "2rem" }}>
          {product.length > 0 ? <>
            <table>
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Delete It</th>
              </tr>
              {product.map((elem, index) => {
                return (
                  <>
                    <tr>
                      <td>{elem.title}</td>
                      <td>{elem.price} RS</td>
                      <td style={{ display: "flex", justifyContent: "space-around" }}><p onClick={() => { handleDelete(elem._id) }} style={{ cursor: "pointer" }}>❌</p></td>
                    </tr>
                  </>
                )
              })}
            </table>
          </> : <><h3>No Product At Time</h3></>}
        </div>
      </div>
    </>
  )
}

export default AddCourse