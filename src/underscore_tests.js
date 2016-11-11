/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if(n !== undefined) {
      return array.slice(0,n);
    } else {
      return array[0];
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n !== undefined) {
      if(n > array.length) {
        return array;
      } else {
        return array.slice(array.length - n,array.length);
      }
    } else {
      return array[array.length - 1];
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    
    for(var element in collection) {
      iterator(collection[element],element,collection);
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for(var i = 0; i < array.length; i++) {
      if(array[i] == target) {
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
    var results = [];
    for(var elem in collection) {
      if(iterator(collection[elem])) {
        results.push(collection[elem]);
      }
    }
    return results;

  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var results = [];
    for(var elem in collection) {
      if(!iterator(collection[elem])) {
        results.push(collection[elem]);
      }
    }
    return results;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var results  = [];
    for(var i = 0; i < array.length; i++) {
      if(results.indexOf(array[i]) == -1) {
        results.push(array[i]);
      }
    }
    return results;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var results = [];
    for(var i in array) {
      results.push(iterator(array[i]));
    }
    return results;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var results = [];
    for(var i in array) {
      if(array[i].hasOwnProperty(propertyName)) {
        results.push(array[i][propertyName]);
      }
    }
    return results;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {

    if(typeof(methodName) == 'function') {
      for(var elem in list) {
        methodName.call(list[elem], args);
      }
    } else {
      for(var elem in list) {
        list[elem][methodName](args);
      }
    }
    return list;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    var sum = (initialValue !== undefined) ? initialValue : 0;
    for(var e in collection) {
      sum = iterator(sum, collection[e]);
    }
    return sum;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    for(var e in collection) {
      if(collection[e] === target) {
        return true;
      }
    }
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    var testFunc = (iterator !== undefined) ? iterator : function(item){return item};

    var allTrue = true;
    for(var e in collection) {
      allTrue = allTrue && !!testFunc(collection[e]);
    }
    return allTrue;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    var testFunc = (iterator !== undefined) ? iterator : function(item){return item};
    var someTrue = false;
    for(var e in collection) {
      someTrue = someTrue || !!testFunc(collection[e]);
    }
    return someTrue;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    
    for(var arg in arguments) {
      for(var elem in arguments[arg]) {
        obj[elem] = arguments[arg][elem];
      } 
    }
    
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for(var arg in arguments) {
      for(var elem in arguments[arg]) {
        if(!obj.hasOwnProperty(elem)) {
          obj[elem] = arguments[arg][elem];
        }
      } 
    }
    
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    return function() {
        var called = false;
        var result;
        return function() {
            if (!called) {
              result = func();
              called = true;
            }
            return result;
        }
    }();
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    return function() {
        var results = {};
        return function(arg) {
          if (results[arg] === undefined) {
            results[arg] = func(arg);
          }
          return results[arg];
        }
    }();
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    if(arguments[2] !== undefined) {
      var args = (Array.from(arguments)).slice(2);
      setTimeout(function(){func.apply('', args)}, wait);
    } else {
      setTimeout(function(){func()}, wait);
    }
    
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    //My own implementation of a shuffle. 
    //Randomly remove elements from the array and append them to the end.
    var temp = array.slice();
    for(var i = 0; i < array.length*2; i++) {
      temp.push(temp.splice(Math.floor(Math.random() * array.length),1)[0]);
    }
    return temp;  

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {

    //Find length of longest input array
    var max = 0;
    for(var arg in arguments) {
      max = (arguments[arg].length > max) ? arguments.length : max;
    }

    //Now zip the arrays
    var results = []
    for(var i = 0; i < max ; i++){
      var temp = [];
      for(var arg in arguments) {
        temp.push(arguments[arg][i]);
      }
      results.push(temp);
    }
    return results;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    var temp = [];
    for(var i in nestedArray) {
      if(Array.isArray(nestedArray[i])) {
        temp = temp.concat(_.flatten(nestedArray[i]));
      } else {
        temp.push(nestedArray[i]);
      }
    }
    return temp;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    //The big(O) of this is going to be disgusting
    
    var intersections = [];
    //Go through each array
    for(var i in arguments) {
      //Go through each element in each array
      var curArr = arguments[i];
      for(var j in curArr) {
        if(intersections.indexOf(curArr[j]) == -1) {
          var inAll = true;
          //Check if the element is in all arrays
          for(var k in arguments) {
            inAll = inAll && (arguments[k].indexOf(curArr[j]) >= 0 );
          }
          if(inAll) {
            intersections.push(curArr[j]);
          }
        }
      }  
    }
    return intersections;

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {

    var diffs = [];
    //Go through each array
    
    for(var i in array) {
      var uniq = true;
      for(var j = 1; j < arguments.length; j++) {
        uniq = uniq && (arguments[j].indexOf(array[i]) == -1)
      }
      if(uniq) {
        diffs.push(array[i]);
      }
    }
    return diffs;
  };

}).call(this);
