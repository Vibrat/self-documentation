# Simple hacks with python

This page will help you to learn some functions that make python greats.

## Inspection

### dir

Function `dir` will help you to list all attributes of an class.

```python

class TextClass:

  code = 'textclass'

  def __init__(self):
    pass

  def debug(self):
    print repr(self)

text_class = TextClass()
dir(text_class)

"""
Return:
['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__',
 '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__',
 '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__','__setattr__',
 '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'debug', 'x']
"""
```

### vars

Method `vars` is used to get a object of attributes that associates directly to the object. The main difference between `vars` and `dir` is that dir will return a list of associated attributes on MRO of an object while `vars` will only return a object represents attributes that associates with the object directly (which mean is created or changed by from the object).

```python

## Class Sample
class ClassSample:

  def __init__(self):
    pass

  def say(something):
    print(something)

## Instanciate an instance,
"""
['__class__',
 '__delattr__',
 '__dict__',
 '__dir__',
 '__doc__',
 '__eq__',
 '__format__',
 '__ge__',
 '__getattribute__',
 '__gt__',
 '__hash__',
 '__init__',
 '__init_subclass__',
 '__le__',
 '__lt__',
 '__module__',
 '__ne__',
 '__new__',
 '__reduce__',
 '__reduce_ex__',
 '__repr__',
 '__setattr__',
 '__sizeof__',
 '__str__',
 '__subclasshook__',
 '__weakref__',
 'say']
"""
sample = ClassSample()
sample.b = 10

## Retrieve MRO,
dir(sample)

## Retrieve, return { b: 10 }
vars(sample)

```

## Dict method

### update

The `update` function will help to synchronize object value.

```python

import pprint

store = {
  1: 'My name is Lam',
  2: 'My last name is Nguyen
}

patch = {
  2: 'I changed my last name to Mike'
}

store.update(patch)
pprint.pprint(store)
## Output: {1: 'My name is Lam', 2: 'I changed my last name to Mike'}
```
