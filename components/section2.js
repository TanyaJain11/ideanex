import { useEffect, useState } from 'react';
import Link from 'next/link';

import Author from './_child/author';
import axios from 'axios';
import Spinner from './_child/spinner';
import Error from './_child/error';

export default function Section2() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/popular');
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-4xl py-12 text-center">Latest Posts</h1>

      {/* grid columns */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {data.map((value, index) => (
          <Post data={value} key={index} />
        ))}
      </div>
    </section>
  );
}

function Post({ data }) {
  const { _id, title, category, description, image, published, author } = data;
  return (
    <div className="item">
      <div className="imgs">
        <Link href={`/posts/${_id}`}>
          <img src={image || '/'} className="rounded" width={500} height={350} />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link href={`/posts/${_id}`} className="text-orange-600 hover:text-orange-800">
            {category || 'Unknown'}
          </Link>
          <Link href={`/posts/${_id}`} className="text-gray-800 hover:text-gray-600">
            - {published || 'Unknown'}
          </Link>
        </div>
        <div className="title">
          <Link href={`/posts/${_id}`} className="text-xl font-bold text-gray-800 hover:text-gray-600">
            {title || 'Title'}
          </Link>
        </div>
        <p className="text-gray-500 py-3">{description || 'Unknown'}</p>
        {author ? <Author {...author} /> : <></>}
      </div>
    </div>
  );
}
