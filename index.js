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
const { throws } = require('assert');
const { request } = require('https');

// Pre-defined vars
const apiSettings = {
    host: 'www.virustotal.com',
    apiRoot: '/api/v3'
}

// Protection stuff
const validMethods = [
    'GET',
    'POST',
    'PUT',
    'PATCH'
]

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
        super(`[NodeVTError] ${type ? type + ': ' : ''}${message}`);
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
            throw new Err()
        } else if (s === false) {
            // bad type

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
        for (let i of d) {
            this._appendString(
                this._urlEncode(i[0]),
                this._urlEncode(i[1])
            );
        }
    }
    _appendString(key, val) {
        if (this.string) {
            this.string += `&${key}=${val}`
        } else {
            this.string = `${key}=${val}`
        }
    }
    _urlEncode(data) {
        let out = data;
        return out;
    }
}