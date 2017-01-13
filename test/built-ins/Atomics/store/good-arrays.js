// Copyright (C) 2016 Mozilla Corporation.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Test Atomics.store on arrays that allow atomic operations.
---*/

var sab = new SharedArrayBuffer(1024);
var ab = new ArrayBuffer(16);

var int_views = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array];

for ( let View of int_views ) {
    // Make it interesting - use non-zero byteOffsets and non-zero indexes.

    var view = new View(sab, 32, 20);
    var control = new View(ab, 0, 2);
    var val;

    for ( let val of [10, -5, 12345, 123456789, Math.PI, "33", { valueOf: () => 33 }, undefined] ) {
	// Atomics.store returns its third argument converted to Integer.
	assert.sameValue(Atomics.store(view, 3, val), ToInteger(val));

	control[0] = val;
	assert.sameValue(view[3], control[0]);
    }
}

function ToInteger(v) {
    v = +v;
    if (isNaN(v))
	return 0;
    if (v == 0 || !isFinite(v))
	return v;
    if (v < 0)
	return -Math.floor(Math.abs(v));
    return Math.floor(v);
}
