const { faker } = require('@faker-js/faker'); // to generate random data
const mysql = require('mysql2'); // to connect with mysql
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');

app.set("view engine ", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));

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

//home route
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

//users route
app.get("/users", (req, res)=> {
  try {
    const q = `SELECT * FROM user`;
      conn.query(q,(err, users)=>{ //here we are writing query "q" to add 100 data "data" in database
          if(err) throw err;
     
          res.render("showusers.ejs",{users});
      })
      
  } catch (error) {
      console.log(error);
      res.send(error);
  }
  })

//edit route
  app.get("/users/:id/edit", (req, res)=> {
    try {
      const {id} = req.params;
      const q = `SELECT * FROM user where id='${id}'`;
        conn.query(q,(err, result)=>{ //here we are writing query "q" to add 100 data "data" in database
            if(err) throw err;
       const user = result[0]
            res.render("edit.ejs",{user});
        })
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
    })

//update route
app.patch("/user/:id", (req, res)=> {
  try {
    const {id} = req.params;
    const {username: newusername, password: newpassword} = req.body;
    console.log(newusername);
    const q = `SELECT * FROM user where id='${id}'`;
      conn.query(q,(err, result)=>{ //here we are writing query "q" to add 100 data "data" in database
          if(err) throw err;
     const user = result[0];
     if(newpassword!= user.password){
      res.send("wrong password");
     }else{
      const q2 = `UPDATE user SET username='${newusername}' where id='${id}'`;
      conn.query(q2,(err, result)=>{ 
        if(err) throw err;
   res.redirect("/users");
    })
    
     
     }
         
      })
      
  } catch (error) {
      console.log(error);
      res.send(error);
  }
  });



  //create new user form
  app.get("/users/createnewuser", (req, res)=> {
res.render("createnewuser.ejs");
    })


    //add to database route
    app.post("/users/addnewuser", (req, res)=> {
    
      try {
        const {id, username, email, password}=req.body;
       
        const q =  `INSERT INTO user VALUES ('${id}', '${username}', '${email}', '${password}')`;
          conn.query(q,(err, result)=>{ //here we are writing query "q" to add 100 data "data" in database
              if(err) throw err;
         const user = result[0]
              res.redirect("/users");
          })
          
      } catch (error) {
          console.log(error);
          res.send(error);
      }
      
          })
          
//delete route
app.delete("/users/:id/delete", (req, res)=>{
  try {
    const {id} = req.params;
   console.log(id);
    const q = `DELETE FROM user WHERE id='${id}'`;
      conn.query(q,(err, result)=>{ //here we are writing query "q" to add 100 data "data" in database
          if(err) throw err;
     const user = result[0]
          res.redirect("/users");
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





























  