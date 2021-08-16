import React from "react";
import styled, { keyframes } from "styled-components";
import { COLORS, QUERIES } from "../styles/CONSTANTS";

export default function BlogYear({ yearOnTop, year }) {
  return (
    <Year style={yearOnTop ? { color: "red" } : { color: "black" }}>
      {year}
    </Year>
  );
}

const Year = styled.div`
  display: block;
  position: sticky;
  top: 96px;
  font-size: 24px;
  padding: 1rem 0px 0px 8px;
  background-color: #fff;
  font-weight: 700;
  margin-bottom: 24px;
  border-bottom: solid 1px transparent;
  @media ${QUERIES.phone} {
    margin-left: -1.5rem;
  }
`;
