This project uses MariaDB as database, to import database simply create a new database in MariaDB, name is not very important.
Afterwards click import in the tab on the top part of your screen and then choose the sql file above. 
Scroll down, click import and you're database is set!

To link database to API (using localhost) replace the "yourDataBaseName" within MySqlConnection in the API Controllers to what you named the database
like so:

connection = new MySqlConnection("server=localhost;uid=root;pwd=;database=yourDataBaseName");

You can use swagger to test that your database and API are connected by fetching something (remember to check that there's something in the database to fetch!)