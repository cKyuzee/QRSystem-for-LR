<?php

    #this is so that we can connect a php document to the database by simply importing this.
    class Connection
    {
        public function dbConnect()
        {
            return new PDO('mysql:host=localhost; dbname=ccslrseminar', 'root', ''); #this is where we may have differences (db username and password)
        }
    }
?>
