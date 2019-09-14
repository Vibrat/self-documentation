# Package in python

## About sys.path

When we import something into our code, python interpreter will look for the packages in `sys.path`. If the module does exist in `sys.path`, we can always add by the following  sample:

```python
import sys
sys.path.append(<folder_module>)
import <module>
```

## Environment PYTHONPATH

`PYTHONPATH` environment contains extensible paths to library that compiler later looks up when running.