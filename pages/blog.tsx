import React from "react";
import { getAllPosts } from "../lib/data/posts-api";
import { GetStaticProps } from "next";
import styled, { keyframes } from "styled-components";
import { COLORS, QUERIES } from "../styles/CONSTANTS";
import { v4 as uuid } from "uuid";
import NavBar from "../lib/components/shell/NavBar";
import BlogYear from "./blogYear";
import Link from "next/link";

export default function Blog({ posts }) {
  let years = [];
  posts.map((post) => years.push(parseInt(post.frontmatter.year)));
  let uniqueYears = new Set(years);
  years = [...uniqueYears];
  const sortedYears = years.sort((a, b) => (a > b ? -1 : 1));

  const [scrollValue, setScrollValue] = React.useState<number>(0);

  let initialYearMap = years.reduce((allYears, currentYear) => {
    allYears[currentYear] = "idle";
    return allYears;
  }, {});

  function scrollUpReset(exceptionYear) {
    for (let year in initialYearMap) {
      if (year !== exceptionYear) year = "idle";
    }
    return initialYearMap;
  }

  const [yearMap, setYearMap] = React.useState(initialYearMap);

  function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  }

  // function handleScroll() {
  //   yearsRef.current.map((ref, i) => {
  //     const rect = ref.getBoundingClientRect();
  //     const numericalYear = parseInt(ref.firstChild.textContent);
  //     const { y, height } = rect;
  //     const scrollingValue = document.documentElement.scrollTop;
  //     if (
  //       scrollingValue > scrollValue &&
  //       initialYearMap[numericalYear] !== "top"
  //     ) {
  //       if (y < 200 && y > 0 && initialYearMap[numericalYear] !== "top") {
  //         if (
  //           initialYearMap[numericalYear + 1] &&
  //           initialYearMap[numericalYear + 1] !== "fading"
  //         ) {
  //           initialYearMap[numericalYear + 1] = "fading";
  //         }
  //         initialYearMap[numericalYear] = "top";
  //         if (!shallowEqual(yearMap, initialYearMap)) {
  //           setYearMap(initialYearMap);
  //         }
  //       }
  //     } else {
  //       if (y < 0 && y + height > 0) {
  //         scrollUpReset(numericalYear);
  //         initialYearMap[numericalYear] = "top";
  //         if (!shallowEqual(yearMap, initialYearMap)) {
  //           console.log("shallow not equal");
  //           setYearMap(initialYearMap);
  //         }
  //       }
  //     }

  //     setScrollValue(() => (scrollingValue <= 0 ? 0 : scrollingValue));
  //   });
  // }

  // React.useEffect(() => {
  //   yearsRef.current = yearsRef.current.slice(0, years.length);
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <>
      <Wrapper>
        <BlogWrapper>
          <NavBar />

          <BlogList>
            {sortedYears.map((year, i) => {
              return (
                <YearWrapper key={uuid()}>
                  <BlogYear year={year}></BlogYear>

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

const fadeIn = keyframes`
  from {
   opacity: 0;
  }
  to {
    opacity: 1; 
  }
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
