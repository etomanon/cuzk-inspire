import { USER_GET, USER_FORMAT, USER_SRS } from '../actions';

export default function (state = {
    profile: {
        user: '',
        email: '',
        freeToken: '',
        hits: 0,
        format: "",
        srs: ""
    }
}, action) {
    switch (action.type) {
        case USER_GET + '_PENDING':
            return { ...state, profile: { ...state.profile }, pending: true }
        case USER_GET + '_FULFILLED':
            return { ...state, profile: action.payload.data, pending: false, error: false }
        case USER_GET + '_REJECTED':
            return { ...state, profile: { ...state.profile }, error: true }
        case USER_FORMAT + '_PENDING':
            return { ...state, profile: { ...state.profile }, pending: true }
        case USER_FORMAT + '_FULFILLED':
            return { ...state, profile: { ...state.profile, format: action.payload.data.format }, pending: false, error: false }
        case USER_FORMAT + '_REJECTED':
            return { ...state, profile: { ...state.profile }, error: true }
        case USER_SRS + '_PENDING':
            return { ...state, profile: { ...state.profile }, pending: true }
        case USER_SRS + '_FULFILLED':
            return { ...state, profile: { ...state.profile, srs: action.payload.data.srs }, pending: false, error: false }
        case USER_SRS + '_REJECTED':
            return { ...state, profile: { ...state.profile }, error: true }
        default:
            return state;
    }
}