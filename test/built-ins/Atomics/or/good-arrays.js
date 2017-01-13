// Copyright (C) 2016 Mozilla Corporation.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Test Atomics.or on arrays that allow atomic operations
---*/

var sab = new SharedArrayBuffer(1024);
var ab = new ArrayBuffer(16);
var int_views = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array];

for ( let View of int_views ) {
    // Make it interesting - use non-zero byteOffsets and non-zero indexes.

    var view = new View(sab, 32, 20);
    var control = new View(ab, 0, 2);

    view[8] = 0x33333333;

    control[0] = 0x33333333;
    assert.sameValue(Atomics.or(view, 8, 0x55555555), control[0]);

    control[0] = 0x77777777;
    assert.sameValue(view[8], control[0]);
    assert.sameValue(Atomics.or(view, 8, 0xF0F0F0F0), control[0]);

    control[0] = 0xF7F7F7F7;
    assert.sameValue(view[8], control[0]);

    // Rudimentary tests for sign extension and chopping.

    view[3] = -5;
    control[0] = -5;
    assert.sameValue(Atomics.or(view, 3, 0), control[0]);
    assert.sameValue(view[3], control[0]);

    control[0] = 12345;
    view[3] = 12345;
    assert.sameValue(Atomics.or(view, 3, 0), control[0]);
    assert.sameValue(view[3], control[0]);

    control[0] = 123456789;
    view[3] = 123456789;
    assert.sameValue(Atomics.or(view, 3, 0), control[0]);
    assert.sameValue(view[3], control[0]);
}
