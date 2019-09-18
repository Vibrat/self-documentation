# Introduction to collections in python

Collections Protocol is used to category items into each protocol to perform a specific tasks such as check property, for loop,...

* `Container Protocol` which help to check property by `not` and `in`.
* `Sized Protocol` which has `len`
* `Iterable`
* `Mutable`
* ...

## Collection Creation

### Implement SortedSet

In this we follow a TDD (Test-Driven Development):

```python
import unittest
import bisect

class TestConstruction(unittest.TestCase):

    def test_empty(self):
        s = SortedSet([])
    
    def test_from_sequence(self):
        s = SortedSet([7, 8, 3, 1])

    def test_with_duplicates(self):
        s = SortedSet([8, 8, 8])
    
    def test_from_iterable(self):
        
        def gen682():
            yield 6
            yield 8
            yield 2
        
        g = gen682()
        s = SortedSet(g)

class TestContainerProtocol(unittest.TestCase):

    def setUp(self):
        self.s = SortedSet([6, 7, 3, 9])

    def test_positive_contained(self):
        self.assertTrue(6 in self.s)

class SortedSet:

    def __init__(self, items):
        self._items = sorted(items)
    
    def __contains__(self, item):
        "This method is run under `in` operator"
        return item in self._items

    def __len__(self):
        "This method is run under `len` built-in"
        return lent(self._items)

    def __getitem__(self, index):
        "Method support for indexing"

        result = self._items[index]
        return SortedSet(result) if isinstance(result, slice) else result
    
    def __eq__(self, rhs):
        "Rewrite `==` "
        if not isinstance(rhs, SortedSet):
            return NotImplemented

        return self._items == rhs._items

    def __ne__(self, rhs):
        "rewrite `not`"
        if not isinstance(rhs, SortedSet):
            return NotImplemented

        return self._items != rhs._items

    def __count__(self, item):
        "Implemented Binary Search for better performance"
        index = bisect.bisect_left(self._items, item)
        found = (index != len(self._items)) and self._items[index] == item

        return int(found)
    def __add__(self, item):
        return SortedSet(chain(self._items, rhs._items))

    def __mul__(self, rhs):
        "multiple left side"
        return self if rhs > 0  else SortedSet()

    def __rmul__(self, lhs):
        "multiple right side"
        return self * lhs
        
if __name__ == '__main__':
    unittest.main()
```