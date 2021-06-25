import React, { useEffect, useState, createRef } from "react";
import { getAllPosts } from "../lib/data/posts-api";
import styled from "styled-components";
import { ServerStyleSheet } from "styled-components";
import { Helmet } from "react-helmet";
import { COLORS, FONTSIZES } from "../styles/CONSTANTS";
import { v4 as uuid } from "uuid";
import Link from "next/link";

export default function Index({ posts, ssrStyles }) {
  const [yearRefs, setYearRefs] = useState([]);

  let years = [];
  posts.map((post) => years.push(parseInt(post.frontmatter.year)));
  let uniqueYears = new Set(years);
  years = [...uniqueYears];
  years.sort((a, b) => (a > b ? -1 : 1));
  const yearsLength = years.length;

  useEffect(() => {
    setYearRefs((yearRefs) => {
      return Array(yearsLength)
        .fill()
        .map((_, i) => yearRefs[i] || createRef());
    });

    window.addEventListener("scroll", () => handleScroll());

    return () => window.removeEventListener("scroll", handleScroll);
  }, [yearsLength]);

  //todo: add some neato scrolling effects
  function handleScroll() {
    yearRefs.map((year) => {
      if (
        year.current.getBoundingClientRect().top < 96 &&
        year.current.getBoundingClientRect().top > 0
      ) {
        return console.log("year");
      }
    });
  }

  return (
    <>
      <Helmet>
        <style dangerouslySetInnerHTML={{ __html: ssrStyles }} />
      </Helmet>
      <Wrapper>
        <BlogWrapper>
          <BlogTitle>Mattblog</BlogTitle>
          <BlogList>
            {years.map((year, i) => {
              return (
                <YearWrapper key={uuid()} ref={yearRefs[i]}>
                  <Year>{year}</Year>
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

export function getStaticProps() {
  const sheet = new ServerStyleSheet();
  const ssrStyles = sheet.instance.toString();
  const posts = JSON.parse(JSON.stringify(getAllPosts()));
  return {
    props: {
      posts,
      ssrStyles,
    },
  };
}

const Wrapper = styled.div`
  width: 800px;
  margin-left: auto;
  margin-right: auto;
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

const BlogList = styled.div`
  position: relative;
`;

const YearWrapper = styled.div`
  display: block;
  width: 100%;
  padding: 8px 36px;

  &:last-of-type {
    margin-bottom: 50vh;
  }
  @media (max-width: 500px) {
    padding: 0rem, 550px;
  }
`;

const Year = styled.div`
  display: block;
  position: sticky;
  top: 96px;
  font-size: 38px;
  padding: 1rem 0px;
  background-color: #fff;
  font-weight: 700;
  margin-bottom: 24px;

  @media (max-width: 500px) {
    font-size: 4rem;
    margin-left: -1.5rem;
  }
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

  @media (max-width: 500px) {
    padding-right: 12px;
    width: 64px;
  }
`;

const PublishedDate = styled.span`
  font-size: 16px;
  margin-right: 8px;
  justify-self: baseline;

  @media (max-width: 500px) {
    font-size: 2rem;
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
  @media (max-width: 500px) {
    font-size: 3rem;
  }
`;

const Summary = styled.span`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${COLORS.gray[700]};
  max-width: fit-content;
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

const ReadStatus = styled.em`
  color: ${COLORS.primary};
  font-size: 14px;
  text-decoration: unset !important;
`;
