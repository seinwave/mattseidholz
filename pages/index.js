import React from "react";
import styled from "styled-components";
import { ServerStyleSheet } from "styled-components";
import { Helmet } from "react-helmet";
import { COLORS, FONTSIZES, SPACING, WEIGHTS } from "../styles/constants";
import Link from "next/link";

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
        <SiteHeader>MS</SiteHeader>
        <HeroDescription>
          Matt Seidholz is full-stack developer in Brooklyn.
        </HeroDescription>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 800px;
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
