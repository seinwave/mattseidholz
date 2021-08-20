import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components/";
import BurgerButton from "./BurgerButton";

export default function NavBar() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const navMenu = [
    { title: "BLOG", path: "/blog" },
    { title: "REVIEWS", path: "/reviews" },
    { title: "PROJECTS", path: "/projects" },
    { title: "SNIPPETS", path: "/snippets" },
  ];

  return (
    <div className="wrapper">
      {" "}
      <Logo className="logo">
        <Link href="/">MS</Link>
      </Logo>
      <BurgerButton open={open} setOpen={setOpen}></BurgerButton>
      <div className="navlinks">
        {navMenu.map((item, index) => {
          return (
            <Link key={index} href={item.path}>
              <a
                className={`cursor-pointer ${
                  router.pathname === item.path ? "active nav-link" : "nav-link"
                }`}
              >
                {item.title}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const Logo = styled.div`
  display: inline-block;
  background-color: black;
  color: white;
  font-size: 36px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.4s ease-in-out;

  &:hover {
    transform: rotate(-15deg);
  }
`;

const NavLink = styled.a`
  position: relative;
  font-size: 18px;
  margin: 0 1rem;

  &:active:after {
  }

  &:hover {
  }
`;
