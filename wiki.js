const request = require('request')
const express=require('express')

const app=express();

app.get('/info',async(req,res)=>{


    //const place='Taj mahal'
    const place=   encodeURI(req.query.location);
  
    if(!req.query.location){
        return res.send({
            error:'You must provide address to use the app'
        })
    }


    const url='https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&generator=search&gsrsearch='+place+'&exlimit=max&exintro&explaintext'//explaintext
    
    request({ url: url, json: true }, (error, response) => {

        if(error){
           return res.send({error:'Unable to connect to internet'})
        }
        if(!response.body.query){
            return res.send("Sorry! Currently no information available.")
        }
        //console.log(response.body);
        //console.log("=================================")


        var list = response.body.query.pages;

        var extract = list[Object.keys(list)[0]].extract;

        console.log(extract);
        res.send(extract);
    
    })


})


app.listen(process.env.PORT,()=>{
    console.log(" server is up!")
})