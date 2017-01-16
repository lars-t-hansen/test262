// Copyright (C) 2016 Mozilla Corporation.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Test Atomics.sub on arrays that allow atomic operations
---*/

var sab = new SharedArrayBuffer(1024);
var ab = new ArrayBuffer(16);

var int_views = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array];

for ( let View of int_views ) {
    // Make it interesting - use non-zero byteOffsets and non-zero indexes.

    var view = new View(sab, 32, 20);
    var control = new View(ab, 0, 2);

    // Subtract positive number
    view[8] = 100;
    assert.sameValue(Atomics.sub(view, 8, 10), 100);
    assert.sameValue(view[8], 90);

    // Subtract negative number, though result remains positive
    assert.sameValue(Atomics.sub(view, 8, -5), 90);
    assert.sameValue(view[8], 95);

    // Result is negative and subject to coercion
    view[3] = -5;
    control[0] = -5;
    assert.sameValue(Atomics.sub(view, 3, 0), control[0]);

    // Result is subject to chopping
    control[0] = 12345;
    view[3] = 12345;
    assert.sameValue(Atomics.sub(view, 3, 0), control[0]);

    // And again
    control[0] = 123456789;
    view[3] = 123456789;
    assert.sameValue(Atomics.sub(view, 3, 0), control[0]);
}
