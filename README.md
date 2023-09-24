## How to build and run this project
* Install Without Docker
    * Install MYSQL. [Find Instructions Here](https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html).
    * Add the environment variables to the .env file
    * Execute `npm install`
    * Execute `npm start`

* Install With Docker
    * Add the environment variables to the .env file
    * Install Docker and Docker Compose. [Find Instructions Here](https://docs.docker.com/install/).
    * Execute `docker-compose up -d` in terminal from the repo directory.
    * You will be able to access the api from http://localhost:3000

 ## API Examples
* Create Book
    * Request Body
    ```json
    {
        "name": "Book Name2",
        "author": "Author",
        "isbn": "1234517821310",
        "quantity": 5,
        "shelfLocation": "A1"
    }
    ```
    * Response Body: 200
    ```json
    {
        "statusCode": "10000",
        "message": "Book created successfully",
        "data": {
            "id": 12,
            "name": "Book Name2",
            "author": "Author",
            "isbn": "1234517821110",
            "quantity": 5,
            "shelfLocation": "A1"
        }
    }
    ```
