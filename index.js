const { faker } = require('@faker-js/faker'); // to generate random data
const mysql = require('mysql2'); // to connect with mysql
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine ", "ejs");
app.set("views", path.join(__dirname, "views"));

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

  //we do not need this anymore as we have inserted our 100 data already in database
// let q = "INSERT INTO user(id, username, email, password) VALUES ?"; // in place of ? comes the data array , this is the query to add data in database
// // let users = [["123b", "123_newuserb", "abc@gmail.comb","abcb"],["123c", "123_newuserc", "abc@gmail.comc","abcc"]];

// let data = []; // here we will put all the 100 data that is gerenated using faker
// for(let i=1; i<=100; i++){ // here we are generating 100 data using faker and pusing all that in data array
// data.push(getRandomUser());
// }



app.listen(8080, ()=>{
  console.log(`app is listening on port 8080`);
})

app.get("/", (req, res)=> {
try {
  const q = `SELECT COUNT(*) FROM user`;
    conn.query(q,(err, result)=>{ //here we are writing query "q" to add 100 data "data" in database
        if(err) throw err;
       const count = result[0]["COUNT(*)"];
        res.render("home.ejs", {count});
    })
    
} catch (error) {
    console.log(error);
    res.send(error);
}
})


//we will need this to use in routes
// try {
//     conn.query(q, [data],(err, result)=>{ //here we are writing query "q" to add 100 data "data" in database
//         if(err) throw err;
//         console.log(result);
//     })
    
// } catch (error) {
//     console.log(error);
// }
// conn.end();





























  