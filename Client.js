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
const { APIRequest, Err } = require('./index.js')

// Main
class Client {
    /**
     * Creates a new API client.
     * @constructor
     * @param {String} key Your VT API key
     * @example
     * let client = new nvt.Client('api-key');
     */
    constructor(key) {
        this.key = key;
        this._checkKey();
    }
    
    /**
     * Checks if the API key is valid.
     * @function
     * @private
     */
    _checkKey() {
        this.validation = new APIRequest('GET', `/users/${this.key}`, this.key);
        this.validation.send().then((d) => {
            if (d.code === 401) {
                if (d.data.json.error.code === 'WrongCredentialsError') {
                    console.log('DEBUG/ERR', Err);
                    throw new Err('Invalid API key!', 'BadKeyError');
                }
            }
        });
    }
}

// Export
module.exports = Client;