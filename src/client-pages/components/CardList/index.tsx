import { css } from "@emotion/css";
import { Col, Empty, Row } from "antd";
import React from "react";
import { emptyWrapStyle } from "@/designable/styles";

interface ICardListProps<T = any> {
  list?: T[];
  rowKey?: string;
  itemRender?: (item: T) => React.ReactNode;
}

/**
 * 卡片页面封装
 * @param param0
 * @returns
 */

function CardList<T = any>({
  list = [],
  rowKey = "id",
  itemRender,
}: ICardListProps<T>) {
  const isEmpty = !list.length || !Array.isArray(list) || !itemRender;
  if (isEmpty) {
    return (
      <div className={emptyWrapStyle}>
        <Empty />
      </div>
    );
  }
  return (
    <Row
      className={css`
        background-color: #fff;
        padding: 16px 16px 16px 16px;
      `}
    >
      {list.map((item) => {
        return (
          <Col
            span={24}
            xs={24}
            sm={12}
            md={12}
            lg={8}
            xl={6}
            xxl={4}
            key={item[rowKey]}
            className={css`
              margin-block: 8px;
              margin-inline: 0;
              padding-block: 0;
              padding-inline: 8px;
            `}
          >
            {itemRender && itemRender(item)}
            {/* <ChartListItem
              {...c}
              onEditClick={() => {
                editChart(c);
              }}
            /> */}
          </Col>
        );
      })}
    </Row>
  );
}

export default CardList;
