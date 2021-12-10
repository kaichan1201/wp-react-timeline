import { useState, useEffect } from 'react';
import axios from 'axios'

import Slider from './containers/Slider';

function App() {
  const [loaded, setLoaded] = useState(false)
  const [posts, setPosts] = useState([])
  const [allCats, setAllCats] = useState([])

  useEffect(() => {
    // axios.get('http://localhost:8000/wp-json/wp/v2/posts')
    axios.get('https://covidstory.tw/wp-json/wp/v2/posts/?per_page=100')
        .then(msg => {
            // msg = msg.data.filter(d => d.acf.add_to_timeline)
            msg = msg.data
            msg.sort((a, b) => (new Date(a.acf.event_date) - new Date(b.acf.event_date)))
            setPosts(msg)
            setLoaded(true)
        }).catch(err => {console.log(err)})

    axios.get('https://covidstory.tw/wp-json/wp/v2/categories/?per_page=100')
        .then(msg => {
            msg = msg.data
            const newAllCats = []
            msg.forEach(d => {
                newAllCats.push({
                  "id": d.id,
                  "name": d.name
                })
            })
            console.log(newAllCats)
            setAllCats(newAllCats)
        }).catch(err => {console.log(err)})
  }, [])

  return (
    <>
    {!loaded ? <p>loading...</p> : <Slider allPosts={posts} allCats={allCats}/>}
    </>
  );
}

export default App;
