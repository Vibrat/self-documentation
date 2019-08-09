# Design Object Attern

## Arguments

`arguments` is an built-in variable contains in a function scope which is used to contained all parameters passing into that function. Since `Javascript` is a loose type language which offers a lot of flexible in writing code, arguments come in handy when you need to write a function with unknown number of parametes, instead of using method overide (which does not exist in `Javascript`). 

```javascript

/**
 *
 *  @var Array arguments
 */
function aggregate(a, b, c) {
    /**
     *
     * arguments[0] is a
     * argument[1] is b
     * arguments[2] is c
     */
    var allParams = arguments;
    return a + b + c;
}

let result = aggregate(1, 2, 3, 4); // Return  1 + 2 + 3 = 6, arguments[3]  is 4
```

## Chaining

`Chaining` is a flow of action that you need to group into one single code when you write a snippet in `javascript`. You can image a pipeline that navigate flowing water into rigth direction, it will help you to easily see the endpoint, what could go wrong and where the end result will be.

```javascript
/**
 *
 * In javascript, `this` in function will be refered to the object which calls that funtion.
 */

var Caller = function (x) {
    this.total = 0; 
    
    this.add = function (x) {
        this.total += x;
        return this;
    }

    this.show = function (callback) {
        callback(this.total);
        return this;
    }

    // this method will not be revealed externally
    var saySomething = function (x) {
        return this;
    }
}

var caller = new Caller().add(5).show((result) => console.log(result)); // result total: 5
```

## Observable Pattern

The observable pattern works best when an object has listeners which will perform an actions based on property changes.

```javascript

var Caller = function () {
    var observers = [];
    this.total = 0;

    this.add = function (x) {  
        if (x !== undefined && x !== 0 && !isNaN(x)) {   
            this.total += parseInt(x);
            for (let i = 0; i < observers.length; i++) {
                observers[i](this, this.total);
            }
        }

        return this;
    }

    this.show = function (callback) {
        callback(this.total);
        return this;
    }

    this.onTotalChange = function (action) {
        observer.push(action);
        return this;
    }
}
```

## Timer Patterns


