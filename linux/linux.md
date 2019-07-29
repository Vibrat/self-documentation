# Linux Fundamentals

#### Users and Permissions

* Add a user

```
adduser <username>
passwd <username>

# Create and add user at the same time
useradd -G <group-name> <username>
usermod -a -G <group1,group2,group3> <username>
```

* Create a Group

```
groupadd <group-name>
```

* Add a user to group

```
# Add User to group
usermod -a -G <group-name> <username>

# Change User primary group
usermod -g <groupname> <username>
```

* View Groups

```
groups
```

* Command `setfacl` is used to set permissions to user | group

*Syntax*
```
setfacl-m u:<username>:rwx <directory|file>
```