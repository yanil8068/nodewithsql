const { faker } = require('@faker-js/faker'); // to generate random data
const mysql = require('mysql2'); // to connect with mysql

const conn = mysql.createConnection({ // here we are building the connection
    host: 'localhost',
    user: 'root',
    database: 'NODEWITHSQL',
    password: 'anil'
  });

  const getRandomUser=()=>{ // here we are generating information of single user using faker
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password()
    ];
  }

let q = "INSERT INTO user(id, username, email, password) VALUES ?"; // in place of ? comes the data array , this is the query to add data in database
// let users = [["123b", "123_newuserb", "abc@gmail.comb","abcb"],["123c", "123_newuserc", "abc@gmail.comc","abcc"]];

let data = []; // here we will put all the 100 data that is gerenated using faker
for(let i=1; i<=100; i++){ // here we are generating 100 data using faker and pusing all that in data array
data.push(getRandomUser());
}


try {
    conn.query(q, [data],(err, result)=>{ //here we are writing query "q" to add 100 data "data" in database
        if(err) throw err;
        console.log(result);
    })
    
} catch (error) {
    console.log(error);
}
conn.end();





























  