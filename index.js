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

// Pre-defined vars
/**
 * The API settings.
 * @constant
 */
const apiSettings = {
    host: 'www.virustotal.com',
    apiRoot: '/api/v3'
}

// Export those
module.exports.apiSettings = apiSettings;

// Import / Export
// NOTE:
//     Remember to do "require" then "export"
//     IN THAT ORDER! Doing it in a different
//     order will cause errors!
const Err = require('./Err.js');
module.exports.Err = Err;
const ScanResults = require('./ScanResults.js');
module.exports.ScanResults = ScanResults;
const URLParams = require('./URLParams.js');
module.exports.URLParams = URLParams;
const Response = require('./Response.js');
module.exports.Response = Response;
const Request = require('./Request.js');
module.exports.Request = Request;
const APIRequest = require('./APIRequest.js');
module.exports.APIRequest = APIRequest;
const Client = require('./Client.js');
module.exports.Client = Client;