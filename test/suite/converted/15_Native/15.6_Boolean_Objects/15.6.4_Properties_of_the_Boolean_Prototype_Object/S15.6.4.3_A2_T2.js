// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The valueOf function is not generic, it cannot be transferred
 * to other kinds of objects for use as a method and there is should be
 * a TypeError exception if its this value is not a Boolean object
 *
 * @section: 15.6.4.3;
 * @path: 15_Native/15.6_Boolean_Objects/15.6.4_Properties_of_the_Boolean_Prototype_Object/S15.6.4.3_A2_T2.js;
 * @description: transferring to the Number objects;
 */

//CHECK#1
try{
  var s1 = new Number();
  s1.valueOf = Boolean.prototype.valueOf;
  var v1 = s1.valueOf(); 
  $ERROR('#1: Boolean.prototype.valueOf on not a Boolean object should throw TypeError');
}
catch(e){
  if(!(e instanceof TypeError)){
    $ERROR('#1: Boolean.prototype.valueOf on not a Boolean object should throw TypeError, not '+e);
  }
}

//CHECK#1
try{
  var s2 = new Number();
  s2.myValueOf = Boolean.prototype.valueOf;
  var v2 = s2.myValueOf(); 
  $ERROR('#2: Boolean.prototype.valueOf on not a Boolean object should throw TypeError');
}
catch(e){
  if(!(e instanceof TypeError)){
    $ERROR('#2: Boolean.prototype.valueOf on not a Boolean object should throw TypeError, not '+e);
  }
}

