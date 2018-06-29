import { productFilterType, initialState, sortByValue } from './../reducers/productFilterReducer';
import productFilterReducer from './../reducers/productFilterReducer';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import './__mocks__/storageMock';

describe('Productfilter reducer', () => {
    it('sets name ascending as default sorting method', () => {
        expect(initialState.sortedBy).toEqual('SORT_NAME_ASC');
    });

    it('changes state correctly with sortByValue', () => {
        var newState = productFilterReducer(initialState, sortByValue(productFilterType.NAME_ASC));
        expect(newState.sortedBy).toEqual('SORT_NAME_ASC');

        newState = productFilterReducer(initialState, sortByValue(productFilterType.NAME_DESC));
        expect(newState.sortedBy).toEqual('SORT_NAME_DESC');

        newState = productFilterReducer(initialState, sortByValue(productFilterType.STOCK_LOW));
        expect(newState.sortedBy).toEqual('SORT_STOCK_LOW');

        newState = productFilterReducer(initialState, sortByValue(productFilterType.STOCK_HIGH));
        expect(newState.sortedBy).toEqual('SORT_STOCK_HIGH');
    });

    it('does not change state with an unknown action', () => {
        var newState = productFilterReducer(initialState, {
            type: 'unknown action'
        });

        expect(newState).toEqual(initialState);
    });
});
