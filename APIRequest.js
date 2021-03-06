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
const { apiSettings, Request } = require('./index.js');

// Main
/**
 * Creates an API Request.
 * @extends Request
 */
class APIRequest extends Request {
    /**
     * Sends a request to the API directly.
     * @constructor
     * @param {String} method The method to use
     * @param {String} path The API path
     * @param {String} apiKey Your API key
     */
    constructor(method, path, apiKey) {
        super(method, apiSettings.host, apiSettings.apiRoot + path);
        super.setHeader('x-apikey', apiKey);
    }
}

// Export
module.exports = APIRequest;