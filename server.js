import express from "express";
import fs from "fs"
import zlib, { createGzip } from "zlib";

const app=express()

fs.createReadStream("./sample.txt","utf-8").pipe(
    zlib.createGzip().pipe(
        fs.createWriteStream("./sample.zip")
        )
    )

app.get("/",(req,res)=>{

    // increases the memory usage of the server as the data first gets loaded on to the server and then it is served
    // fs.readFile("./sample.txt",(err,data)=>{
    //     res.end(data)
    // })

    // whereas if we serve the data in chunks as it is being loaded,the load on the server will decrease  
    // ,this is called streaming the data

    const stream=fs.createReadStream("./sample.txt","utf-8");
    stream.on('data',(chunk)=>{
        res.write(chunk)
    })
    stream.on('end',()=>{
        res.end()
    })

})


const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`connected to port ${PORT}`)
})
