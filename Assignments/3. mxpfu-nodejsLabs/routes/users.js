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


// GET METHODS //
// GET Sort by birthday
function getDateFromString(strDate) {
  let [dd,mm,yyyy] = strDate.split('-')
  return new Date(yyyy+"/"+mm+"/"+dd);
}
  
// GET Sort by birthday
router.get("/sort",(req,res)=>{
  let sorted_users=users.sort(function(a, b) {
    let d1 = getDateFromString(a.DOB);
    let d2 = getDateFromString(b.DOB);
    return d1-d2;
  });
  res.send(sorted_users);
});

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(JSON.stringify({users},null,4));
});

// GET request: Retrieve all users with a particular last name
router.get("/lastname/:lastName",(req,res)=>{
  const lastName = req.params.lastName;
  let filtered_lastname = users.filter((user) => user.lastName === lastName);
  res.send(filtered_lastname);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  email = req.params.email
  users_filtered = users.filter((user) => user.email === email)
  res.send(users_filtered)//This line is to be replaced with actual return value
});


//LINEA DE COMANDOS PARA PROBAR EN WINDOWS
/* $response = Invoke-WebRequest -Uri "http://localhost:5000/user?firstName=Jon&lastName=Lovato&email=jonlovato@theworld.com&DOB=10/10/1995" -Method Post
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


/* Invoke-WebRequest -Uri "http://localhost:5000/user/johnsmith@gamil.com?DOB=1/1/1971" -Method Put */
// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  if (filtered_users.length > 0) {
    let filtered_user = filtered_users[0];
    let DOB = req.query.DOB;
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;
    //if the DOB has changed
    if(DOB) {
      filtered_user.DOB = DOB
    }
    if(firstName) {
      filtered_user.firstName = firstName
    }
    if(lastName) {
      filtered_user.lastName = lastName
    }
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);
    res.send(`User with the email ${email} updated.`);
  }
  else{
    res.send("Unable to find user!");
  }
});


/* Invoke-WebRequest -Uri "http://localhost:5000/user/johnsmith@gamil.com" -Method Delete */
// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`User with the email ${email} deleted.`);
});

module.exports=router;
