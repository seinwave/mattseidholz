import React, { useEffect, useRef, useState } from "react";
import { getAllPosts } from "../lib/data/posts-api";
import { GetStaticProps } from "next";
import styled from "styled-components";
import { ServerStyleSheet } from "styled-components";
import { Helmet } from "react-helmet";
import { COLORS, QUERIES } from "../styles/CONSTANTS";
import { v4 as uuid } from "uuid";
import NavBar from "../lib/components/shell/NavBar";
import Link from "next/link";

export default function Blog({ posts, ssrStyles }) {
  let years = [];
  posts.map((post) => years.push(parseInt(post.frontmatter.year)));
  let uniqueYears = new Set(years);
  years = [...uniqueYears];
  years.sort((a, b) => (a > b ? -1 : 1));

  const yearsRef = React.useRef([]);

  function handleScroll() {
    const clientY = window.scrollY;
    yearsRef.current.map((ref, i) => {
      const rect = ref.getBoundingClientRect();
      const { y } = rect;

      if (y < 99) {
        ref.firstChild.classList.add("top-year");
      }

      if (y > 100 || clientY < 5) {
        ref.firstChild.classList.remove("top-year");
      }
    });
  }

  React.useEffect(() => {
    yearsRef.current = yearsRef.current.slice(0, years.length);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <Wrapper>
        <BlogWrapper>
          <NavBar />

          <BlogList>
            {years.map((year, i) => {
              return (
                <YearWrapper
                  ref={(el) => (yearsRef.current[i] = el)}
                  key={uuid()}
                >
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
  const posts = JSON.parse(JSON.stringify(getAllPosts()));
  return {
    props: {
      posts,
    },
  };
};

const Wrapper = styled.div`
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
`;

const BlogList = styled.div`
  position: relative;
`;

const YearWrapper = styled.div`
  display: block;
  width: 100%;
  padding: 8px 36px;

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
  font-size: 24px;
  padding: 1rem 0px 0px 8px;
  background-color: #fff;
  font-weight: 700;
  margin-bottom: 24px;

  @media ${QUERIES.phone} {
    margin-left: -1.5rem;
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
