const express=require('express');
const mongoose=require('mongoose');
const { MONGO_USER, MONGO_PASSWORD,REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const session = require("express-session");
const cors=require("cors");
let RedisStore = require("connect-redis")(session)
// const { createClient } = require("redis")
// let redisClient = createClient({ 
//     host:REDIS_URL,
//     port:REDIS_PORT,
//     legacyMode: true
//  })
 const { createClient } = require("redis")
 console.log(REDIS_URL)
 let redisClient = createClient({ 
    socket: {
        port: REDIS_PORT,
        host: REDIS_URL
    },
    legacyMode: true 
})
 redisClient.connect()
            .then(()=>{console.log("connected to redis")})
            .catch((e)=>{console.log("failed redis");console.log(e)});

const postRouter=require("./routes/postroutes")
const userRouter=require("./routes/userroutes")
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongodb:27017/mydb?directConnection=true&authSource=admin&retryWrites=true`,{useUnifiedTopology:true,useNewUrlParser:true}
                ).then((s)=>{console.log("Connected to DB")})
                . catch(err=>{console.log(err);console.log("Failed to connect to Mongo")})

console.log("Hello")
const app=express();
const port=process.env.PORT || 3000;
app.use(express.json());
app.enable("trust-proxy");
app.use(cors({}));
app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: "SESSION_SECRET",
      cookie:{
        secure:false,
        resave:false,
        saveUinitialized:false,
        httpOnly:true,
        maxAge:180000
      }
    })
  )
app.get('/', (req, res)=>{
    res.send("Hello There!!!");
})
app.use('/posts',postRouter);
app.use('/user',userRouter);
app.listen(port,()=>{console.log("Listening on port " + port)});
