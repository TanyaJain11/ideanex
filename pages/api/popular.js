
// import data from './data'

// // api/popular
// export default function handler(req, res){
//     const { Popular } = data;

//     if(Popular) return res.status(200).json(Popular);
//     return res.status(404).json({ error : "Data Not Found"})
// }
// import { MongoClient } from 'mongodb';
// import dbConnect from '../../config/dbConnect';
import { MongoClient } from 'mongodb';
import dbConnect from '../../config/dbConnect';

export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    await dbConnect();
    const client = new MongoClient(process.env.DB_URI);
    await client.connect();
    const db = client.db('IdeaNex'); // Replace 'DB_NAME' with your actual database name

    // Access the "trendingBlogs" collection
    const collection = db.collection('blogs');

    // Fetch the trending posts
    const trendingPosts = await collection.find({}).toArray();

    // Close the MongoDB connection
    await client.close();

    // Return the trending posts as the API response
    const  data  = trendingPosts;
    // console.log(trendingPosts)
    if(data) return res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    res.status(500).json({ message: 'Error fetching trending posts' });
  }
}

// import data from './data'

// // api/popular
// export default function handler(req, res){
//     const { Popular } = data;

//     if(Popular) return res.status(200).json(Popular);
//     return res.status(404).json({ error : "Data Not Found"})
// }