import React from "react";
import styled from "styled-components";
import { MDXProvider } from "@mdx-js/react";

export default function MDXWrapper(content, components) {
  return (
    <MDXProvider components={components}>
      <main></main>
    </MDXProvider>
  );
}
