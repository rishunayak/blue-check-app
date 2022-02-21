const app=require('./src/index');

const port=process.env.PORT || 2345;
app.listen(port,async()=>{
    try
    {
            console.log(`Listening on port ${port}`);
    }
    catch(e)
    {
        console.log(e);
    }
});