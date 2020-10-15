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
const { Err, Response } = require('./index.js');

// Main
/**
 * Represents scan results from the API
 */
class ScanResults {
    /**
     * Creates scan results
     * @constructor
     * @param {Response} data The response from the API. Warning: The Response MUST have been resolved!
     * @example
     * const results = new ScanResults(res.data.json); // => ScanResults
     */
    constructor(data) {
        if (!data instanceof Response) {
            throw new Err('ScanResults takes a Response, not a ' + typeof data)
        }
    }
}

// Export
module.exports = ScanResults;