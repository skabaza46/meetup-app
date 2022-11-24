import MeetupDetail from "../../components/meetups/MeetupDetail";

// import { useRouter } from "next/router";

const MeetupDetails = (props) => {

    // const history = useRouter();

    // const meedupId = history.query.meedupId;
    // console.log(meedupId);

    return (
    <MeetupDetail 
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
    />
    );
};


export const getStaticPaths = async () =>{

    return {
        fallback: false,
        paths: [
            {
                params: {
                     meedupId: 'm1'
            } 
        },
        {
            params: {
                 meedupId: 'm2'
        } 
    }
     ],
    }
};


export const getStaticProps = async(context) => {
    const meetupId = context.params.meedupId;
    console.log(meetupId);

    return {
        props: {
            meetupData: {
                id: meetupId,
                image:"https://a.cdn-hotels.com/gdcs/production139/d1349/5824d77a-2c97-4ddb-8999-2a4705e0e434.jpg?impolicy=fcrop&w=800&h=533&q=medium",
                title:"A First Meetup !",
                address:"1234 23rd ave n, Clearwater FL 33703",
                description:"This is a first meetup",
            }
        }
    }
}


export default MeetupDetails;