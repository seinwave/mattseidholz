import React from "react";
import styled from "styled-components";
import { ServerStyleSheet } from "styled-components";
import BlogImage from "../../lib/components/blog-post/BlogImage";
import { getPostBySlug, getAllPosts } from "../../lib/data/posts-api";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { Helmet } from "react-helmet";

export async function getStaticProps({ params }) {
  const sourceObj = JSON.parse(JSON.stringify(getPostBySlug(params.slug)));

  const source = await serialize(sourceObj.markdown);
  const data = sourceObj.frontmatter;
  const sheet = new ServerStyleSheet();
  const ssrStyles = sheet.instance.toString();
  console.log(ssrStyles);

  return {
    props: {
      post: {
        source,
        data,
      },
      ssrStyles,
    },
  };
}

export async function getStaticPaths() {
  const posts = JSON.parse(JSON.stringify(getAllPosts()));

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.frontmatter.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default function Post({ ssrStyles, post }) {
  const { data, source } = post;

  return (
    <>
      <Helmet>
        <style dangerouslySetInnerHTML={{ __html: ssrStyles }} />
      </Helmet>
      <Wrapper>
        <Title>{data.title}</Title>
        <Byline>
          <PublishedPlace>{data.place}</PublishedPlace>•
          <PublishedDate>{data.human_published}</PublishedDate>
        </Byline>
        <BodyWrapper>
          <Body>
            <MDXRemote {...source} components={COMPONENTS} />
          </Body>
        </BodyWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 75px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 42px;
`;

const Byline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 12px;
  font-size: 14px;
  font-weight: 300;
  margin-top: -24px;
  max-width: 360px;
`;

const PublishedPlace = styled.em``;

const PublishedDate = styled.em``;

const BodyWrapper = styled.div`
  margin-top: 64px;
  text-align: left;
  max-width: 600px;
`;

const Text = styled.p``;

const Body = styled.div`
  line-height: 1.5;
  font-size: 1.25rem;
  font-weight: 400;
`;

const Subhed = styled.h2`
  text-align: center;
`;

const COMPONENTS = {
  img: BlogImage,
  p: Text,
  h2: Subhed,
};
