# Simple hacks with python

This page will help you to learn some functions that make python greats.

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
