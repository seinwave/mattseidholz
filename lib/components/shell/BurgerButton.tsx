import React from "react";
import MobileNav from "./MobileNav";
import styled from "styled-components";

export default function BugerButton({ open, setOpen }) {
  return (
    <>
      <BurgerButtonContainer
        onClick={() => setOpen(!open)}
        className="burger-container"
      >
        <button className="burger-button">
          <div className={open ? "first-bar" : null} />
          <div className={open ? "second-bar" : null} />
          <div className={open ? "third-bar" : null} />
        </button>
      </BurgerButtonContainer>
      <MobileNav open={open} setOpen={setOpen} />
    </>
  );
}

const BurgerButtonContainer = styled.div`
  z-index: 10001;
`;
