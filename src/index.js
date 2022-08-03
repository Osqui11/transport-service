const express = require('express');
const app = express();

// settings
app.set('port', process.env.PORT || 3003);

// middlewares
app.use(express.json());

const userRouter = require('./routes/transportUnity.js')
app.use("/api", userRouter)

// Startin server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});