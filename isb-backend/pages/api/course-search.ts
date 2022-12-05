// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {MongoClient} from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import MiniCourse from "../../src/models/mini_course"

async function handler(
  req: NextApiRequest,
  res: NextApiResponse) {
  if (req.method === 'GET') {
    
    const reqData = req.body;
    const course_title:string = reqData.stringify;
    
    const client = await MongoClient.connect('mongodb+srv://ben-hep:QDS1WvgC8Ae7KGwf@isb-beta.qujthpg.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db("Courses");
    const coursesCollection = db.collection("Course Information");

    const data = await coursesCollection.findOne({course_title: course_title});
    console.log(data);
    res.json(data);
    client.close();


  };
}

export default handler;
