import React from "react";
import Link from "next/link";
import styled from "styled-components/";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

const navMenu = [
  { title: "BLOG", path: "/blog" },
  { title: "REVIEWS", path: "/reviews" },
  { title: "PROJECTS", path: "/projects" },
  { title: "SNIPPETS", path: "/snippets" },
];

export default function MobileNav({ open, setOpen }) {
  return (
    <MobileNavContainer
      isOpen={open}
      aria-label="mobile-navigation-modal"
      style={open ? { pointerEvents: "auto" } : { pointerEvents: "none" }}
    >
      <MobileNavBackdrop
        style={
          open
            ? { opacity: 1, touchAction: "none" }
            : { opacity: 0, touchAction: "auto" }
        }
        onClick={() => setOpen(false)}
      />
      <HamburgerLinks>
        <BlogLinkContainer
          style={
            open
              ? { transform: `translateX(0%)` }
              : { transform: `translateX(-100%)` }
          }
        >
          <Link href={"/blog"}>
            <LinkText>BLOG</LinkText>
          </Link>
        </BlogLinkContainer>
        <ReviewsLinkContainer
          style={
            open
              ? { transform: `translateX(0%)` }
              : { transform: `translateX(-100%)` }
          }
        >
          <Link href={"/reviews"}>
            <LinkText>REVIEWS</LinkText>
          </Link>
        </ReviewsLinkContainer>
        <SnippetsLinkContainer
          style={
            open
              ? { transform: `translateX(0%)` }
              : { transform: `translateX(-100%)` }
          }
        >
          <Link href={"/snippets"}>
            <LinkText>SNIPPETS</LinkText>
          </Link>
        </SnippetsLinkContainer>
        <ProjectsLinkContainer
          style={
            open
              ? { transform: `translateX(0%)` }
              : { transform: `translateX(-100%)` }
          }
        >
          <Link href={"/projects"}>
            <LinkText>PROJECTS</LinkText>
          </Link>
        </ProjectsLinkContainer>
      </HamburgerLinks>
    </MobileNavContainer>
  );
}

const MobileNavContainer = styled.div`
  position: fixed;
  overflow: hidden;
  inset: 0px;
  z-index: 10000;
`;

const HamburgerLinks = styled.nav`
  position: absolute;
  left: 0px;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 75%;
  z-index: 2;
`;

const MobileNavBackdrop = styled.button`
  position: absolute;
  inset: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  transition: opacity 500ms ease 0s;
  cursor: pointer;
  background: hsla(0deg, 0%, 100%, 0.85);
`;

const BlogLinkContainer = styled.div`
  transition: transform 0.5s;
`;

const ReviewsLinkContainer = styled.div`
  transition: transform 0.8s;
`;

const SnippetsLinkContainer = styled.div`
  transition: transform 1.1s;
`;

const ProjectsLinkContainer = styled.div`
  transition: transform 1.4s;
`;

const LinkText = styled.span`
  display: block;
  position: relative;
  padding: 16px 16px 16px 32px;
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;
`;
