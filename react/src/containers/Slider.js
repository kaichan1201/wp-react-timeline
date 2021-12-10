/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import {useTransition } from 'react-spring'

import Slide from '../components/Slide'
import Related from './Related'
import Timeline from './Timeline'
import { intersectNums } from '../utils'
import CatDropdown from '../components/CatDropdown'

const Slider = ({allPosts, allCats}) => {
    // const posts = allPosts.filter(d => d.acf.add_to_timeline)
    const [posts, setPosts] = useState([])
    const [timelineCats, setTimelineCats] = useState([])
    const [cats, setCats] = useState([])
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

    const switchToSlide = (idx) => () => setActiveState([idx, idx > activeIdx ? -1 : 1])

    useEffect(() => {
        switchToSlide(0)()
        if (cats.length === 0) {
            let newPosts = allPosts.filter(d => d.acf.add_to_timeline)
            setPosts(newPosts)
            let newTimelineCatsIdxs = new Set()
            newPosts.forEach(p => {
                p.categories.forEach(tagIdx => newTimelineCatsIdxs.add(tagIdx))
            })
            
            let newTimelineCats = Array.from(newTimelineCatsIdxs).map(tagIdx => allCats.filter(tag => tag.id === tagIdx)[0])
            setTimelineCats(newTimelineCats)
        }
        else {
            setPosts(allPosts.filter(d => d.acf.add_to_timeline && 
                intersectNums(d.categories, cats) > 0))
            }
    }, [allPosts, cats, allCats])

    const timer = useRef(null)
    useEffect(() => {
        clearTimeout(timer.current)
        timer.current = setTimeout(switchToSlide((activeIdx + 1) % posts.length), 50000)
        return () => clearTimeout(timer.current)
    }, [activeIdx, posts])

    const mainCSS = css`
        display: flex;
        flex-direction: column;
        align-items: center;
    `
    const TopBarCSS = css`
        display: flex;
        flex-direction: row;
        width: 100vw;
        height: 12vh;
    `
    const SliderCSS = css`
        position: relative;
        height: 88vh;
        width: 100vw;
    `

    return (
        <div css={mainCSS}>
            <div css={TopBarCSS}>
                <Timeline posts={posts} setCats={setCats} activeIdx={activeIdx} switchToSlide={switchToSlide}/>
                <CatDropdown setCats={setCats} timelineCats={timelineCats}/>
            </div>

            <div css={SliderCSS}>
                {transitions((style, post) => (
                    <Slide post={post} style={style} />
                ))}
                {/* <Arrow direction="left" handleClick={prevSlide}/>
                <Arrow direction="right" handleClick={nextSlide}/> */}
                <Related allPosts={allPosts} posts={posts} activeIdx={activeIdx}/>
            </div>
        </div>
    )
}

export default Slider
