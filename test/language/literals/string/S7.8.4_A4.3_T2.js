// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: NonEscapeSequence is not EscapeCharacter
es5id: 7.8.4_A4.3_T2
description: "EscapeCharacter :: DecimalDigits :: 7"
negative:
  phase: early
  type: SyntaxError
flags: [onlyStrict]
---*/

throw "Test262: This statement should not be evaluated.";

"\7"
