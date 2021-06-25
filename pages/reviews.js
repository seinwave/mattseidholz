import React, { useMemo } from "react";
import { useTable } from "react-table";
import { getAllReviews } from "../lib/data/reviews-api";
import styled from "styled-components";
import { ServerStyleSheet } from "styled-components";
import { Helmet } from "react-helmet";
import { COLORS, FONTSIZES, RATINGS, EMOJIS } from "../styles/CONSTANTS";

import RatingCell from "../lib/components/reviews/TableCells/RatingCell";

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

  const defaultColumn = useMemo(
    () => ({
      RatingCell: RatingCell,
    }),
    []
  );

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
            <TableBody {...getTableBodyProps()}>
              {rows.map((row) => {
                const {
                  values: { rating: rating, type: type },
                } = row;
                prepareRow(row);
                return (
                  <Review {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      if (cell.column.Header === "Rating") {
                        return (
                          <Cell {...cell.getCellProps()}>
                            {cell.render(
                              <RatingCellContainer>
                                <RatingCell
                                  rating={RATINGS[rating]}
                                ></RatingCell>
                              </RatingCellContainer>
                            )}
                          </Cell>
                        );
                      }

                      if (cell.column.Header === "Type") {
                        return (
                          <Cell {...cell.getCellProps()}>
                            {cell.render(
                              <TypeCellContainer>
                                <RatingCell
                                  rating={EMOJIS[type.toLowerCase()]}
                                ></RatingCell>
                              </TypeCellContainer>
                            )}
                          </Cell>
                        );
                      }
                      return (
                        <Cell {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </Cell>
                      );
                    })}
                  </Review>
                );
              })}
            </TableBody>
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
  box-sizing: border-box;
  width: 1100px;
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
  padding: 8px;
  font-size: 1.25rem;
  border-collapse: collapse;
  border-radius: 8px;
`;

const TableBody = styled.tbody`
  border-radius: 8px;
  padding: 8px;
`;

const Review = styled.tr`
  border-radius: 8px;
  padding: 8px;
  margin: 8px;
  &:hover {
    background-color: ${COLORS.gray[100]};
    text-decoration: none;
    cursor: pointer;
  }
`;

const Cell = styled.td`
  margin: 8px;
  padding: 8px;
  border-style: hidden;
`;

const RatingCellContainer = styled(Cell)`
  width: 150px;
  display: flex;
  font-size: 25px;
  justify-content: center;
`;

const TypeCellContainer = styled(Cell)`
  width: 40px;
  font-size: 35px;
`;
