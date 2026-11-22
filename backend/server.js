const express = require("express");
const mongoose = require("mongoose");
const Contact = require("./models/Contact");
const cors = require('cors');
require("dotenv").config();

const port = 3000
const app = express();

const allowedOrigins = [
  "https://maryam-portfolio-website.vercel.app",
  "http://localhost:3000",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });



app.get('/', (req, res) => {
  res.send('Welcome to our Contact Form API!')
})

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: "Your message has been sent successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        });
    }
});

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})

module.exports = app;


// const express = require("express");
// const mongoose = require("mongoose");
// const Contact = require("./models/Contact");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// const allowedOrigins = [
//   "https://maryam-portfolio-website.vercel.app",
//   "http://localhost:3000",
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }

//     return callback(new Error("Not allowed by CORS"));
//   },
//   methods: ["GET", "POST", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((error) => console.error("MongoDB connection error:", error));

// app.get("/", (req, res) => {
//   res.send("Welcome to our Contact Form API!");
// });

// app.post("/api/contact", async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;

//     const newContact = new Contact({
//       name,
//       email,
//       subject,
//       message,
//     });

//     await newContact.save();

//     return res.status(201).json({
//       success: true,
//       message: "Your message has been sent successfully.",
//     });

//   } catch (error) {
//     console.error("Contact submission error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong. Please try again.",
//     });
//   }
// });

// IMPORTANT: Export app for Vercel
// module.exports = app;