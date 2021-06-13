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
        <SiteHeader>Matt Seidholz</SiteHeader>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: auto;
`;

const BlogWrapper = styled.div`
  position: relative;
`;

const SiteHeader = styled.header`
  font-size: ${FONTSIZES.pageHead};
  display: block;
  background-color: #fff;
  padding-left: 15px;
  padding-top: 15px;
  border-bottom: 2px solid black;
`;

const BlogList = styled.div`
  position: relative;
`;

const YearWrapper = styled.section`
  padding: 8px 36px;
  &:last-of-type {
    margin-bottom: 50vh;
  }
`;

const Year = styled.span`
  display: block;
  position: sticky;
  top: 96px;
  font-size: 32px;
  width: 100%;
  background-color: #fff;
  font-weight: 700;
  margin-bottom: 24px;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const IndividualPostWrapper = styled.div`
  margin: 32px 8px;
  display: flex;
`;

const PublishedDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-right: solid 1px ${COLORS.gray[300]};
  padding-right: 2px;
  height: 54px;
  width: 64px;
`;

const PublishedDate = styled.span`
  font-size: 16px;
  margin-right: 8px;
  justify-self: baseline;
`;

const PostContentWrapper = styled.div`
  margin-left: 16px;

  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 550px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const PostTopLineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const Summary = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${COLORS.gray[700]};
  max-width: fit-content;
`;

const ReadStatus = styled.em`
  color: ${COLORS.primary};
  font-size: 14px;
  text-decoration: unset !important;
`;
