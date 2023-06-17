import {MongoClient} from "mongodb";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());


async function addrecord(req,res){
    const uri="mongodb://127.0.0.1:27017";//mongo address
    const client = new MongoClient(uri);//mongoclient

    const db=client.db("mydb");//db
    const messageColl = db.collection("message");//collection

    //from query param
    let inputDoc = {
       message:req.query.message || "default",
    };//data
    await messageColl.insertOne(inputDoc);//insert data

    await client.close();//close conn
    res.json({opr:"success"});//send to remote  
    console.log("Record Added");
}

app.get("/home",addrecord);

async function readRecord(req,res){

    const uri="mongodb://localhost:27017";
    const client = new MongoClient(uri);

    const db = client.db("mydb");
    let messageCol = db.collection("message");

    let list = await messageCol.find().toArray();

    await client.close();
    res.json(list);

}

app.get("/findAll",readRecord);

//to do api
async function addToDo(req,res){
    const uri="mongodb://127.0.0.1:27017";//mongo address
    const client = new MongoClient(uri);//mongoclient

    const db=client.db("myproject");//db
    const messageColl = db.collection("todo");//collection

    //from query param
    let inputDoc = {
       task: req.query.task ,
       desc: req.query.desc
    };//data
    await messageColl.insertOne(inputDoc);//insert data

    await client.close();//close conn
    res.json({opr:"success"});//send to remote  
    console.log("Record Added");
}

async function addUserRecord(req,res){
    const uri="mongodb://127.0.0.1:27017";//mongo address
    const client = new MongoClient(uri);//mongoclient

    const db=client.db("myproject");//db
    const messageColl = db.collection("user");//collection

    //from query param
   
    let inputDoc = {
       username: req.query.username ,
       password: req.query.password,
       email: req.query.email,
       mobile: req.query.mobile,
    };//data
    await messageColl.insertOne(inputDoc);//insert data

    await client.close();//close conn
    res.json({opr:"success"});//send to remote  
    console.log("Record Added");
}

app.get("/addtodo",addToDo);
app.get("/adduser",addUserRecord);

app.listen(4000,()=>{
    console.log("Server connected...")
})