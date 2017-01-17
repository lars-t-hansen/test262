// Copyright (C) 2015 Mozilla Corporation.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
  Test that Atomics.wait actually waits and does not spuriously wake
  up when the memory value is changed.
---*/

$.agent.start(
`
$.agent.receiveBroadcast(function (sab, id) {
  var ia = new Int32Array(sab);
  var then = Date.now();
  Atomics.wait(ia, 0, 0);
  var diff = Date.now() - then;	// Should be about 1000 ms
  $.agent.report(diff);
})
`);

var ia = new Int32Array(new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT));

$.agent.broadcast(ia.buffer);
$.agent.sleep(500);		// Give the agent a chance to wait
Atomics.store(ia, 0, 1);	// Change the value, should not wake the agent
$.agent.sleep(500);		// Wait some more so that we can tell
Atomics.wake(ia, 0);		// Really wake it up
$.agent.sleep(500);		// Give it time to report back
assert.sameValue(Math.abs(($.agent.getReport()|0) - 1000) < 100, true);
