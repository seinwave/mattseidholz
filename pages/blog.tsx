import React, { useEffect, useRef, useState } from "react";
import { getAllPosts } from "../lib/data/posts-api";
import { GetStaticProps } from "next";
import styled from "styled-components";
import { ServerStyleSheet } from "styled-components";
import { Helmet } from "react-helmet";
import { COLORS, QUERIES } from "../styles/CONSTANTS";
import { v4 as uuid } from "uuid";
import "animate.css";
import NavBar from "../lib/components/shell/NavBar";
import Link from "next/link";

export default function Index({ posts, ssrStyles }) {
  let years = [];
  posts.map((post) => years.push(parseInt(post.frontmatter.year)));
  let uniqueYears = new Set(years);
  years = [...uniqueYears];
  years.sort((a, b) => (a > b ? -1 : 1));

  function handleScroll() {
    console.log("scrolling");
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const yearRef = React.useRef(null);
  return (
    <>
      <Helmet>
        <style dangerouslySetInnerHTML={{ __html: ssrStyles }} />
      </Helmet>
      <Wrapper>
        <BlogWrapper>
          <NavBar />

          <BlogList>
            <YearWrapper key={uuid()}>
              <Year ref={yearRef}> 2030</Year>
              2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030
              2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030
              2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030
              2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030
              2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030
              2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030 2030
              2030 2030 2030 2030 2030 2030 2030 2030 2030 2030
            </YearWrapper>
            {years.map((year, i) => {
              return (
                <YearWrapper key={uuid()}>
                  <Year name={year}> {year}</Year>

                  {posts
                    .filter((post) => post.frontmatter.year == year)
                    .sort((post1, post2) =>
                      post1.frontmatter.published > post2.frontmatter.published
                        ? -1
                        : 1
                    )
                    .map((post) => {
                      return (
                        <Link
                          key={uuid()}
                          as={`/posts/${post.frontmatter.slug}`}
                          href="/posts/[slug]"
                        >
                          <IndividualPostWrapper>
                            <PublishedDateWrapper>
                              <PublishedDate>
                                {post.frontmatter.human_published
                                  ? post.frontmatter.human_published.replace(
                                      /,\s\d\d\d\d/,
                                      ""
                                    )
                                  : "Jun 01"}
                              </PublishedDate>
                            </PublishedDateWrapper>

                            <PostContentWrapper>
                              <PostTopLineWrapper>
                                <Title>{post.frontmatter.title}</Title>
                                {/* <ReadStatus>Unread</ReadStatus> */}
                              </PostTopLineWrapper>
                              <Summary>
                                {post.frontmatter.summary
                                  ? post.frontmatter.summary
                                  : "A brief snippet of a line from a movie, whomst is bad"}
                              </Summary>
                            </PostContentWrapper>
                          </IndividualPostWrapper>
                        </Link>
                      );
                    })}
                </YearWrapper>
              );
            })}
          </BlogList>
        </BlogWrapper>
      </Wrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const sheet = new ServerStyleSheet();
  const ssrStyles = sheet.instance.toString();
  const posts = JSON.parse(JSON.stringify(getAllPosts()));
  return {
    props: {
      posts,
      ssrStyles,
    },
  };
};

const Wrapper = styled.div`
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  @media ${QUERIES.tablet} {
    width: revert;
  }
`;

const BlogWrapper = styled.div`
  position: relative;
`;

const BlogList = styled.div`
  position: relative;
`;

const YearWrapper = styled.div`
  display: block;
  width: 100%;
  padding: 8px 36px;
  border: solid 1px blue;
  position: relative;

  &:last-of-type {
    margin-bottom: 50vh;
  }
  @media ${QUERIES.phone} {
    padding: 0rem, 550px;
  }
  @media ${QUERIES.tablet} {
    width: revert;
  }
`;

const Year = styled.div`
  display: block;
  position: sticky;
  top: 96px;
  font-size: 38px;
  padding: 1rem 0px 0px 8px;
  background-color: #fff;
  font-weight: 700;
  margin-bottom: 24px;

  @media ${QUERIES.phone} {
    margin-left: -1.5rem;
  }

  &:after {
    display: block;
    margin: 0;
    border-bottom: solid 1px #dcdcdc;
    width: 100%;
    content: "";
  }
`;

const YearBoundary = styled.div`
  border: solid 1px red;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const IndividualPostWrapper = styled.div`
  margin: 32px 8px;
  padding: 8px;
  display: flex;
  border-radius: 8px;
  transition: background-color 0.1s ease;
  &:hover {
    background-color: ${COLORS.gray[100]};
    text-decoration: none;
    cursor: pointer;
  }
`;

const PublishedDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 4px;
  width: 64px;

  @media ${QUERIES.phone} {
    padding-right: 12px;
    width: 64px;
  }
`;

const PublishedDate = styled.span`
  margin-right: 8px;
  justify-self: baseline;

  @media ${QUERIES.phone} {
  }
`;

const PostContentWrapper = styled.div`
  margin-left: 16px;

  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 550px;
`;

const PostTopLineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  @media ${QUERIES.phone} {
  }
`;

const Summary = styled.span`
  font-weight: 400;
  color: ${COLORS.gray[700]};
  max-width: fit-content;
  @media ${QUERIES.phone} {
  }
`;

const ReadStatus = styled.em`
  color: ${COLORS.primary};
  font-size: 14px;
  text-decoration: unset !important;
`;
