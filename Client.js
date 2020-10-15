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
const { APIRequest, Err, ScanResults } = require('./index.js')

// Main
/**
 * The main gateway to interacting with the API.
 * @property {Object} user The user of the API
 * @property {String} user.type The type of user
 * @property {String} user.id Your user ID
 * @property {Object} quotas Quota information
 * @property {Object} quotas.api_requests_daily Your daily quota
 * @property {Number} quotas.api_requests_daily.total Your daily quota total
 * @property {Number} quotas.api_requests_daily.used Your daily quota used
 * @property {Number} quotas.api_requests_daily.remaining Your daily quota that is left
 * @property {Object} quotas.api_requests_hourly Your hourly quota
 * @property {Number} quotas.api_requests_hourly.total Your hourly quota total
 * @property {Number} quotas.api_requests_hourly.used Your hourly quota used
 * @property {Number} quotas.api_requests_hourly.remaining Your hourly quota that is left
 * @property {Object} quotas.api_requests_monthly Your monthly quota
 * @property {Number} quotas.api_requests_monthly.total Your monthly quota total
 * @property {Number} quotas.api_requests_monthly.used Your monthly quota used
 * @property {Number} quotas.api_requests_monthly.remaining Your monthly quota that is left
 */
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

    /**
     * Fetches ScanResults for a file's SHA-256, SHA-1, or MD5.
     * @function
     * @param {String} id The file's SHA-256, SHA-1, or MD5
     * @returns {Promise<ScanResults>} The file's scan results
     * @example
     * let results = client.getResults('sha1/sha256/md5');
     */
    async getResults(id) {
        return new Promise(async (resolve, reject) => {
            let req = new APIRequest('GET', '/files/' + id, this.key);
            let res = await req.send();
            if (res.code == 200) {
                let data = new ScanResults(res);
                resolve(data);
            } else {
                reject(res);
            }
        });
    }
}

// Export
module.exports = Client;