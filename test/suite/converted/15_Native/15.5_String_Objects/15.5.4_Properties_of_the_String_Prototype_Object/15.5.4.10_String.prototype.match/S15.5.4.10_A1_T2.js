// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.match (regexp)
 *
 * @section: 15.5.4.10;
 * @path: 15_Native/15.5_String_Objects/15.5.4_Properties_of_the_String_Prototype_Object/15.5.4.10_String.prototype.match/S15.5.4.10_A1_T2.js;
 * @description: Argument is function that return boolean, and instance is Boolean object;
 */

var __instance = new Boolean;

__instance.match = String.prototype.match;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.match(function(){return false;}())[0] !== "false") {
  $ERROR('#1: __instance = new Boolean; __instance.match = String.prototype.match;  __instance.match(function(){return false;}())[0] === "false". Actual: '+__instance.match(function(){return false;}())[0] );
}
//
//////////////////////////////////////////////////////////////////////////////
