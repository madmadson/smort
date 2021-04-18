
import Metatags from '@components/Metatags';

import { firestore, postToJSON } from '@lib/firebase';

import { useState } from 'react';

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps(context) {
  const adventuresQuery = firestore
    .collectionGroup('adventures')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const adventures = (await adventuresQuery.get()).docs.map(postToJSON);

  return {
    props: { adventures }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [adventures] = useState(props.adventures);



  return (
    <main>
      <Metatags title="Home Page" description="Get the latest posts on our site" />

      <div className="card card-info">
        <h2>🔥 AdventureList 🔥</h2>
  
      </div>

      L: {adventures.length}

    </main>
  );
}
