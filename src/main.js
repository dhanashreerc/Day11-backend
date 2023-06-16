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

app.listen(3000,()=>{
    console.log("Server connected...")
})