
require('dotenv').config()


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');




//routes
const FinancialRoute = require('./routes/financial_routes');
const JobHireRoute = require('./routes/jobHire_routes')
const JobFindRoute = require('./routes/jobFind_routes');
const EventRoute = require('./routes/event_routes');
const EventUser = require('./routes/event_regiter_routes')
const RegisterUsers = require('./routes/register_routes');
// const userRoutes = require('./models/use')
const Donations = require('./routes/donate_routes');
const adDonation = require('./routes/adsDonate_routes');
const authRoutes=require('./routes/auth_routes')
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/auth');


const app = express();

// middleware

app.use(cookieParser());
app.use(express.json());


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})



app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-Cookie', 'newUser=true');
  
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

  res.send('you got the cookies!');

});

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);

});

// mongoose.connect('mongodb+srv://isuru:1234@mernbookstore.a7dhtbg.mongodb.net/No_Poverty?retryWrites=true&w=majority', { useNewUrlParser: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));



// // app.use(errorHandler);


app.use('/financial', FinancialRoute);
app.use('/jobHire', JobHireRoute);
app.use('/jobFind', JobFindRoute);
app.use('/event', EventRoute);
app.use('/event-registration', EventUser);
app.use('/regiUser', RegisterUsers);
app.use('/donation',Donations);
app.use('/adDonations',adDonation);
app.use("/auth",authRoutes);
app.use('/',requireAuth);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })


