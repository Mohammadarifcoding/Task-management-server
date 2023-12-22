const express = require('express')
const app = express()
const port = 3000
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')



app.use(cors())
app.use(express.json())


// TaskFlow
// ZHkB5dj64LnHx5MD



const uri = "mongodb+srv://TaskFlow:ZHkB5dj64LnHx5MD@cluster0.pdvgnv8.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const Tasks = client.db('TaskFlow').collection('Tasks')
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    app.get('/tasks/:email',async(req,res)=>{
        const email = req.params.email
        const query = {email : email}
        const result = await Tasks.find(query).toArray()
        res.send(result)       
    })


    app.post('/addtasks',async(req,res)=>{
      console.log(req.body)
    
      const body = req.body 
      const result = await Tasks.insertOne(body)
      res.send(result)   

  })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})