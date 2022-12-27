import React, { useEffect, useState,lazy, Suspense } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { convert, getSymbols, getTimeSeries } from '../../redux/actions/exchange';
import styled from "styled-components";
import { Form, InputNumber, Select, Button, Radio,Spin } from "antd"
import { SwapOutlined } from "@ant-design/icons"
import { addConversion } from '../../redux/actions/history';
import TableView from './table-view';
const ChartView = lazy(() => import("./chart-view"));
const HOME_WRAPPER = styled.div`
  width: 100%;
  @media(min-width: 1024px){
      width: 1024px;
      margin: 0 auto;
  }
`;

const CONVERTER_WRAPPER = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
  .full{
    flex-grow: 1;
  }
  .ant-form-item{
    margin-right: 10px;
    &:last-child{
      margin-right: 0;
    }
  }

`;
const RESULT_WRAPPER = styled.div`
  display: flex;
  justify-content: center;
  font-size: 48px;
  margin-top: 20px;
  margin-bottom: 20px;
  .result{
    font-weight: 700;
    color: var(--accent);
  }
`;

const STATS_WRAPPER = styled.div`
  display: flex;
  flex-direction: column;
  .stats-header{
    margin-bottom: 20px;
  }
  .day-selector{
    margin-right: 10px;
  }
`;

const SYMBOLS_SELECTOR = state => state.exchange.symbols;
const CHANGE_HISTORY_SELECTOR = state => state.exchange.changeHistory;

const FormItem = Form.Item;

export default function CurrencyConverter() {
  const dispatch = useDispatch();
  const symbols = useSelector(SYMBOLS_SELECTOR);
  const changeHistory = useSelector(CHANGE_HISTORY_SELECTOR);
  const [form] = Form.useForm();
  const [result, setResult] = useState();
  const [view, setView] = useState(false);
  const location = useLocation();


  useEffect(() => {
    if (!symbols) {
      dispatch(getSymbols());
    }
  }, []);

  useEffect(() => {
    if (result) {
      getChangeHistory(7);
    }
  }, [result]);

  useEffect(() => {
    if (location.state) {
      setResult(location.state);
      form.setFieldsValue(location.state.query)
    }
  }, [location.state]);

  const onSubmit = (values) => {
    convert(values).then(res => {
      setResult(res.data);
      dispatch(addConversion({...res.data,createdAt: new Date() }));
    })
  }
  const onSwap = () => {
    const values = form.getFieldsValue();
    form.setFieldsValue({
      from: values.to,
      to: values.from
    });
  }
  const getChangeHistory = (v) => {
    let start_date = new Date(new Date().setDate(new Date().getDate() - v));
    dispatch(getTimeSeries({
      base: result.query.from,
      symbols: result.query.to,
      end_date: result.date,
      start_date: start_date.toISOString().slice(0, 10) //to get YYYY-MM-DD
    }));
  }

  return (
    <HOME_WRAPPER>
      <h1>I want to convert</h1>
      <Form
        name="converter"
        form={form}
        onFinish={onSubmit}
        layout="vertical"
      >
        <CONVERTER_WRAPPER>
          <FormItem name="amount" label="Amount" rules={[{ required: true, message: "Please enter value" }]}>
            <InputNumber min={0} onChange={() => setResult(null)}></InputNumber>
          </FormItem>
          <FormItem name="from" label="From" className='full' rules={[{ required: true, message: "Please select a currency" }]}>
            <Select showSearch={true} onChange={() => setResult(null)}>
              {symbols && Object.keys(symbols).map(i => <Select.Option key={i} value={i}>{i}</Select.Option>)}
            </Select>
          </FormItem>
          <FormItem>
            <Button icon={<SwapOutlined />} onClick={onSwap}></Button>
          </FormItem>
          <FormItem name="to" label="To" className='full' rules={[{ required: true, message: "Please select a currency" }]}>
            <Select showSearch={true} onChange={() => setResult(null)}>
              {symbols && Object.keys(symbols).map(i => <Select.Option key={i} value={i}>{i}</Select.Option>)}
            </Select>
          </FormItem>
          <FormItem>
            <Button htmlType="submit" style={{ backgroundColor: "var(--primary)", color: "#fff" }}>Convert</Button>
          </FormItem>
        </CONVERTER_WRAPPER>
      </Form>
      {
        result &&
        <RESULT_WRAPPER>

          {result.query.amount} {result.query.from}=<span className='result'>{result.result}  {result.query.to}</span>
        </RESULT_WRAPPER>
      }
      {
        result && changeHistory &&
        <STATS_WRAPPER>
          <div className='stats-header'>
            <Select className='day-selector' defaultValue={7} onChange={v => getChangeHistory(v)}>
              <Select.Option value={7}>7 days</Select.Option>
              <Select.Option value={14}>14 days</Select.Option>
              <Select.Option value={30}>30 days</Select.Option>
            </Select>
              <Radio.Group onChange={(e) => setView(e.target.value)} value={view}>
                <Radio value={false}>Table</Radio>
                <Radio value={true}>Chart</Radio>
              </Radio.Group>
          </div>
          {
              view ? <Suspense fallback={<Spin spinning={true}></Spin>}><ChartView changeHistory={changeHistory} to={result.query.to} /></Suspense> : <TableView changeHistory={changeHistory} to={result.query.to} />
          }
        </STATS_WRAPPER>


      }
    </HOME_WRAPPER>
  )
}
