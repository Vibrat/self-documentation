# Context Manager in python

An object manager is a block of snippet that is used to control an object in python.

```python

with context-manager:
    allocation()
    body()
    deallocation()
```

`Benefit`: Automatic controlling resources in context

Take a look on this example:

```python

with open('./data-sample.csv', 'rt') as f:
    ## body

```

## Define A Context Manager

Methods: `__enter__`, `__exit__`


```python
@contextmanager
def yield_random_val():
    """ 
        Context Manager build by `contextlib`
        @important:
            - `__enter__` should only yield once
    """
    try:
        raise Exception('pre-pend error')
        yield [random.random() for i in range(10)]

    except Exception as  e:
        print('Error while read context manager {}'.format(str(e)))
        raise RuntimeError('runtime error in context')  


class ContextManager:
    """
    Context Manager build based on python code
    @important:
        - `__enter__` should only yield one
    """
    def __init__(self):
        pass

    def __enter__(self):
        return self

    def __exit__(self, type, value, traceback):
        """
            Exit ContextManager
            @important
                - if this method return True, Exception will not propagate outside context manager, and vice versa
        """
        print ('exit context')
        return True

try:
    with ContextManager() as item:
        raise Exception('empty class')
except Exception as e:
    print ("Context", isinstance(e.__context__, Exception))
    print ("Cause", e.__cause__)
```

Another usecase for Context Manager is to wrap database conntection:

```python

class DatabaseConection():

    def __init__(self, conn):
        self.conn = conn
        self.x_id = conn._start_transaction()

    def commit(self):
        self.conn._commit_transaction(self.x_id)

    def rollback(self):
        self.conn._rollback_transaction(seld.x_id)

@contextlib.contextmanager
def start_transaction(connection):
    tx = Transaction(connection)

    try:
        yield tx
    except:
        tx.rollback()
        raise

    tx.commit()
```

## Important:

`with` statement does not work with `list`. In order to use multiple context manager at a time, use the following formular:

```python
with ContextManager1() as a, \
     ContextManager2() as b, \
     ContextManager3() as c:
     print (a, b, c)
```

