import React, { useMemo } from "react";
import { getAllReviews } from "../lib/data/reviews-api";
import styled from "styled-components";
import { ServerStyleSheet } from "styled-components";
import { Helmet } from "react-helmet";
import { COLORS, FONTSIZES, RATINGS, EMOJIS } from "../styles/CONSTANTS";

/*---
layout: post
author: matt
title: Johns of Bleeker Street
creator: MTA
type: Restaurant
published: 2021-06-18
human_published: Jun 18, 2021
rating: 5
summary: A new personal pizza favorite in NYC
--- */

export default function Index({ reviews, ssrStyles }) {
  const data = React.useMemo(() => reviews.map((review) => review.frontmatter));

  return (
    <>
      <Helmet>
        <style dangerouslySetInnerHTML={{ __html: ssrStyles }} />
      </Helmet>
      <Wrapper>
        <BlogWrapper>
          <BlogTitle>MattReviews</BlogTitle>
          <ReviewList>
            {data.map((review) => {
              return (
                <Review data={review}>
                  <ReviewTopRow>
                    <TitleTuple>
                      <Category>{EMOJIS[review.type.toLowerCase()]}</Category>
                      <ReviewTitle>{review.title}</ReviewTitle>
                    </TitleTuple>

                    <Rating>{RATINGS[review.rating]}</Rating>
                  </ReviewTopRow>
                  <ReviewDateRow>
                    {" "}
                    <Date>{review.human_published}</Date>
                  </ReviewDateRow>
                  <ReviewSummaryRow>
                    {" "}
                    <Summary>{review.summary}</Summary>
                  </ReviewSummaryRow>
                </Review>
              );
            })}
          </ReviewList>
        </BlogWrapper>
      </Wrapper>
    </>
  );
}

export function getStaticProps() {
  const sheet = new ServerStyleSheet();
  const ssrStyles = sheet.instance.toString();
  const reviews = JSON.parse(JSON.stringify(getAllReviews()));
  return {
    props: {
      reviews,
      ssrStyles,
    },
  };
}

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const BlogWrapper = styled.div`
  position: relative;
`;

const BlogTitle = styled.header`
  font-size: ${FONTSIZES.postTitle};
  position: sticky;
  display: block;
  height: 96px;
  z-index: 1;
  top: 0;
  background-color: #fff;
`;

const ReviewList = styled.div`
  position: relative;
  padding: 8px;
  font-size: 1.25rem;
  border-collapse: collapse;
  border-radius: 8px;
  width: 700px;
`;

const Review = styled.div`
  border-radius: 8px;
  padding: 18px 36px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  &:hover {
    background-color: ${COLORS.gray[100]};
    text-decoration: none;
    cursor: pointer;
  }
  @media (max-width: 500px) {
    margin: 36px 4px;
  }
`;

const ReviewTopRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 5px;
    font-size: 2.2rem;
  }
`;

const TitleTuple = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  @media (max-width: 500px) {
    display: flex;
    flex-direction: row;
  }
`;

const ReviewTitle = styled.span`
  font-size: 1.6rem;
`;

const Category = styled.span`
  font-size: 2rem;
  margin-right: 1.5rem;
  @media (max-width: 500px) {
    font-size: 3rem;
  }
`;

const Rating = styled.span`
  margin-left: auto;
  font-size: 1.5rem;
  @media (max-width: 500px) {
    margin-left: revert;
    font-size: 2.2rem;
  }
`;

const ReviewDateRow = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 3.3rem;
`;

const Date = styled.em`
  font-size: 1rem;
  color: ${COLORS["gray"[300]]};
  @media (max-width: 500px) {
    margin-left: revert;
    font-size: 1.6rem;
  }
`;

const ReviewSummaryRow = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 3.3rem;
`;

const Summary = styled.span`
  @media (max-width: 500px) {
    margin-left: revert;
    font-size: 2rem;
  }
`;
