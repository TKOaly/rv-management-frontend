import './__mocks__/storageMock';
import {
    authenticate,
    authenticationFailure,
    authenticationSuccess,
    initialState,
    logout,
    setAuthenticating
} from '../reducers/authenticationReducer';
import { notificationActions, notificationTypes } from '../reducers/notificationReducer';
import authenticationReducer from '../reducers/authenticationReducer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('axios');

const mockStore = configureStore([thunk])(initialState);

describe('Authentication reducer', () => {
    it('dispatches correct actions when authentication fails', () => {
        const mockStore = configureStore([thunk])(initialState);

        return mockStore.dispatch(authenticate('test', 'test')).then(() => {
            const actions = mockStore.getActions();
            const expectedActions = [
                setAuthenticating(true),
                setAuthenticating(false),
                {
                    type: notificationActions.MESSAGE,
                    messageType: notificationTypes.ERROR,
                    message: 'Väärä käyttäjätunnus tai salasana'
                }
            ];

            delete actions[2]['id'];

            expect(actions).toEqual(expectedActions);
        });
    });

    it('dispatches correct actions when authentication succeeds', () => {
        const mockStore = configureStore([thunk])(initialState);

        return mockStore.dispatch(authenticate('admin', 'admin')).then(() => {
            const actions = mockStore.getActions();
            const expectedActions = [
                setAuthenticating(true),
                setAuthenticating(false),
                authenticationSuccess('access token')
            ];

            expect(actions).toEqual(expectedActions);
        });
    });

    it('dispatches correct actions when logging out', () => {
        const mockStore = configureStore([thunk])(initialState);
        mockStore.dispatch(logout());
        const actions = mockStore.getActions();
        const expectedActions = [logout()];

        expect(actions).toEqual(expectedActions);
    });

    it('changes state correctly with setAuthenticating', () => {
        let newState = authenticationReducer(initialState, setAuthenticating(false));

        expect(newState.isAuthenticating).toEqual(false);

        newState = authenticationReducer(initialState, setAuthenticating(true));

        expect(newState.isAuthenticating).toEqual(true);
    });

    it('changes state correctly with authenticationSuccess', () => {
        const newState = authenticationReducer(initialState, authenticationSuccess('token'));

        expect(newState.isAuthenticated).toEqual(true);
        expect(newState.accessToken).toEqual('token');
        expect(newState.authenticationError).toEqual(null);
    });

    it('changes state correctly with authenticationFailure', () => {
        const newState = authenticationReducer(initialState, authenticationFailure('error message'));

        expect(newState.isAuthenticated).toEqual(false);
        expect(newState.authenticationError).toEqual('error message');
        expect(newState.accessToken).toEqual(null);
    });

    it('changes state correctly with logout', () => {
        const newState = authenticationReducer(initialState, logout());

        expect(newState.isAuthenticated).toEqual(false);
        expect(newState.authenticationError).toEqual(null);
        expect(newState.accessToken).toEqual(null);
    });

    it('does not change state with an unknown action', () => {
        const newState = authenticationReducer(initialState, {
            type: 'unknown action'
        });

        expect(newState).toEqual(initialState);
    });
});
