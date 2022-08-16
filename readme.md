# Simple form snodec

This project was implemented as the final submission for the NDS lecture.
For the REST server the snode.c framework was used. The frontend app was developed with Vue3. MariaDB was used as the database.

## Getting started

### Requirements 

- MariaDB (installed and running)
- snode.c (deployed)
- npm (installed)
- Node.js 14 or higher (installed)

### MariaDB setup

Scripts for creating and seeding the database can be found at `/database`. These scripts can be executed in the MariaDB shell. Start a terminal and navigate into the scripts folder with `cd database`. Start the shell by executing `sudo mariadb`. You can execute sql files by typing the command `source <script_to_execute.sql>`.

To create the database and the tables, execute the command `source create.sql`. `insert.sql` fills the tables with example data and `select.sql` executes example select statements.


### snode.c setup

I would recommend to set the build path to `/build` besides the `/src` folder. In QtCreator the path can be set at **Projects > Build > CMake > Build directory**.

The Server needs to load a configuration file `config.json`. To add the path to the file as a command line argument, go to **Projects > Run > Run > Command line arguments** and paste in the path to your config file. The structure of the content can be found inside the `config.example.json`. Just copy the content into your `config.json` and change the values.

### Vue3 setup

One requirement for Vue3 is Node.js of version 14 or higher. 
To install Node.js 16 on Debian execute the following commands:
```
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt -y install nodejs
```

After the installation of Node.js, navigate into the `frontend-app` folder and run `npm i` to install the node modules. To start the development server, execute `npm run dev`. With `npm run build` the app is build and written to the `/dist` folder.
