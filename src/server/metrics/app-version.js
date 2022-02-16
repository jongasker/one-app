/*
 * Copyright 2019 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { createGauge, setGauge } from './gauges';
import createMetricNamespace from './create-metric-namespace';
import readJsonFile from '../utils/readJsonFile';

const { buildVersion: version } = readJsonFile('../../../.build-meta.json');
const versionNamespace = createMetricNamespace('version');

createGauge({
  name: versionNamespace('info'),
  labelNames: ['version', 'major', 'minor', 'patch', 'prerelease', 'build'],
  help: 'One App version info',
});

// keep the parsing in a local variable to avoid keeping it in memory forever
function parseVersionAndSetGaugue() {
  // eslint-disable-next-line unicorn/no-unsafe-regex -- do not want to touch
  const parts = /(\d+)\.(\d+)\.(\d+)(?:-(.+))?-(.+)/.exec(version);

  setGauge(versionNamespace.getMetricNames().info, {
    version,
    major: Number(parts[1]),
    minor: Number(parts[2]),
    patch: Number(parts[3]),
    prerelease: parts[4] || null,
    build: parts[5],
  }, 1);
}
parseVersionAndSetGaugue();

export default versionNamespace.getMetricNames();
