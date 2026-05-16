const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());  //cross-origin requests. CORS is middleware that allows frontend and backend from different origins to communicate.
app.use(express.json());

app.get('/',(req, res)=>{
  res.send('Home page of our taskflow webapp')
})

app.listen(5000,()=>{
  console.log('Server running on port 5000')
})