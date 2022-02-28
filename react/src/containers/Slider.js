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
    // const timelinePosts = allPosts.filter(d => d.acf.add_to_timeline)
    const [timelinePosts, setTimelinePosts] = useState([])  // posts in the timeline
    const [displayPosts, setDisplayPosts] = useState([])  // posts displaying
    const [timelineCats, setTimelineCats] = useState([])  // cats {id, name} in the timeline
    const [displayCatIds, setDisplayCatIds] = useState([])  // ids of cats displaying
    const [[activeIdx, dir], setActiveState] = useState([0, -1])
    const transitions = useTransition(displayPosts[activeIdx], {
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
    
    // idenfity posts and cats recorded in the timeline
    // set display cats to all cats in the timeline
    useEffect(() => {
        // set timeline posts
        let newTimelinePosts = allPosts.filter(d => d.acf.add_to_timeline)
        setTimelinePosts(newTimelinePosts)

        // identify timeline cats
        let newTimelineCatIds = new Set()
        newTimelinePosts.forEach(p => {
            p.categories.forEach(tagIdx => newTimelineCatIds.add(tagIdx))
        })
        newTimelineCatIds = Array.from(newTimelineCatIds)
        
        // set timeline & display cats
        let newTimelineCats = newTimelineCatIds.map(tagIdx => allCats.filter(tag => tag.id === tagIdx)[0])
        setTimelineCats(newTimelineCats)
        setDisplayCatIds(newTimelineCatIds)
    }, [allPosts, allCats])


    // set display posts according to display cats
    useEffect(() => {
        const shouldDisplayPost = (p) => intersectNums(p.categories, displayCatIds) > 0
        setDisplayPosts(timelinePosts.filter(p => shouldDisplayPost(p)))
        switchToSlide(0)()
    }, [timelinePosts, displayCatIds])
    

    const timer = useRef(null)
    useEffect(() => {
        clearTimeout(timer.current)
        timer.current = setTimeout(switchToSlide((activeIdx + 1) % displayPosts.length), 50000)
        return () => clearTimeout(timer.current)
    }, [activeIdx, displayPosts])

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
        height: 120vh;
        width: 100vw;
    `

    return (
        <div css={mainCSS}>
            <div css={TopBarCSS}>
                <Timeline displayPosts={displayPosts} activeIdx={activeIdx} switchToSlide={switchToSlide}/>
                <CatDropdown setDisplayCatIds={setDisplayCatIds} timelineCats={timelineCats}/>
            </div>

            <div css={SliderCSS}>
                {transitions((style, post) => (
                    <Slide post={post} style={style} />
                ))}
                {/* <Arrow direction="left" handleClick={prevSlide}/>
                <Arrow direction="right" handleClick={nextSlide}/> */}
                <Related allPosts={allPosts} displayPosts={displayPosts} activeIdx={activeIdx}/>
            </div>
        </div>
    )
}

export default Slider
