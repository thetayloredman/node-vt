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

// Pre-defined vars
const apiSettings = {
    host: 'www.virustotal.com',
    apiRoot: '/api/v3'
}

// Classes
class Err extends Error {
    /**
     * Creates a new custom error (With message)
     * @constructor
     * @param {String} message The error message
     * @param {String} [type] The type of error (Like "TypeError")
     * @returns {undefined} undefined
     * @example
     * throw new Err('Example', 'ExampleError'); // => Uncaught Err [Error]: [NodeVTError] ExampleError: Example
     */
    constructor(message, type) {
        super(`${type ? type + ': ' : ''}${message}`);
        this.name = '[NodeVTError]'
    }
}

class URLParams {
    constructor(data) {
        this.data = data;
        this.string = null;
        this._validateType(data);
        this._init();
    }
    _validateType(data) {
        let s = this._checkType(data);
        if (s === null) {
            // no data
            throw new Err('URLParams takes 1 argument: provided 0', 'ArgumentCountError');
        } else if (s === false) {
            // bad type
            throw new Err('URLParams was passed an invalid type: expected Object', 'TypeError');
        } else {
            // ok, we return
            return;
        }
    }
    _checkType(data) {
        if (!data) {
            return null;
        } else if (typeof data !== 'object') {
            return false;
        } else {
            return true;
        }
    }
    _init() {
        let d = this.data;
        d = Object.entries(d);
        if (d.length === 0) {
            this.string = '';
        } else {
            for (let i of d) {
                this._appendString(i[0], i[1]);
            }
        }
    }
    _appendString(key, val) {
        if (this.string) {
            this.string += `&${this._urlEncode(key)}=${this._urlEncode(val)}`
        } else {
            this.string = `${key}=${val}`
        }
    }
    _urlEncode(data) {
        let out = data;

        // Parse data types
        let t = typeof out;
        switch (t) {
            case 'string':
                break;
            case 'boolean':
                out = out.toString();
                break;
            case 'object':
                out = JSON.stringify(out);
                break;
            default:
                break;
        }

        // Parse URLEncoded stuff
        out = encodeURIComponent(out);

        return out;
    }
}

class Response {
    constructor(data, responseCode) {
        this.ok = responseCode < 400;
        this.text = data;
        try {
            this.json = JSON.parse(data);
        } catch (e) {
            this.json = null;
            this.isJson = false;
        }
        if (this.json) {
            this.isJson = true;
        }
        this.code = responseCode;
    }
}

class Request {
    constructor(method, host, path) {
        this.method = method;
        this.host = host;
        this.path = path;
        this.data = null;
        this.response = null;
        this.headers = {};
    }
    setHeader(k, v) {
        eval(`this.headers = {
            ...this.headers,
            "${k}": "${v}"
        }`);
    }
    async send(data) {
        return new Promise((resolve, reject) => {
            if (this.method.toUpperCase() === 'POST') {
                let req = request({ host: this.host, path: this.path, method: 'POST' }, (res) => {
                    let data = '';
                    res.on('data', c => data += c);
                    res.on('end', () => {
                        this.response = new Response(data);
                    });
                });
                for (let h of Object.keys(this.headers)) {
                    req.setHeader(h[0], h[1]);
                }
                req.setHeader('X-Powered-By', 'Node-VT');
                req.end(data);
            } else if (this.method.toUpperCase() === 'GET') {
                let req = request({ host: this.host, path: this.path, method: 'GET' }, (res) => {
                    let data = '';
                    res.on('data', c => data += c);
                    res.on('end', () => {
                        this.response = new Response(data, res.responseCode);
                        resolve(this.response)
                    });
                });
                for (let h of Object.entries(this.headers)) {
                    req.setHeader(h[0], h[1]);
                }
                req.setHeader('X-Powered-By', 'Node-VT');
                req.end();
            } else {
                reject(`Unknown method ${this.method}!`);
            }
        });
    }
}

class APIRequest extends Request {
    constructor(method, path, apiKey) {
        super(method, apiSettings.host, apiSettings.apiRoot + path);
        super.setHeader('x-apikey', apiKey);
    }
}

class Client {
    constructor(key) {
        this._checkKey(key);
    }
    _checkKey(key) {
        this.validation = new APIRequest('GET', `/users/${key}`, key);
        this.validation.send().then((d) => {
            console.log(this);
        });
    }
}