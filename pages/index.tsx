import React from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { ServerStyleSheet } from "styled-components";
import { Helmet } from "react-helmet";
import { FONTSIZES } from "../styles/CONSTANTS";

import NavBar from "../lib/components/shell/NavBar";
import Blog from "./blog";

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
  return (
    <>
      <Helmet>
        <style dangerouslySetInnerHTML={{ __html: ssrStyles }} />
      </Helmet>
      <Wrapper>
        <NavBar />
        <RotationContainer>
          <RotatingImage
            src={require("../public/images/bagel.svg")}
            width={100}
            height={100}
          ></RotatingImage>
        </RotationContainer>

        <HeroDescription>
          Matt Seidholz is full-stack developer in Brooklyn.
        </HeroDescription>
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

const BlogWrapper = styled.div`
  position: relative;
`;

const SiteHeader = styled.header`
  font-size: ${FONTSIZES.postTitle};
  display: block;
  background-color: #fff;
  padding-left: 15px;
  padding-top: 15px;
`;

const HeroDescription = styled.div`
  font-size: ${FONTSIZES.postTitle};
  padding-left: 25px;
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
  width: 100px;
  height: 100px;
  animation-name: ${spin};
  animation-duration: 11000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;
const RotatingImage = styled(Image)``;
