import axios from 'axios';

export const USER_GET = 'USER_GET';
export const USER_FORMAT = 'USER_FORMAT';
export const USER_SRS = 'USER_SRS';
export const AUTH_GET ='AUTH_GET';

export function userGet() {
    const request = axios.get('/api/profile');
    return {
        type: USER_GET,
        payload: request
    };
}

export function userFormat(format) {
    const request = axios.post('/api/profile/format', {
        format
    });
    return {
        type: USER_FORMAT,
        payload: request
    };
}

export function userSrs(srs) {
    const request = axios.post('/api/profile/srs', {
        srs
    });
    return {
        type: USER_SRS,
        payload: request
    };
}

export function authGet() {
    const request = axios.get('/api/auth/check');
    return {
        type: AUTH_GET,
        payload: request
    };
}