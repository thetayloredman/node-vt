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
     * See {@tutorial Using_Client} for more information.
     * @constructor
     * @param {String} key Your VT API key
     * @example
     * let client = new nvt.Client('api-key');
     */
    constructor(key) {
        this.key = key;
        this._checkKey();
        this._fetchQuota();
    }
    
    /**
     * Checks if the API key is valid.
     * @function
     * @throws {Err} Will throw an error if the key is invalid.
     * @returns {undefined|Boolean} true if the key is valid, undefined+Err if invalid
     * @private
     */
    _checkKey() {
        let validation = new APIRequest('GET', `/users/${this.key}`, this.key);
        validation.send().then((d) => {
            if (d.code === 401) {
                if (d.data.json.error.code === 'WrongCredentialsError') {
                    throw new Err('Invalid API key!', 'BadKeyError');
                } else {
                    return true;
                }
            } else {
                return true;
            }
        });
    }

    /**
     * Fetches the quota.
     * @function
     * @returns {undefined} undefined
     * @private
     */
    _fetchQuota() {
        let quotaChecker = new APIRequest('GET', `/users/${this.key}`, this.key);
        quotaChecker.send().then((data) => {
            const d = data.data.json.data;
            console.log(d)
            const { attributes: { quotas: q } } = d;
            this.user = {
                type: d.type,
                id: d.id
            }
            this.quotas = {
                api_requests_daily: {
                    total: q.api_requests_daily.allowed,
                    used: q.api_requests_daily.used,
                    remaining: q.api_requests_daily.allowed - q.api_requests_daily.used
                },
                api_requests_hourly: {
                    total: q.api_requests_hourly.allowed,
                    used: q.api_requests_hourly.used,
                    remaining: q.api_requests_hourly.allowed - q.api_requests_hourly.used
                },
                api_requests_monthly: {
                    total: q.api_requests_monthly.allowed,
                    used: q.api_requests_monthly.used,
                    remaining: q.api_requests_monthly.allowed - q.api_requests_monthly.used
                }
            }
        });
    }
}

// Export
module.exports = Client;