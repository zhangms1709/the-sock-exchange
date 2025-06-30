// console.log('Hello, world!');
// console.log('Developing in the dev branch.');
// console.log('This change is in the main branch.');
// console.log('Another change in the dev branch.');
import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
const PORT = 3000;
app.use(cors());
// // Endpoint to read and send JSON file content
// app.get('/socks', async (_req, res) => {
//     try {
//         const data = await fs.readFile('../data/socks.json', 'utf8');
//         const jsonObj = JSON.parse(data);
//         res.json(jsonObj);
//     } catch (err) {
//         console.error("Error:", err);
//         res.status(500).send("Hmmm, something smells... No socks for you! ☹");
//     }
// });
app.get('/socks', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find({}).toArray();
        res.json(socks);
        // Console log the entire request object
        // console.log(req);
        // // Console log specific parts of the request
        // console.log("Headers:", req.headers);
        // console.log("URL:", req.url);
        // console.log("Method:", req.method);
        // console.log("Query parameters:", req.query);
        // const data = await fs.readFile('../data/socks.json', 'utf8');
        // const jsonObj = JSON.parse(data);
        res.json(jsonObj);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/socks/:color', async (req, res) => {
    try {
        const requestedColor = req.params.color.toLowerCase();

        const data = await fs.readFile('../data/socks.json', 'utf8');
        const jsonObj = JSON.parse(data);

        // Filter socks by color
        const matchingSocks = jsonObj.filter(sock =>
            sock.color && sock.color.toLowerCase() === requestedColor
        );

        if (matchingSocks.length === 0) {
            return res.status(404).send(`No socks found with color: ${requestedColor}`);
        }

        res.json(matchingSocks);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong fetching colored socks!");
    }
});
// Middleware to parse JSON bodies
app.use(express.json());
app.post('/socks/search', async (req, res) => {
    try {
        // TODO: Add code that can search MongoDB based on a color value
        // from the Search text box.
        const { searchTerm } = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const regex = new RegExp(searchTerm, "i"); // Create a case-insensitive regular expression
        const socks = await collection
            .find({ "sockDetails.color": regex })
            .toArray();
        res.json(socks);
        // console.log(socks)
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error searching for socks');
    }
});
app.post('/user', async (req, res) => {
    try {
        // Obligatory reference to POST Malone
        console.log("If POST Malone were a sock, he'd be the one with the most colorful pattern.");
        // Simulate creating a user
        const { username, email } = req.body;
        if (!username || !email) {
            // Bad request if username or email is missing
            return res.status(400).send({
                error: 'Username and email are required.'
            });
        }
        // Respond with the created user information and a 201 Created status
        res.status(201).send({
            status: 'success',
            location: 'http://localhost:3000/users/1234', // This URL should point to the newly created user
            message: 'User created successfully.'
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.post('/socks', async (req, res) => {
    try {
        // TODO: Add code that adds a sock when a new sock is posted using the
        // Add Sock form.
        const sock = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(sock);
        res.status(201).json({
            message: 'Sock added successfully',
            sockId: result.insertedId
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error adding sock');
    }
});
// app.delete('/socks/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log('Deleting sock with ID:', id);
//         res.status(200).send('Sock deleted successfully');
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
//     }
// });
app.delete("/socks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting sock with ID:", id);
        res.status(200).send("Sock deleted successfully");
    } catch (err) {
        console.error("Error:", err);
        res
            .status(500)
            .send("Hmm, something doesn't smell right... Error deleting sock");
    }
});
app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        console.log('Updating email for user with ID:', id);
        res.status(200).send({
            status: 'success',
            data: email, // This URL should point to the newly created user
            message: 'User updated successfully.'
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
