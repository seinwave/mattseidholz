import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { FONTSIZES } from "../styles/CONSTANTS";

import NavBar from "../lib/components/shell/NavBar";

export default function Index({}) {
  const [partyTime, setPartyTime] = useState(false);
  const [animated, setAnimated] = useState(true);

  function handleHover() {
    setPartyTime(true);
  }

  function handleBlur() {
    setPartyTime(false);
  }

  function handleBagelClick() {
    setAnimated(!animated);
  }

  return (
    <>
      <Wrapper>
        <NavBar />
        <HeroRow style={{ marginTop: "5rem" }}>
          <RotationContainer
            onMouseEnter={() => handleHover()}
            onMouseLeave={() => handleBlur()}
            onClick={() => handleBagelClick()}
            style={{
              animationPlayState: animated ? "running" : "paused",
            }}
          >
            <RotatingImage
              src={require("../public/images/bagel.svg")}
              width={150}
              height={150}
            ></RotatingImage>
          </RotationContainer>
        </HeroRow>

        <HeroRow>
          <HeroDescription>
            Matt Seidholz is a full-stack developer Brooklyn.
          </HeroDescription>
        </HeroRow>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
`;

const HeroRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  position: relative;
`;

const HeroDescription = styled.div`
  font-size: ${FONTSIZES.postTitle};
  text-align: center;
  padding-top: 45px;
`;

const spin = keyframes`
 from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}`;

const RotationContainer = styled.div`
  padding: 5px;
  width: 150px;
  height: 150px;
  animation-name: ${spin};
  animation-duration: 11000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transition-duration: 5s;
  &:hover {
    animation-duration: 500ms;
    cursor: grab;
  }
`;
const RotatingImage = styled(Image)``;
