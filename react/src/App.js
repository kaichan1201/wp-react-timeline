import { useState, useEffect } from 'react';

import Slider from './containers/Slider';
import { axiosGetAllPages, getDateFormat } from './utils';

function App() {
  const [loaded, setLoaded] = useState(false)
  const [posts, setPosts] = useState([])
  const [allCats, setAllCats] = useState([])

  useEffect(() => {
    axiosGetAllPages('https://covidstory.tw/wp-json/wp/v2/posts/')
        .then(data => {
            data.sort((a, b) => (new Date(getDateFormat(a.acf.event_date)) - new Date(getDateFormat(b.acf.event_date))))
            setPosts(data)
            setLoaded(true)
        }).catch(err => {console.log(err)})

    axiosGetAllPages('https://covidstory.tw/wp-json/wp/v2/categories/')
        .then(data => {
            const newAllCats = []
            data.forEach(d => {
                newAllCats.push({
                  "id": d.id,
                  "name": d.name
                })
            })
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
