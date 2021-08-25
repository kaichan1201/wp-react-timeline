/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import {useTransition } from 'react-spring'

import Slide from '../components/Slide'
import Related from './Related'
import Timeline from './Timeline'

const Slider = ({allPosts}) => {
    const posts = allPosts.filter(d => d.acf.add_to_timeline)
    const [[activeIdx, dir], setActiveState] = useState([0, -1])
    const transitions = useTransition(posts[activeIdx], {
        from: {
            opacity: 0,
            transform: `translate3d(${dir === -1 ? 50 : -50}%,0,0) scale(0.5)`,
        },
        enter: {
            opacity: 1,
            transform: "translate3d(0%,0,0) scale(1)",
        },
        leave: {
            opacity: 0,
            transform: `translate3d(${dir === 1 ? 25 : -25}%,0,0) scale(0.5)`,
        },
        config: {friction: 17}
    })

    const nextSlide = () => {
        setActiveState([(activeIdx + 1) % posts.length, -1])
    }
    const prevSlide = () => {
        setActiveState([ (activeIdx - 1 + posts.length) % posts.length, 1])    
    }
    const switchToSlide = (idx) => () => setActiveState([idx, idx > activeIdx ? -1 : 1])

    // const timer = useRef(null)
    // useEffect(() => {
    //     clearTimeout(timer.current)
    //     timer.current = setTimeout(() => nextSlide(), 5000)
    //     return () => clearTimeout(timer.current)
    // }, [activeIdx, nextSlide])

    const mainCSS = css`
        display: flex;
        flex-direction: column;
        align-items: center;
    `
    const SliderCSS = css`
        position: relative;
        height: 70vh;
        width: 50vw;
    `

    return (
        <div css={mainCSS}>
            <div css={SliderCSS}>
                {transitions((style, post) => (
                    <Slide post={post} style={style} />
                ))}
                {/* <Arrow direction="left" handleClick={prevSlide}/>
                <Arrow direction="right" handleClick={nextSlide}/> */}
            </div>
            <Timeline posts={posts} activeIdx={activeIdx} switchToSlide={switchToSlide}/>
            <Related allPosts={allPosts} posts={posts} activeIdx={activeIdx}/>
        </div>
    )
}

export default Slider
