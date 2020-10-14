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
const apiSettings = {
    host: 'www.virustotal.com',
    apiRoot: '/api/v3'
}

// Export those
module.exports.apiSettings = apiSettings;

// Import / Export
const Err = require('./Err.js');
const URLParams = require('./URLParams.js');
const Response = require('./Response.js');
const Request = require('./Request.js');
const APIRequest = require('./APIRequest.js');
const Client = require('./Client.js');

module.exports.Err = Err;
module.exports.URLParams = URLParams;
module.exports.Response = Response;
module.exports.Request = Request;
module.exports.APIRequest = APIRequest;
module.exports.Client = Client;