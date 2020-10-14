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
const {  } = require('../index.js');

// Main
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

// Export
module.exports = Response;