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
 * Represents scan results from the API.
 * @property {Object} results The raw scan results
 * @property {Object} stats The last analysis stats
 * @property {Number} stats.harmless The number of engines that say OK.
 * @property {Number} stats.malicious The number of engines that flag the file.
 * @property {Number} stats.suspicious The number of engines that are suspicious about the file.
 * @property {Number} stats.timeout The number of engined that timed out.
 * @property {Number} stats.unsupported The number of engines that don't support that type.
 * @property {Number} stats.undetected The engines that say this file is OK.
 */
class ScanResults {
    /**
     * Creates scan results
     * @constructor
     * @param {Response} data The response from the API when performing GET /files/{id}. Warning: The Response MUST have been resolved!
     * @example
     * const results = new ScanResults(res.data.json); // => ScanResults
     */
    constructor(data) {
            if (!data.isJson) {
                throw new Err('Failed to get a valid API Response. Is it a Response that is RESOLVED?', 'InvalidResponseError');
            } else {
                const { data: fileData } = data.data.json;
                this.stats = fileData.attributes.last_analysis_stats;
                const results = fileData.attributes.last_analysis_results;

                // Process aliases
                const pResults = new Object();
                for (let [ k, v ] of Object.entries(results)) {
                    if (k === 'type-unsupported') {
                        pResults.unsupported = v;
                    } else {
                        pResults[k] = v;
                    }
                }

                this.stats = pResults;
            }
    }
}

// Export
module.exports = ScanResults;