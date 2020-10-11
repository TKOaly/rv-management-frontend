'use strict';

function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        if (url === `${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/authenticate`) {
            if (data.username === 'admin' && data.password === 'admin') {
                resolve({
                    data: {
                        accessToken: 'access token',
                    },
                    status: 200,
                    statusText: 'OK'
                });
            } else {
                reject({
                    response: {
                        data: {
                            error_code: 'invalid_credentials'
                        },
                        status: 403,
                        statusText: 'Forbidden'
                    }
                });
            }
        } else {
            reject({
                data: {},
                status: 404,
                statusText: 'Not Found',
                headers: {},
                config: {},
                request: {}
            });
        }
    });
}

const axios = jest.genMockFromModule('axios');
axios.post = post;

module.exports = axios;
