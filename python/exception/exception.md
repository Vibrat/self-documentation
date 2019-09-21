# Basics of Exception in Python

Exception in python is handled by the following pattern:

```python

# Catch every exception as pass to continue
while true:
    try:
        typing_result = int(input('Type a number: '))
    except:
        continue
```

But it's a bad idea to catch all exception in one, catching the right exception is a great idea to simplify your application.

```python
# Catch only NameError

while true:
    try: typing_result = int(input('Type a number: '))
    except NameError:
        continue
```

One of the thing to keep in mind is that catching error has a hierarchy system that detech which `Type of Error` concieves which. 

```python
# Checking Error MRO (Module Resolution Order)
TypeError.mro()
IndexError.mro()
```
To know which `Exception` is under another. Please refer to the official document: [Here](https://docs.python.org/3/library/exceptions.html)


Build-in Exception has a way that we can get message from Exception to provide a much informative message when you don't know what the Exception is about:

```python

# Take Exception and output what it's telling

try:
    typing_result = int(input("Typing a Number: '))
except ValueError as e:
    print("You enter a not number value {args}".format(args=e.args))
    print (str(e))
```

Create a customized exception - that's needed to create a class that extends Exception and you can overide 3 magic method `__init__`, `__str__` and `__repr__`

```python

class CustomizedError(Exception):
    pass

class CostumizedError2(Exception):

    def __init__(self):
        pass

    def __repr__(self):
        pass

    def __str__(self):
        pass
```

