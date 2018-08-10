import { AUTH_GET } from '../actions';

export default function (state = {
    auth: false
}, action) {
    switch (action.type) {
        case AUTH_GET + '_PENDING':
            return { ...state, pending: true }
        case AUTH_GET + '_FULFILLED':
            return { ...state, auth: action.payload.data.auth, pending: false, error: action.payload.data.error }
        case AUTH_GET + '_REJECTED':
            return { ...state, error: true, pending: false }
        default:
            return state;
    }
}