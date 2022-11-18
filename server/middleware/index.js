const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
    "mongodb+srv://ben-hep:QDS1WvgC8Ae7KGwf@isb-beta.qujthpg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db('Courses');
        const courses = database.collection('Course Information');

        // Query for a movie that has the title 'Back to the Future'
        const query = { course_id: 'comp-202' };
        const course = await courses.findOne(query);

        console.log(course);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);