import { ADD_CONVERSION, DELETE_CONVERSION } from "../enums";

export function addConversion(conversion) {
    return dispatch => { dispatch({ type: ADD_CONVERSION, payload: conversion }); }
}
export function deleteConversion(index) {
    return dispatch => { dispatch({ type: DELETE_CONVERSION, payload: { index } }); }
}