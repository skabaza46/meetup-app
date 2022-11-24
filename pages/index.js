import { useEffect, useState } from 'react';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const urlDb = "mongodb+srv://skabaza46:IYKdFRflUesKaY9h@cluster0.xf2g1pw.mongodb.net/meetups?retryWrites=true&w=majority";

const HomePage = (props) => {


    return (<MeetupList meetups={props.meetups} />
        
    );
};

// Will always run on the sider side even after deployme
// It wil never run on the client side
// export const getServerSideProps = (context) => {
//     const req = context.req;
//     const res = context.res;


//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// };

// Executed during the build process,
// removes data fetching from the client side
export const getStaticProps = async () => {
    // fetch data from an API or database

    const client = await MongoClient.connect(urlDb);
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    
    // Gets all data within the collection
    const meetups = await meetupCollection.find().toArray();
    client.close();

    return {
        props:{
            meetups: meetups.map(meetup => (
                {
                    title: meetup.title,
                    address: meetup.address,
                    image: meetup.image,
                    description: meetup.description,
                    id: meetup._id.toString()
                }
            )),
        },
        revalidate: 10
    }; // Always need to return an object
};


export default HomePage;