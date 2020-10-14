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

// Imports
const {  } = require('./index.js');

// Main
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

// Export
module.exports = URLParams;