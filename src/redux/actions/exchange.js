import { API, GET_SYMBOLS, ADD_CONVERSION, SET_EXCHAGE_HISTORY } from "../enums";
import axios from "axios";
import { message } from "antd";

export const getSymbols = () => {
    return dispatch => {
        axios.get(`${API}/symbols`)
            .then(res => {
                dispatch({
                    type: GET_SYMBOLS, payload: res.data.symbols
                })
            }).catch(e => {
                message.error("An error occured");
            })
    }
}

export const convert = ({ amount, from, to }) => {
    return axios.get(`${API}/convert`, {
        params: {
            from, to, amount
        }
    })
}
export const getTimeSeries = ({ start_date, end_date, base, symbols, amount }) => {
    return dispatch => {
        axios.get(`${API}/timeseries`, {
            params: {
                start_date, end_date, base, symbols, amount
            }
        }).then(res=>{
            //todo: perhaps separate this part into a service layer
            const data = res.data;
            const rates = Object.values(data.rates);
            let highest = rates[0][symbols], lowest = rates[0][symbols] ,total = 0 , average;
            rates.forEach(i=> {
                const item = i[symbols];
                if (item > highest){
                    highest = item;
                }
                if (item < lowest){
                    lowest = item;
                }
                total += item;
            });
            average = parseFloat(total/rates.length).toFixed(6);
            dispatch({
                type: SET_EXCHAGE_HISTORY, payload: {
                    rates: data.rates,
                    statistics: {
                        "Lowest": lowest,
                        "Highest": highest,
                        "Average": average
                    }
                }
            })

        }).catch(e=> {
            message.error("An error occured");
        })
    }
}