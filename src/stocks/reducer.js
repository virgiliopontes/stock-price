import { STOCKS_TEXT, STOCKS_SETVALUES,STOCKS_SETDATACHART } from './types';

const defaultState = {
    tagStock: '',
    stockPrice: '',
    companyName: '',
    dataChart:[],
    dataStock:[]
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case STOCKS_TEXT:
            return { ...state, ...action };
        case STOCKS_SETVALUES:
            return { ...state, ...action };
        case STOCKS_SETDATACHART:
            return { ...state, ...action };
        default:
            return state;
    }
};