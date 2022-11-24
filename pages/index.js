import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';


const DUMMY_MEETUPS = [
    {
        id: "m1", 
        image: "https://a.cdn-hotels.com/gdcs/production139/d1349/5824d77a-2c97-4ddb-8999-2a4705e0e434.jpg?impolicy=fcrop&w=800&h=533&q=medium", 
        title: "A Firtst Meetup", 
        address: "1234 34th ave, Clearwater, FL 33702"
    },
    {
        id: "m2", 
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Florida-Clearwater-Beach.jpg", 
        title: "A Second Meetup", 
        address: "1234 34th ave, Saint Petersburg, FL 33701"
    },
    {
        id: "m3", 
        image: "https://media.cntraveler.com/photos/601b10219d4d66f32970a192/16:9/w_2560%2Cc_limit/1097988940", 
        title: "A Third Meetup", 
        address: "1234 34th ave, Tampa, FL 33703"
    },
];

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

    return {
        props:{
            meetups: DUMMY_MEETUPS
        },
        revalidate: 10
    }; // Always need to return an object
};


export default HomePage;