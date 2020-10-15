/**
 * node-vt
 * Copyright (C)  2020 Logan Devine
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// Modules
const { request } = require('https');

// Imports
const { Err, Response } = require('./index.js')

// Main
class Request {
    /**
     * Creates a new Request
     * @constructor
     * @param {String} method The request method to use
     * @param {String} host The host to get from
     * @param {String} [path="/"] The path to get. Must start with /!
     * @example
     * let req = new Request('GET', 'example.com', '/'); // => Request
     */
    constructor(method, host, path = '/') {
        this.method = method.toUpperCase();
        this.host = host;
        this.path = path;
        this.url = host + path;
        this.headers = {};
        this.res = null;
        if (!this._validateMethod(method)) {
            throw new Err(`Unknown method "${method}".`, 'BadMethodError');
        };
        if (!path.startsWith('/')) {
            throw new Err(`Path "${path}" does not start with "/"!`, 'BadPathError');
        }
    }

    /**
     * Checks if the method is valid
     * @function
     * @param {String} method The method to test
     * @returns {Boolean} `true` for valid, `false` if invalid
     * @private
     */
    _validateMethod(method) {
        const validMethods = [
            'GET',
            'POST'
        ];
        return (validMethods.includes(method) ? true : false);
    }

    /**
     * Ensures the data is a valid type and coerces it to String.
     * @function
     * @param {*} data The data to check
     * @returns {String} The parsed data
     * @private
     */
    _cleanData(data) {
        const t = typeof data;
        let o = data;
        if (t === 'string') {
            o = o;
        } else if (t === 'object') {
            o = JSON.stringify(o);
        } else if (t === 'undefined') {
            o = 'undefined';
        } else if (t === 'boolean') {
            o = o.toString();
        } else if (t === 'bigint') {
            o = o.toString();
        } else if (t === 'number') {
            o = o.toString();
        } else if (t === 'symbol') {
            o = o.toString();
        } else {
            throw new Err('Request cannot accept Functions or any other uncommon data type.', 'TypeError')
        }

        return o;
    }

    /**
     * Sends the request
     * @function
     * @param {*} [data] If method is "POST", the data to send. Will automatically be coerced into a string
     * @returns {Promise<Response>}
     */
    async send(data) {
        return new Promise((resolve, reject) => {
            if (this.method === 'POST') {
                let req = request({ host: this.host, path: this.path, method: 'POST' }, (res) => {
                    let data = '';
                    res.on('data', (c) => { data += c; });
                    res.on('end', () => {
                        let response = new Response(data, res);
                        this.res = response;
                        resolve(response);
                    });
                });
                for (let h of Object.entries(this.headers)) {
                    req.setHeader(h[0], h[1]);
                }
                req.end(this._cleanData(data));
            } else if (this.method === 'GET') {
                let req = request({ host: this.host, path: this.path, method: 'GET' }, (res) => {
                    let data = '';
                    res.on('data', (c) => { data += c; });
                    res.on('end', () => {
                        let response = new Response(data, res);
                        this.res = response;
                        resolve(response);
                    });
                });
                for (let h of Object.entries(this.headers)) {
                    req.setHeader(h[0], h[1]);
                }
                req.end();
            }
        })
    }

    /**
     * Sets a header for the request. Must be called **before** Request#send!
     * @function
     * @param {String} header The header name to set
     * @param {String} value The value to put under `header`
     * @returns {undefined} undefined
     * @example
     * req.setHeader('X-ApiKey', 'example-api-key');
     * req.send();
     */
    setHeader(header, value) {
        eval(`this.headers = {
            ...this.headers,
            "${header}": "${value}"
        }`);
    }
}

// Export
module.exports = Request;