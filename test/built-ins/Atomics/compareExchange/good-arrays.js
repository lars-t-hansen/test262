// Copyright (C) 2016 Mozilla Corporation.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Test Atomics.compareExchange on arrays that allow atomic operations.
---*/

var sab = new SharedArrayBuffer(1024);
var ab = new ArrayBuffer(16);

var int_views = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array];

for ( let View of int_views ) {
    var view = new View(sab, 32, 20);
    var control = new View(ab, 0, 2);

    // Does exchange
    view[8] = 0;
    assert.sameValue(Atomics.compareExchange(view, 8, 0, 10), 0);
    assert.sameValue(view[8], 10);

    // Does not exchange
    view[8] = 0;
    assert.sameValue(Atomics.compareExchange(view, 8, 1, 10), 0);
    assert.sameValue(view[8], 0);

    // Does exchange, coercing the value being stored
    view[8] = 0;
    assert.sameValue(Atomics.compareExchange(view, 8, 0, -5), 0);
    control[0] = -5;
    assert.sameValue(view[8], control[0]);

    // Does exchange, coercing the value being tested
    view[3] = -5;
    control[0] = -5;
    assert.sameValue(Atomics.compareExchange(view, 3, -5, 0), control[0]);
    assert.sameValue(view[3], 0);

    // Ditto
    control[0] = 12345;
    view[3] = 12345;
    assert.sameValue(Atomics.compareExchange(view, 3, 12345, 0), control[0]);
    assert.sameValue(view[3], 0);

    // Ditto
    control[0] = 123456789;
    view[3] = 123456789;
    assert.sameValue(Atomics.compareExchange(view, 3, 123456789, 0), control[0]);
    assert.sameValue(view[3], 0);
}
