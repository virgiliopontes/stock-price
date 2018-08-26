import { STOCKS_TEXT, STOCKS_SUBMIT, STOCKS_SETVALUES, STOCKS_SETDATACHART } from './types';

export const textAction = tagStock => ({
    type: STOCKS_TEXT,
    tagStock,
});

export const submitAction = () => ({
    type: STOCKS_SUBMIT,
});

export const setValues = (dataStock) => ({
    type: STOCKS_SETVALUES,
    dataStock: dataStock
});

export const setDataChart = (dataChart) => ({
    type: STOCKS_SETDATACHART,
    dataChart
});