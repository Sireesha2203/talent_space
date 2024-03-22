const exp=require("express")

const app=exp() 

app.use(exp.json())

require('dotenv').config()
//assign port numnrt
const port=process.env.PORT||5000;
app.listen(port, () => console.log("server listening on port 5000..."));
const path=require("path")

//connect react build
app.use(exp.static(path.join(__dirname,'./build')))


//for validating CORS policy
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//connect user api
const userApp=require("./APIs/userAPI")
app.use("/user-api",userApp)
//connect user api
const resumeApp=require("./APIs/resumeAPI")
app.use("/resume-api",userApp)

//connect to mongoclient
const mclient=require('mongodb').MongoClient

mclient
  .connect(
    `${process.env.MONGO_URL}`
  )
  .then((dbRef) => {
    const dbObj = dbRef.db("talent_space");
    const userCollectionObj = dbObj.collection("userCollection");
    app.set("userCollectionObj", userCollectionObj);
    console.log("Connection to Talent-Space DB - Success");
  })
  .catch((err) => console.log("Connection to Faculty-Portal DB - Failed"));


//middleware to deal with page refresh
const pageRefresh=(request,response,next)=>{
response.sendFile(path.join(__dirname,'./build/index.html'))
}
app.use("*",pageRefresh)


//create a middleware to handle invalid path
const invalidPathHandlingMiddleware = (request, response, next) => {
response.send({ message: "Invalid path" });
};

app.use(invalidPathHandlingMiddleware);

//create err handling middleware
const errHandler = (error, request, response, next) => {
response.send({ "error-message": error.message });
};
app.use(errHandler);