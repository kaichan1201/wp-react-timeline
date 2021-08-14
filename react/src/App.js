import { useState, useEffect } from 'react';
import axios from 'axios'

import Slider from './containers/Slider';

function App() {
  const [loaded, setLoaded] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // axios.get('http://localhost:8000/wp-json/wp/v2/posts')
    axios.get('https://covidstory.tw/wp-json/wp/v2/posts')
        .then(msg => {
            msg = msg.data.filter(d => d.acf.add_to_timeline)
            msg.sort((a, b) => (new Date(a.acf.event_date) - new Date(b.acf.event_date)))
            setPosts(msg)
            setLoaded(true)
        }).catch(err => {console.log(err)})
  }, [])

  return (
    <>
    {!loaded ? <p>loading...</p> : <Slider posts={posts}/>}
    </>
  );
}

export default App;
