const express=require("express");
const app=express();

var users=[{    
    name:'john',
    kidneys:[{
               healthy:true
               },{
               healthy:false
            }]
    }]

app.use(express.json());

app.get("/",function(req,res){
    let cnt=0;
    const ukid=users[0].kidneys;
    for(let i=0;i<ukid.length;i++){
        if(ukid[i].healthy) cnt++;
    }
const total=ukid.length;    
const cntt=ukid.length-cnt;
   res.json({"no of kidneys":total, "healthyKidneys": cnt, "unhealthyKidneys": cntt });

})


app.post("/",function(req,res){
    const ishealthy=req.body.ishealthy;
    users[0].kidneys.push({
        healthy:ishealthy
    })
    res.json({msg:"done"});
})

app.put("/",function(req,res){
    const cnt=badKidneys();
    if(cnt==0){
        res.status(411).json({        //user want put unhealthy kidneys to healthy when there is no unhealthy kidneys...
            msg:"bad status"
        });
    }
    else{
    const ukid=users[0].kidneys;
    for(let i=0;i<ukid.length;i++){
        users[0].kidneys[i].healthy=true;   
    }
    res.json({msg:"okay"});
}
});


app.delete("/",function(req,res){
    const cnt=users[0].kidneys.length;
    if(cnt==0){
        res.status(411).json({
            masg:"bad req"
        });
    }
    else{
    users[0].kidneys = [];//users[0].kidneys.filter(kidney => kidney.healthy==true);   //remove flase values and return true values.
    res.json({msg:"okay"});
    }
});

function badKidneys(){
    let cnt=0;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy) cnt++;
    }
    return cnt;
}
app.listen(3000,()=>{
    console.log("app listening..");
});
