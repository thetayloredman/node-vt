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
class URLParams {
    constructor(data) {
        this.data = data;
        this.string = null;
        this._parse();
    }
    _parse() {
        let d = this.data;
        d = Object.entries(d);
        for (let i of d) {
            this._appendString(this._urlEncode(i[0]), this._urlEncode(i[1]));
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
        return data;
    }
}