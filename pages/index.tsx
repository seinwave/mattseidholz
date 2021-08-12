import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { ServerStyleSheet } from "styled-components";
import { Helmet } from "react-helmet";
import { FONTSIZES } from "../styles/CONSTANTS";

import NavBar from "../lib/components/shell/NavBar";

export function getStaticProps() {
  const sheet = new ServerStyleSheet();
  const ssrStyles = sheet.instance.toString();
  return {
    props: {
      ssrStyles,
    },
  };
}

export default function Index({ ssrStyles }) {
  const [partyTime, setPartyTime] = useState(false);
  const [animated, setAnimated] = useState(true);

  function handleHover() {
    setPartyTime(true);
  }

  function handleBlur() {
    setPartyTime(false);
    setAnimated(true);
  }

  function handleBagelClick() {
    setAnimated(!animated);
  }

  return (
    <>
      <Helmet>
        <style dangerouslySetInnerHTML={{ __html: ssrStyles }} />
      </Helmet>
      <Wrapper>
        <NavBar />
        <HeroRow style={{ marginTop: "5rem" }}>
          <RotationContainer
            onMouseEnter={() => handleHover()}
            onMouseLeave={() => handleBlur()}
            onClick={() => handleBagelClick()}
            style={{ animationPlayState: animated ? "running" : "paused" }}
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
            Matt Seidholz is a full-stack{" "}
            {partyTime ? <BagelDJText>BAGEL DJ</BagelDJText> : "developer"} in
            Brooklyn.
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

const partyMode = keyframes`
0%{ color: red;}
49%{color: blue;}
60%{color: transparent;}
99%{color: purple;}
100%{color: black;}
`;

const BagelDJText = styled.span`
  animation: ${partyMode} 0.5s infinite;
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
  &:hover {
    animation-duration: 500ms;
    cursor: grab;
  }
`;
const RotatingImage = styled(Image)``;
