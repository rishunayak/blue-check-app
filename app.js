const app=require('./src/index');


app.listen(2345,async()=>{
    try
    {
            console.log("Listening on port 2345");
    }
    catch(e)
    {
        console.log(e);
    }
});