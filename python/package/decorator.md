# Decorators

`Decorator` is a powerful way of defining, overiding and scaling your code which help to not change anything inside your code. it acts as `function wrapper` that take your method, function and perform a customized actions.

Here is an example of `decorator`, type function

```python
"""
Example of Function Decorator
@Return customized object
"""

def deco_add_one(f):
    """
    Decorator: Add one to result
    """
    def runner(*args, **kwargs):
        # Perform actual function
        result = f(*args, **kwargs)

        # Add one
        if type(result) == int:
            result  += 1

        return result

    return runner # this must return a function

@deco_add_one
def compute(a):
    return a
```

And here is an example of Class decorator:

```python
"""
Example of Class Decorator
@return Class Object

@important
    - @decorator will call __call__ as the same time it inits __init__
"""
class Counter:

    def __init__(self, f):
       self.f = f
       self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        return self.f(*args, **kwargs)

@Counter
def hello():
    print ('hello')
```

And here is an example of Function Class Decorator:

```python
"""
Function Class Decorator
"""
class Counter:

    def __init__(self):
        self.enable = True

    def __call__(self, f):
        def runner(*args, **kwargs):
            result  = f(*args, **kwargs)

            if self.enable:
                print ("Calling")

            return result

        return runner

counter_func = Counter()

@counter_func
def compute():
    print ("hello world")
```

## functools.Wraps

when you want to return a function that is wrapped by decorator. Python compiler will return a wrapper function not the original function information. Take this example:

```python

def counter(f):
    def counter_wrapper(*args, **kwargs):
       return f(*args, *kwargs)

    return counter_wrapper

@counter
def hello():
    "Say something common"
    print("hello world")

hello.__name__ # => counter_wrapper
hello.__doc__   # => ``
```

In order to make python compilter return the original __name__ and __doc__, use `functools.wraps`:

```python

def counter(f):
    @functools.wraps(f)
    def counter_wrapper(*args, **kwargs):
       return f(*args, *kwargs)

    return counter_wrapper

@counter
def hello():
    "Say something common"
    print("hello world")

hello.__name__ # => hello
hello.__doc__   # => `say something common`
```

