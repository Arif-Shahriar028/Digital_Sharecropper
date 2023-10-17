/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const sysChaincode = require('./lib/sysChaincode');

module.exports.SysChanicode = sysChaincode;
module.exports.contracts = [sysChaincode];
