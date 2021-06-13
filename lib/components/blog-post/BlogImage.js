import * as React from "react";
import styled from "styled-components";

export default function BlogImage({ src }) {
  return (
    <Wrapper>
      <Image src={src}></Image>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  margin: 15px;
`;

const Image = styled.img`
  width: 350px;
  box-shadow: 0px 3px 6px hsla(0, 0%, 0%, 0.5);
  box-shadow: 0 10px 15px hsla(0, 0%, 0%, 0.4);
  border-radius: 5px;
`;
