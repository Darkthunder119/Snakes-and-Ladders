import React from "react";
import styled from "styled-components";

const User = styled.div`
  position: absolute;
  bottom: 5%;
  left: ${(props) => (props.userOne ? "2%" : "24%")};
  width: 10px;
  height: 10px;
  border: 1px solid black;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

const Users = (props) => {
  return <User color={props.color} userOne={props.userOne} />;
};

export default Users;
