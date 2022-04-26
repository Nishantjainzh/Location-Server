const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/user'); 
const Address = require('./models/address');
const port = 3300;
const db_connection = require('./DB/connection');
const userRouter = express.Router();

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())
app.get('/', (req, res)=>{
    //res.send('get request');
    res.json({ message : "Api working here!!"})
});

app.use('/api/user', userRouter);

// Create the user and address data in DB
userRouter.post('/post', (req, res)=>{
    const user  =  req.body;
   // console.log(user);
    if(Object.keys(user) == 0)
    {
    return res.status(400).json({ message: "Bad Request. "})
    }
    User.create(user).then(()=>{
        res.status(201).json({ userInfo : user});
    })
    
})
// Get thte address on behalf of filter (District)
userRouter.get('/getAddress/:key',async (req, res)=>{
    console.log(req.params.key);
   const addressData =  await Address.find({
        "$or":[
        { city: { $regex: req.params.key}}
            ]
        })
        res.status(200).send({ copResults: addressData})
    console.log(addressData);
})
// Add the address in the DB
userRouter.post('/address-add',async (req, res)=>{
    const addressList = req.body;
    const saveAddress = await Address.create(addressList).then(()=>{
        res.status(200).json(addressList); 
    });
    })

app.listen(port, ()=>{
    console.log('Application is running on PORT 3300');
});
