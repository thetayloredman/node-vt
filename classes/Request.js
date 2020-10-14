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
const {  } = require('../index.js')

// Main
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

// Export
module.exports = Request;