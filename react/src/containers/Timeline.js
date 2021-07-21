/** @jsxImportSource @emotion/react */
import React, {useState, useEffect} from 'react'
import { css } from '@emotion/react'
import axios from 'axios'

import SliderContent from '../components/SliderContent'
import Slide from '../components/Slide'
import Arrow from '../components/Arrow'
import Dots from '../components/Dots'

const Timeline = () => {
    const [loaded, setLoaded] = useState(false)
    const [posts, setPosts] = useState([])
    const [activeIdx, setActiveIdx] = useState(0)
    const slideWidth = 50;

    useEffect(() => {
        axios.get('/posts')
            .then(msg => {
                msg = msg.data.filter(d => d.acf.add_to_timeline)
                setPosts(msg)
                setLoaded(true)
            }).catch(err => {console.log(err)})
    }, [])

    const nextSlide = () => {
        let newIdx = activeIdx === posts.length-1 ? 0 : activeIdx + 1
        setActiveIdx(newIdx)
    }
    const prevSlide = () => {
        let newIdx = activeIdx === 0 ? posts.length-1 : activeIdx - 1
        setActiveIdx(newIdx)
    }

    return (
        <>
        {!loaded ? <p>loading...</p> :
            // The Slider
            <div css={SliderCSS}>
                <SliderContent activeIdx={activeIdx}
                            slideWidth={slideWidth}
                            totalWidth={slideWidth * posts.length}>
                    {posts.map((p, i) => <Slide key={i} post={p} />)}
                </SliderContent>
                <Arrow direction="left" handleClick={prevSlide}/>
                <Arrow direction="right" handleClick={nextSlide}/>
                <Dots posts={posts} activeIdx={activeIdx} setActiveIdx={setActiveIdx}/>
            </div>}
        </>
    )
}

const SliderCSS = css`
  position: relative;
  height: 70vh;
  width: 50vw;
  margin: 0 auto;
  overflow: hidden;
`

export default Timeline
