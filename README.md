# Simple form snodec

This project was implemented as the final submission for the NDS lecture.
For the REST server the snode.c framework was used. The frontend app was developed with Vue3. MariaDB was used as the database.

## Getting started

### Requirements 

- MariaDB (installed and running)
- cnode.c (deployed)
- npm (installed)
- Node.js (installed)

### MariaDB setup

Scripts for creating and seeding the database can be found at `/database`. These scripts can be executed by in the MariaDB shell. Start a terminal and navigate into the scripts folder with `cd database`. Start the shell by executing `sudo mariadb`. You can execute sql files by typing the command `source <script_to_execute.sql>`.

To create the database and the tables, execute the command `source create.sql`. `insert.sql` fills the tables with example data and `select.sql` executes example select statements.


### snode.c setup

### Vue3 setup
