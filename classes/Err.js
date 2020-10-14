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

// Main
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

// Export
module.exports = Err;