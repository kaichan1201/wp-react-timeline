/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import {useSpringRef, useTransition } from 'react-spring'
import axios from 'axios'

import Arrow from '../components/Arrow'
import Slide from '../components/Slide'

const Slider = () => {
    const [loaded, setLoaded] = useState(false)
    const [posts, setPosts] = useState([])
    const [[activeIdx, dir], setActiveState] = useState([0, -1])
    const transRef = useSpringRef()

    const transitions = useTransition(activeIdx, {
        ref: transRef,
        from: {
            opacity: 0,
            transform: `translate3d(${dir === -1 ? 100 : -100}%,0,0) scale(0.5)`,
        },
        enter: {
            opacity: 1,
            transform: "translate3d(0%,0,0) scale(1)",
        },
        leave: {
            opacity: 0,
            transform: `translate3d(${dir === 1 ? 50 : -50}%,0,0) scale(0.5)`,
        }
    })
    useEffect(() => {
        transRef.start()
    }, [transRef, activeIdx])

    useEffect(() => {
        axios.get('http://localhost:8000/wp-json/wp/v2/posts')
        // axios.get('https://covidstory.tw/wp-json/wp/v2/posts')
            .then(msg => {
                msg = msg.data.filter(d => d.acf.add_to_timeline)
                setPosts(msg)
                setLoaded(true)
            }).catch(err => {console.log(err)})
    }, [])

    const nextSlide = () => {
        setActiveState([(activeIdx + 1) % posts.length, -1])
    }
    const prevSlide = () => {
        setActiveState([ (activeIdx - 1 + posts.length) % posts.length, 1])    
    }

    const SliderCSS = css`
        position: relative;
        left: 25%;
        height: 70vh;
        width: 50vw;
    `

    return (
        <>
        {!loaded ? <p>loading...</p> :
            <div>
                <div css={SliderCSS}>
                    {transitions((style, i) => (
                        <Slide post={posts[i]} style={style} />
                    ))}
                    <Arrow direction="left" handleClick={prevSlide}/>
                    <Arrow direction="right" handleClick={nextSlide}/>
                </div>
            </div>}
        </>
    )
}

export default Slider
