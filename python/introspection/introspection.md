# Introspection

## What is introspection?

`Introspection` is an ability of a programe to examinate its own structure and state.

## Function type()

`type` is a built-in function that is used to check object type under `__class__`.

```python

type(78) 
## int

"""
There is some core design in Type and Object that needs to take into account
"""
type(object) 
# type
issubclass(type, object)
# True
```

## function globals()

## function locals()

Print a locals scope variable of an object or function

An useful usecase for `locals` is to format string.

```python
name = "Lam Nguyen"
age = "24"
country = "Vietname"

formatted_str = "{name} has {age} from country {country}".format(**locals())
## Result: `Lam Nguyen` has 25 from country Vietname
```

## Inspect Module

This modules help to inspect object in python.

```python
import inspect
import sorted_set


inspect.getmembers(sorted_set.SortedSet, inspect.isfunction)
```

Another example:

```python
import inspect
import sorted_set import SortedSet

def dump(obj):

    print ("Type")
    print ("===")
    print (type(obj))
    print()

    print ("Documentation")
    print("===")
    print(inspect.getdoc(obj))
    print()

    


```
