# Query A Tree based on Recursive statement MYSQL

In mose case when we want to query a tree of data instead of multiple same level records, recursive comes into handy.

Sample data:

| commend_id | parent_id | author | comment |
| ---------- | --------- | ------ | ------- |
| 1          | null      | Fran   | What's the cause of this bug? |
| 2          | 1         | Ollie  | I think it's null pointer     |
| 3          | 2         | Fran   | No, I've checked for that     |
| 4          | 1         | Kukla  | We need to check valid input  |
| 5          | 4         | Ollie  | Yes, that's bug               |
| 6          | 4         | Fran   | Yes, please add a check       |
| 7          | 6         | Kukla  | That fixed it                 |
