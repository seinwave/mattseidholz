import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { animated } from "react-spring";
import styled from "styled-components/";
import BurgerButton from "./BurgerButton";
import useBoop from "../../hooks/useBoop/useBoop.hook";

export default function NavBar() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const navMenu = [
    { title: "BLOG", path: "/blog" },
    { title: "REVIEWS", path: "/reviews" },
    { title: "PROJECTS", path: "/projects" },
    { title: "SNIPPETS", path: "/snippets" },
  ];

  const [style, trigger] = useBoop({
    rotation: -15,
    scale: 1.003,
    timing: 200,
  });

  return (
    <div className="wrapper">
      {" "}
      <LogoContainer onMouseEnter={trigger}>
        <animated.div style={style}>
          <Link href="/">
            <Logo className="logo">MS</Logo>
          </Link>
        </animated.div>
      </LogoContainer>
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

const LogoContainer = styled.div`
  display: inline-block;
`;

const Logo = styled.div`
  background-color: black;
  color: white;
  font-size: 36px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
`;

const NavLink = styled.a`
  display: inline-block;
  position: relative;
  font-size: 18px;
  margin: 0 1rem;
`;
