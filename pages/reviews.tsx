import React from "react";
import { getAllReviews } from "../lib/data/reviews-api";
import styled from "styled-components";
import { ServerStyleSheet } from "styled-components";
import { Helmet } from "react-helmet";
import {
  COLORS,
  FONTSIZES,
  RATINGS,
  EMOJIS,
  QUERIES,
} from "../styles/CONSTANTS";
import NavBar from "../lib/components/shell/NavBar";

export default function Index({ reviews, ssrStyles }) {
  const data = React.useMemo(
    () => reviews.map((review) => review.frontmatter),
    [reviews]
  );

  return (
    <>
      <Helmet>
        <style dangerouslySetInnerHTML={{ __html: ssrStyles }} />
      </Helmet>
      <Wrapper>
        <NavBar />
        <BlogWrapper>
          <ReviewList>
            {data.map((review) => {
              return (
                <React.Fragment key={review.title}>
                  <Review>
                    <TitleTuple>
                      {" "}
                      <Category
                        title={
                          review.type.charAt(0).toUpperCase() +
                          review.type.slice(1)
                        }
                      >
                        {EMOJIS[review.type.toLowerCase()]}
                      </Category>
                      <ReviewTitle>{review.title}</ReviewTitle>
                    </TitleTuple>
                    <Date>{review.human_published}</Date>{" "}
                    <Summary>{review.summary}</Summary>
                    <Rating>{RATINGS[review.rating]}</Rating>{" "}
                  </Review>
                </React.Fragment>
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
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  @media ${QUERIES.tablet} {
    width: revert;
  }
`;

const BlogWrapper = styled.div`
  position: relative;
  /* width: 800px;
  margin-left: auto;
  margin-right: auto;
  @media ${QUERIES.tablet} {
    width: 70%;
  }
  @media ${QUERIES.phone} {
    width: revert;
  } */
`;

const ReviewList = styled.div`
  position: relative;
  padding: 8px;
  border-radius: 8px;
`;

const Review = styled.div`
  border-radius: 8px;
  border: solid 1px green;
  padding: 18px 36px;
  margin: 16px;

  display: grid;

  grid-template-areas:
    "title rating"
    "date ."
    "summary .";
  &:hover {
    background-color: ${COLORS.gray[100]};
    text-decoration: none;
    cursor: pointer;
  }
  @media ${QUERIES.tablet} {
    border: solid 1px blue;
  }

  @media ${QUERIES.phone} {
    border: solid 1px red;
    display: revert;
    width: 80%;
  }
`;

const TitleTuple = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  grid-area: title;
`;

const ReviewTitle = styled.div`
  margin-left: 8px;
  font-size: 24px;
  overflow: ellipsis;
  @media ${QUERIES.phone} {
    margin-left: 5%;
  }
`;

const Category = styled.div`
  font-size: 28px;
  @media ${QUERIES.phone} {
  }
`;

const Rating = styled.div`
  grid-area: rating;
  margin-left: auto;
  @media ${QUERIES.phone} {
  }
`;

const Date = styled.div`
  grid-area: date;

  color: ${COLORS["gray"[300]]};
`;

const Summary = styled.div`
  grid-area: summary;
  @media ${QUERIES.phone} {
    /* margin-left: revert;
    font-size: 2rem; */
  }
`;
