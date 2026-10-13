import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatDate, formatInspectionTime } from '../src/lib/utils/index.ts';

test('inspection calendar days remain stable across visitor timezones and daylight saving', () => {
  const original = process.env.TZ;
  try {
    for (const timezone of ['Australia/Melbourne', 'America/Los_Angeles', 'Pacific/Honolulu', 'UTC']) {
      process.env.TZ = timezone;
      assert.equal(formatDate('2026-10-15'), 'Thu, 15 Oct', timezone);
      assert.equal(formatDate('2026-04-05'), 'Sun, 5 Apr', timezone);
      assert.equal(formatInspectionTime({ date: '2026-10-15', startTime: '17:30', endTime: '18:00' }),
        'Thu, 15 Oct, 5:30pm – 6pm', timezone);
    }
  } finally {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  }
});
