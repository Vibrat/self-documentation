# Introduction to MYSQL

#### Checklist on learning MYSQL

- Setup MYSQL on dev and production.
- Parameter configurations
- Interact with database
  - Using command line: `create`, `update`, `insert`, `delete`, `select`.
  - Learning authentication.
  - Read performance table.
  - Using management tool: `adminer`, `percona`, `sysbench`, `mysqldump`.
- Reading binary log
- Backup: `logical`, `physical`, `point-in-time backup`
- Setting up Replication.
- Configure **GTID**.
- Database monitoring [PMM](https://www.percona.com/software/database-tools/percona-monitoring-and-management).
- Using [Orchestrator](https://github.com/openark/orchestrator) to check mysql cluster.
- Migration


#### Role and User

MYSQL users implement permission merges based on string specified.

```mysql
CREATE USER 'example'@'%' IDENTIFIED BY 'example';
GRANT ALL ON *.* TO 'example'@'%';
SHOW GRANTS FOR 'example'@'%';
```

**Role** is like a permission group which helps to manage permissions.

```mysql
## create role
CREATE ROLE 'reporting';
GRANT ALL ON *.* TO 'reporting';
GRANT 'reporting' TO 'example'@'%';
SET DEFAULT ROLE 'reporting' TO 'example'@'%';

## login as example and trigger role
SET ROLE 'reporting';
```
