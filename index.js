const { faker } = require('@faker-js/faker'); // to generate random data
const mysql = require('mysql2'); // to connect with mysql

const conn = mysql.createConnection({ // here we are building the connection
    host: 'localhost',
    user: 'root',
    database: 'NODEWITHSQL',
    password: 'anil'
  });

 const getRandomUser=()=>{ // here we are generating information of single user using faker
      return {
        userId: faker.string.uuid(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      };
    }
    console.log(getRandomUser());

   let users = [["123d", "123_newuserd", "abc@gmail.comd","abcd"],["123e", "123_newusere", "abc@gmail.come","abce"]]; //created 2 data to put in database
let q = "INSERT INTO user (id, username, email, password) VALUES ?";
   //before adding any data to database first we should have created a database and made its shema or table before

try {
    conn.query(q, [users],(err, result)=>{ //here we are writing query "q" to add 100 data "users" in database
        if(err) throw err;
        console.log(result);
    })
    
} catch (error) {
    console.log(error);
}
conn.end(); // here we are stopping our connection which is important after starting the connection as if we do not did this then our connection will keep on started 

































  