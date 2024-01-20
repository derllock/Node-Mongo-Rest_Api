    const mongoose=require('mongoose');
module.exports=()=> {
    mongoose.connect(
        process.env.MONGODB_URI,
    {
        dbname:process.env.DB_NAME,
        user:process.env.DB_USER,
        pass:process.env.DB_PASS,
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
        /*.then(()=>{                                                       //promise this is second on connection
            console.log('mongodb connected yeah...')
        })*/
        .catch((error)=>{                                                  //gives connection error messages like ip not listed
            console.log(error.message)
        });
    mongoose.connection.on('connected',()=>{                                //this is executed first on connection
        console.log('Allright Mongoose connection established Yo');
    })
    mongoose.connection.on('error',(error)=>{
        console.log(error.message);
    })
    mongoose.connection.on('disconnected',()=>{
        console.log('Alas! Mongoose disconnected, See you next time');                              //this is executed first on SIGINT
    })
    process.on('SIGINT',()=>{
        mongoose.connection.close().then(()=>{                             // used .then() because callbacks not supported in latest version and it only works when the terminal is killed and new console/terminal is opened, confusing and I'm unable to understand on net
            console.log('Ctrl-C pressed, Mongoose is disconnected due to app termination');
            process.exit(0);
        });
    });


};