import { MongoClient } from 'mongodb';

// Define functions that runs server side code,
// never shown to client
// api/new-meetup
// POST /api/new-meetup 

const urlDb = "mongodb+srv://skabaza46:IYKdFRflUesKaY9h@cluster0.xf2g1pw.mongodb.net/meetups?retryWrites=true&w=majority";

const handler  = async (req, res) => {

    if (req.method === "POST"){
        const data = req.body;

        const client = await MongoClient.connect(urlDb);

        const db = client.db();

        const meetupCollection = db.collection('meetups');

        const result = await meetupCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: "Meetup inserted!"});


    }
};


export default handler;

