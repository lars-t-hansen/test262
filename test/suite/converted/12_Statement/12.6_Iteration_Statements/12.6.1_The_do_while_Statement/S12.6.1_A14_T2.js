// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * FunctionExpression within a "do-while" Expression is allowed
 *
 * @section: 12.6.1;
 * @path: 12_Statement/12.6_Iteration_Statements/12.6.1_The_do_while_Statement/S12.6.1_A14_T2.js;
 * @description: Using FunctionExpression "function __func(){return 0;}()" as an Expression;
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#
do{
    var __reached = 1;
   break;
}while(function __func(){return 0;}());
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__reached !== 1) {
	$ERROR('#2: function expession inside of do-while expression is allowed');
}
//
//////////////////////////////////////////////////////////////////////////////
