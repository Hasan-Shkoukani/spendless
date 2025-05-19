const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const planRoute = require('./routes/planGenerator');
const estimateRoute = require('./routes/plantoBudget'); 

app.use('/api/plan', planRoute);
app.use('/api/estimate', estimateRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
