import React from "react";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { QUERIES } from "../styles/CONSTANTS";

function BlogYear({ year }) {
  const yearRef = React.useRef(null);
  const [scrollValue, setScrollValue] = React.useState<number>(0);

  const [status, setStatus] = React.useState<string | undefined>();
  function handleScroll() {
    const rect = yearRef.current.getBoundingClientRect();
    const { y, height } = rect;

    const scrollingValue = document.documentElement.scrollTop;

    if (scrollingValue > scrollValue) {
      if (y < 200 && y > 0) {
        setStatus("top");
      }
      if (y < 96) {
        setStatus("fading");
      }
    }
    setScrollValue(() => (scrollingValue <= 0 ? 0 : scrollingValue));
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setStatus("idle");
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Year
      status={status}
      ref={yearRef}
      style={{ "--yearTextOpacity": status === "top" ? 1 : 0 }}
    >
      <FadeOutDiv
        style={{
          "--underlineOpacity": status === "top" || status === "idle" ? 1 : 0,
        }}
        status={status}
      >
        {year}
      </FadeOutDiv>
    </Year>
  );
}

const fadeIn = keyframes`
0% {opacity: 0;}
100% {opacity: 1;}
`;

const fadeOut = keyframes`
0% {opacity: 1;
}
100% {opacity: 0;
transform: translateY(-12px);
transform: translateX(-4px);}
`;

const FadeOutDiv = styled.div`
  animation: ${(props) => {
      return props.status === "fading" ? fadeOut : null;
    }}
    0.3s linear;
  animation-iteration-count: 1;
  opacity: var(--underlineOpacity);
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

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 1px;
    left: -45px;
    z-index: -1;
    transform: scale(0.9);
    background-color: #dcdcdc;
    opacity: var(--yearTextOpacity);
  }
`;

export default React.memo(BlogYear);
