import React from 'react'
import { Table, List } from "antd";
import styled from "styled-components";

const TABLE_VIEW_WRAPPER = styled.div`
  display: flex;
  .table-view{
    flex-grow: 1;
    margin-right: 20px;
  }
  .list-view{
    flex-grow: 1;

  }
`;

export default function TableView({ changeHistory, to }) {
  return (
    <TABLE_VIEW_WRAPPER>
      <Table
        className='table-view'
        dataSource={Object.keys(changeHistory.rates).map(i => ({ date: i, ...changeHistory.rates[i] }))}
        columns={[
          {
            title: "Date",
            dataIndex: "date",
            sorter: (a, b) => {
              let aDate = new Date(a.date),
                bDate = new Date(b.date);
              return aDate > bDate ? 1 : (bDate > aDate ? -1 : 0)
            },
            defaultSortOrder: "descend",
            sortDirections: ["descend", "ascend"],
          },
          {
            title: "Exchange Rate",
            dataIndex: `${to}`,
          }
        ]}
      />
      <List
        header="Statistics"
        className='list-view'
        dataSource={Object.keys(changeHistory.statistics)}
        renderItem={
          (item) => <List.Item>{`${item} : ${changeHistory.statistics[item]}`}</List.Item>
        }
      />
    </TABLE_VIEW_WRAPPER>
  )
}
