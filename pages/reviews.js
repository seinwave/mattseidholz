import React, { useEffect, useLayoutEffect, useState, createRef } from "react";
import { useTable } from "react-table";
import { getAllReviews } from "../lib/data/reviews-api";
import styled from "styled-components";
import { ServerStyleSheet } from "styled-components";
import { Helmet } from "react-helmet";
import { COLORS, FONTSIZES } from "../styles/constants";
import { v4 as uuid } from "uuid";
import Link from "next/link";

/*---
layout: post
author: matt
title: Johns of Bleeker Street
creator: MTA
type: Restaurant
published: 2021-06-18
human_published: Jun 18, 2021
rating: 5
summary: A new personal pizza favorite in NYC
--- */

export default function Index({ reviews, ssrStyles }) {
  const data = React.useMemo(() => reviews.map((review) => review.frontmatter));
  const columns = React.useMemo(
    () => [
      {
        Header: "Thing",
        accessor: "title",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Creator",
        accessor: "creator",
      },
      {
        Header: "Consumed On",
        accessor: "human_published",
      },

      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "Summary",
        accessor: "summary",
      },
    ],
    []
  );

  console.log(data);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <Helmet>
        <style dangerouslySetInnerHTML={{ __html: ssrStyles }} />
      </Helmet>
      <Wrapper>
        <BlogWrapper>
          <BlogTitle>MattReviews</BlogTitle>
          <ReviewList {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                console.log(row);
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </ReviewList>
        </BlogWrapper>
      </Wrapper>
    </>
  );
}

export function getStaticProps() {
  const sheet = new ServerStyleSheet();
  const ssrStyles = sheet.instance.toString();
  const reviews = JSON.parse(JSON.stringify(getAllReviews()));
  return {
    props: {
      reviews,
      ssrStyles,
    },
  };
}

const Wrapper = styled.div`
  width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const BlogWrapper = styled.div`
  position: relative;
`;

const BlogTitle = styled.header`
  font-size: ${FONTSIZES.postTitle};
  position: sticky;
  display: block;
  height: 96px;
  z-index: 1;
  top: 0;
  background-color: #fff;
`;

const ReviewList = styled.table`
  position: relative;
`;
