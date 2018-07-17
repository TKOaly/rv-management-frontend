import './__mocks__/storageMock';
import { initialState, productFilterType, sortByValue } from '../reducers/productFilterReducer';
import configureStore from 'redux-mock-store';
import productFilterReducer from '../reducers/productFilterReducer';
import thunk from 'redux-thunk';

describe('Productfilter reducer', () => {
    it('sets name ascending as default sorting method', () => {
        expect(initialState.sortedBy).toEqual('SORT_NAME_ASC');
    });

    it('changes state correctly with sortByValue', () => {
        let newState = productFilterReducer(initialState, sortByValue(productFilterType.NAME_ASC));
        expect(newState.sortedBy).toEqual('SORT_NAME_ASC');

        newState = productFilterReducer(initialState, sortByValue(productFilterType.NAME_DESC));
        expect(newState.sortedBy).toEqual('SORT_NAME_DESC');

        newState = productFilterReducer(initialState, sortByValue(productFilterType.STOCK_LOW));
        expect(newState.sortedBy).toEqual('SORT_STOCK_LOW');

        newState = productFilterReducer(initialState, sortByValue(productFilterType.STOCK_HIGH));
        expect(newState.sortedBy).toEqual('SORT_STOCK_HIGH');
    });

    it('does not change state with an unknown action', () => {
        const newState = productFilterReducer(initialState, {
            type: 'unknown action'
        });

        expect(newState).toEqual(initialState);
    });
});
