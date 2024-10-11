const express = require('express');
const connectDB = require('./config');
const userRoute = require('./routes/userRoute');
const cors = require('cors');

connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', userRoute);

const PORT =5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
