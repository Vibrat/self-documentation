# Fundamentals on working with files

### Basic functions:

- Create a path
```python
import os

os.path.join(['hello', 'world])
## return 'hello/world'
```

- Get current working files

```python
import os

current = os.getcwd()
## return 'hello/world'

## change current dir
os.chdir('hello/world2')
current = os.getcwd()
## return 'hello/world2'
```

- Create a folder

```python
import os

os.makedirs('hello/world')
```

- Check path

```python
import os

abs_path = os.path.abspath('hello/world')
## Return absolute path
is_abs = os.path.isabs('hello/world')
## Check if path is absoluate
rel_path = os.path.relpath('C://app/web')
## return 'web'
rel_path = os.path.relpath('C://app/web', 'hello')
## return relative path from 'hello'
```

- Detach file paths

```python
import os

file_path = 'C://app/web/start.exe'

base = os.path.basename(file_path)
## return 'start.exe'
path = os.path.dirname(file_path)
## return 'C://app/web'

base, path = os.path.split(file_path)
## return tuple ('C://app/web', 'start.exe')
```

- Check path

```python
import os

path = 'C://app/web/start.exe'

is_dir = os.path.isdir(path)
is_file = os.path.isfile(path)
if_exists = os.path.exists(path)
```
