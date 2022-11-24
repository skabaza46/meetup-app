import { MongoClient } from 'mongodb';

// Define functions that runs server side code,
// never shown to client
// api/new-meetup
// POST /api/new-meetup 

const handler  = async (req, res) => {

    if (req.method === "POST"){
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://skabaza46:#i1ImBAM12!T@cluster0.hpwxse6.mongodb.net/meetups?retryWrites=true&w=majority');

        const db = client.db();

        const meetupCollection = db.collection('meetups');

        const result = await meetupCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: "Meetup inserted!"});

    }
};


export default handler;