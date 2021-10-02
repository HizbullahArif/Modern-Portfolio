const mongoose = require('mongoose');
DATABASE_URL=process.env.DATABASE_URL

mongoose.connect(DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('Connected Sucessfully')
}).catch(err=>console.log("Connecting err "+err))