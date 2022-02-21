window.addEventListener("load",()=>{
  
        let btn=document.getElementById("submit");
        btn.addEventListener("click",()=>{
            authenticate();
        })
      
});

async function authenticate()
{
    try
    {
        var res=await fetch("http://localhost:2345/login",{
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:document.getElementById("email").value,
                password:document.getElementById("password").value,
            }),
        })
        console.log(res);
    if(res.status==200)
    {
        window.location.href="/upload";
    }
    else
    {
        alert("Invalid email id or password");
    }
    
    }
    catch(e)
    {
        console.log(e);
    }   
    
}