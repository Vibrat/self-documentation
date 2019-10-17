# How to handle object externally

This page contains information on how to handle object externally without access into the object. This will be helpful in cases when we want to call or access to a method inside a class with dynamic name.

For example, when we want to call method has name stored in a variable. We can do something like this.

```python
class Caller():

  def __init__(self) :
    pass

  def sayHello(self):
    print ("hello")

method = 'sayHello'
caller = Caller()

if hasattr(caller, method):
  getattr(caller, method)()

else:
  raise ValueError("Instance {} does not have method {}" . format(1, 2))
```

There are 4 built-in functions we should pay time to remember :

* `hasattr(class, method)` - Check if class has method
* `getattr(class, method)` - Return attribute representation
* `delattr(class, method)` - Delete a attribute
* `setattr(class, method)` - Set an attribute
