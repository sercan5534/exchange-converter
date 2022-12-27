import React from 'react'
import { Table, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { deleteConversion } from '../../redux/actions/history';
import { ExclamationCircleOutlined } from "@ant-design/icons"

const TABLE_WRAPPER = styled.div`
  padding:20px;
  .table-view{
    .ant-table-row{
      height: 75px;
    }
    .ant-table-row:hover{
.button-wrapper{
  display: flex;
}
    }
  }
`;

const BUTTON_WRAPPER = styled.div`
  display: none;
  .ant-btn{
    margin-right: 5px;
  }
`


const CONVERSIONS_SELECTOR = state => state.history.conversions;

export default function ConversionHistory() {
  const conversions = useSelector(CONVERSIONS_SELECTOR);
  const dispatch= useDispatch();
  let navigate = useNavigate();

  const removeHistory = index => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to delete this record',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => dispatch(deleteConversion(index))
    });
  }

  const gotoDetail = data =>{
    navigate("/",{ state: { ...data }})
  }

  return (
    <TABLE_WRAPPER>
      <Table
        className='table-view'
        rowKey={(r)=>`r-${r.createdAt}`}
        dataSource={conversions}
        rowClassName={(record, index) => `row-${index}` }
        columns={[
          {
            title: "Date",
            dataIndex: "createdAt",
            sorter: (a, b) => {
              let aDate = new Date(a.createdAt),
                bDate = new Date(b.createdAt);
              return aDate > bDate ? 1 : (bDate > aDate ? -1 : 0)
            },
            defaultSortOrder: "descend",
            sortDirections: ["descend", "ascend"],
            render: item => {
              const d = new Date(item);
              return `${d.toLocaleDateString()} @ ${d.toLocaleTimeString()}`
            }
          },
          {
            title: "Event",
            dataIndex: "query",
            render: item => `Converted an amount of ${item.amount} from ${item.from} to ${item.to}`
          },
          {
            title: "Actions",
            dataIndex: "result",
            width: 200,
            render: (item,data,index) => {
              return <BUTTON_WRAPPER className='button-wrapper'>
                <Button onClick={() => gotoDetail(data)}>View</Button>
                <Button type="primary" onClick={()=> removeHistory(index) }>Delete</Button>
              </BUTTON_WRAPPER>
            }
          }
        ]}
      />
    </TABLE_WRAPPER>
  )
}
