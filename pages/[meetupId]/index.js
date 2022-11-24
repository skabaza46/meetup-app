import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

const urlDb = "mongodb+srv://skabaza46:IYKdFRflUesKaY9h@cluster0.xf2g1pw.mongodb.net/meetups?retryWrites=true&w=majority";

const MeetupDetails = (props) => {

    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description}/>
            </Head>
            <MeetupDetail 
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
        
    );
};


export const getStaticPaths = async () =>{

    const client = await MongoClient.connect(urlDb);
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    
    // Gets all data within the collection
    const meetups = await meetupCollection.find({}, {_id:1}).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString()}
         }))
    }
};


export const getStaticProps = async (context) => {

    console.log(context)
    const { params } = context;
    const meetupId = params.meetupId;
    
    const client = await MongoClient.connect(urlDb);
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    // Gets only the data with the collection _id specified
    const meetup =  await meetupCollection.findOne({_id: ObjectId(meetupId)});
    client.close();
    

    return {
        props: {
            meetupData: {
                id: meetup._id.toString(),
                title: meetup.title,
                description: meetup.description,
                image: meetup.image,
                address: meetup.address
            }
        },
        revalidate:1,
    }
}


export default MeetupDetails;

