import React from "react";
import Link from "next/link";
import styled from "styled-components/macro";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

const navMenu = [
  { title: "BLOG", path: "/blog" },
  { title: "REVIEWS", path: "/reviews" },
  { title: "PROJECTS", path: "/projects" },
  { title: "SNIPPETS", path: "/snippets" },
];

export default function BurgerMenu() {
  return (
    <Dialog aria-label="hamburger-menu">
      <HamburgerLinks>
        {navMenu.map((item, index) => {
          return (
            <Link key={index} href={item.path}>
              {item.title}
            </Link>
          );
        })}
      </HamburgerLinks>
    </Dialog>
  );
}

const HamburgerLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;
