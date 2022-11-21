import React, { useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const navigate = useNavigate();
  const signOutUser = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true })
    window.reload();
  }

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/", { replace: true })
    }
  }, []);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link style={{ textDecoration: "none", color: "black" }} to={"/homepage"}><Logo>Admin Portal</Logo></Link>
        </Left>
        <Right>
          <Link style={{ textDecoration: "none", color: "black" }} to={"/add"}><MenuItem>ADD PRODUCT</MenuItem></Link>
          <MenuItem onClick={signOutUser}>LOG OUT</MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
