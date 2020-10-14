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
class Response {
    /**
     * Creates a new Response.
     * @constructor
     * @param {String} data The data
     * @param {*} res The actual response
     * @example
     * let response = new Response(data, res); // => Response
     */
    constructor(data, res) {
        this.code = res.statusCode;
        this.data = {
            string: data,
            json: null
        }
        this.isJson = null;

        this._parseJSON(data);
    }

    /**
     * Attempts to parse the data to JSON.
     * @function
     * @param {String} data The data as a string
     * @returns {undefined} undefined
     * @private
     */
    _parseJSON(data) {
        try {
            this.data.json = JSON.parse(data);
            this.isJson = true;
        } catch (e) {
            this.data.json = null;
            this.isJson = false;
        }
    }
}

// Export
module.exports = Response;