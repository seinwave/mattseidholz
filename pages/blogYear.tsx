import React from "react";

import styled, { keyframes } from "styled-components";
import { QUERIES } from "../styles/CONSTANTS";

function BlogYear({ year }) {
  const yearRef = React.useRef(null);
  const [status, setStatus] = React.useState<string | undefined>("idle");
  function handleScroll() {
    const rect = yearRef.current.getBoundingClientRect();
    const { y } = rect;

    if (y < 180 && y > 0) {
      setStatus("top");
    }

    // ie - we are scrolling down
    if (y < 96 && status !== "gone") {
      setStatus("fading");
    }

    // ie - we are scrolling up
    if (y < 96 && status === "gone") {
      setStatus("top");
    }

    if (y < 60) {
      setStatus("gone");
    }

    if (y > 170) {
      setStatus("idle");
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Year status={status} data={status} ref={yearRef}>
      <FadeOutDiv status={status}>{year}</FadeOutDiv>
      <YearBar status={status} barData={status} />
    </Year>
  );
}

const FadeOutDiv = styled.div`
  ${(props) =>
    props.status === "fading" ? `transform: translateY(-6px);` : null};
  opacity: ${(props) =>
    props.status === "fading" || props.status === "gone" ? 0 : 1};
  transition: opacity 0.6s, transform 0.3s;
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

const YearBar = styled.div`
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 1px;
  left: -45px;
  z-index: -1;
  transform: scale(0.9);
  background-color: #dcdcdc;
  opacity: ${(props) => {
    return props.barData === "top" ? 0.6 : 0;
  }};
  transition: opacity 0.3s;
`;

export default React.memo(BlogYear);
