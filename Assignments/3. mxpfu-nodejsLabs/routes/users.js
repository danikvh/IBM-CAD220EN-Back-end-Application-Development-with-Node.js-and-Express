const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(users)
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  email = req.params.email
  users_filtered = users.filter((user) => user.email === email)
  res.send(users_filtered)//This line is to be replaced with actual return value
});


//LINEA DE COMANDOS PARA PROBAR EN WINDOWS
/* $url = "http://localhost:5000/user?firstName=Jon&lastName=Lovato&email=jonlovato@theworld.com&DOB=10/10/1995"

$response = Invoke-WebRequest -Uri $url -Method Post
$response.Content*/
// POST request: Create a new user
router.post("/",(req,res)=>{
  user_dict = req.query
  user = {}
  Object.keys(user_dict).forEach(param => {
    user[param] = user_dict[param]
  })
  users.push(user);
  res.send("The user" + (' ')+ (user.firstName) + " Has been added!")
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

module.exports=router;
