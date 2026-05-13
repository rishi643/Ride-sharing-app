const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
require('dotenv').config(); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:`${process.env.DOMAIN}`,  // Your React app's URL
    credentials: true  // Allow credentials (cookies, authorization headers)
}));



app.use(express.json());
const con = mysql.createConnection({
    host: String(process.env.host),
    user: String(process.env.user),
    password: String(process.env.password),
    database: String(process.env.database),
});

con.connect((err) => {
    if (err) {
        console.log("Error connecting to database:", err);
    } else {
        console.log("Connected to database");
    }
});

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function CheckEmail(email) {
    return emailPattern.test(email);
}

function CheckPassword(password) {
    return passwordPattern.test(password);
}

app.post("/register", async (req, res) => {
    const { FullName, PhoneNo, Email, Password, LicenseNo, VechileType , LONGITUDE,
        LATITUDE} = req.body;
 
   
    const hashedpassword=bcrypt.hashSync(Password,10);
    
    let { DOB, LicenseExpDate } = req.body;
    
    const [day, month, year] = DOB.split('/');
    DOB = `${year}-${month}-${day}`;
    const [day1, month1, year1] = LicenseExpDate.split('/');
    LicenseExpDate = `${year1}-${month1}-${day1}`;

    if (!CheckEmail(Email) || !CheckPassword(Password)) {
        return res.status(406).send("Provide Valid Email And Password");
    }
    if(VechileType!=("Luxary" || "Comfort" || "Ordinary") ){
        return res.status(406).send("Choose from only three options in the vechile type");
    }
    con.query("SELECT * FROM DRIVERPERSONALINFO WHERE email = ? OR PhoneNo = ?", [Email, PhoneNo], (err, results) => {
        if (err) {
            return res.status(500).send("Database error");
        }

        if (results.length > 0) {
            return res.status(406).send("User Already Exists");
        }
        console.log(LONGITUDE,LATITUDE);
        
        const query = `INSERT INTO DRIVERPERSONALINFO (FullName, email, DOB, PhoneNo, Password, LicenseNo, LicenseExpDate,LOCATION,VehicleType) VALUES (?, ?, ?, ?, ?, ?, ?, ST_GeomFromText('POINT(? ?)', 4326), ?)`;
        const data = [FullName, Email, DOB, PhoneNo,hashedpassword, LicenseNo, LicenseExpDate, LONGITUDE,LATITUDE,VechileType];

        con.query(query, data, (err,INFO) => {
            
            if (err) {
                console.error("SQL Error:", err); 
                return res.status(500).send("Failed to register user : Probably  you did some mistake in the format");
            }
            res.status(200).send("Registered");
        });
    });
});

function fetchuser(Email,Password){
    const query="SELECT * FROM DRIVERPERSONALINFO WHERE email=? OR Password=?";
    return new Promise((resolve,reject)=>{
       con.query(query,[Email,Password],(err,info)=>{
           if(info.length>0){
               // console.log(info);
               if(err) reject(err);
            resolve(info);
                
            }
        });
    })
}
function fetchuserByID(ID){
    const query="SELECT * FROM DRIVERPERSONALINFO WHERE ID=?";
    return new Promise((resolve,reject)=>{
       con.query(query,[ID],(err,info)=>{
           if(info.length>0){
               // console.log(info);
               if(err) reject(err);
            resolve(info);
                
            }
        });
    })
}
  


app.post("/login",async (req,res)=>{
    const {Email,Password}=req.body;
    
    let UserData;
  await fetchuser(Email,Password).then(Data=>{
      UserData=Data;
  }).catch((err)=>{
    res.status(500).send("Network Error");
  })



    if(!bcrypt.compareSync(Password,UserData[0].Password) || Email!=UserData[0].email){
    return res.status(401).send("Invaid Credentials");
    }
    const token=jwt.sign(
        {UserID:UserData[0].ID},
       `${process.env.SECRET_KEY}`,
        {
            expiresIn:"1w"
        }
    );
    return res.status(200).cookie("Acces-Token",token,{
        httpOnly:true,
        secure:true,
        maxAge:7 * 24 * 60 * 60 * 1000
    }).send("TokenGenerated")
  

});

app.get("/authentication",async (req,res)=>{
  const token=req.cookies["Acces-Token"];

  
  let UserID;
  jwt.verify(token,`${process.env.SECRET_KEY}`,(err,data)=>{
    if(err)return res.status(401).send("Unable to Verify Token");
    UserID=data.UserID;
  });
  await fetchuserByID(UserID).then(Data=>{
    
      return res.status(200).json({Name:Data[0].FullName,ID:UserID});
  }).catch(err=>{
   return res.status(500).send("error");
  })

})

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});

app.get("/logout",(req,res)=>{
   res.clearCookie("Acces-Token",{path:"/"});
   res.status(200).send("LoggedOut");
});

app.get("/customerData", (req, res) => {
    const {
        Name,
        PickupLocation,
        Destination,
        PickupTime,
        VehicleType,
        FareEstimate,
        pickupcoordinateslongitude,
        pickupcoordinateslatitude,
        destinationcoordinateslongitude,
        destinationcoordinateslatitude
    } = req.query;

    // Validate required coordinates
    if (!pickupcoordinateslongitude || !pickupcoordinateslatitude) {
        console.error("Error: Missing pickup coordinates");
        return res.status(400).send("Can't get your location");
    }

    // MySQL-compatible syntax without ST_SetSRID
    const customerLocation = `POINT(${pickupcoordinateslongitude} ${pickupcoordinateslatitude})`;
    
    // Prepare SQL query with parameterized input
    const query = `
        SELECT *,
               ST_Distance_Sphere(location, ST_GeomFromText(?, 4326)) AS distance
        FROM DRIVERPERSONALINFO
        WHERE STATUS = 'ONLINE' and VehicleType= ?
        ORDER BY distance
        LIMIT 5;
    `;

    // Use parameterized input for the point text
    con.query(query, [customerLocation,VehicleType], (err, result) => {
        if (err) {
            console.error("SQL Execution Error:", err); // Log full error object
            return res.status(500).json({ error: "An error occurred while fetching driver data.", details: err.message });
        }

        if (result.length > 0) {
            console.log("ok");
            console.log(result);
            
            return res.send(result);
        } else {
            return res.status(404).json({ message: "No drivers found nearby." });
        }
    });
});

    