/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { css } from '@emotion/react'
import { animated, useSpring } from 'react-spring'

import TimelineItem from '../components/TimelineItem'
import Arrow from '../components/Arrow'

const dotWidth = 25
const lineWidth = 50
const margin = 5
const offset = 9

const Timeline = ({posts, activeIdx, switchToSlide}) => {
    const [scrollIdx, setScrollIdx] = useState(0)
    const TimelineBoxCSS = css`
        position: relative;
        width: 70%;
        height: 10vh;
        margin-top: 1vh;
        margin-bottom: 1vh;
    `
    const TimelineContentCSS = css`
        display: flex;
        width: 80%;
        height: 100%;
        padding-top: 2.5vh;
        margin-left: 10%;
        white-space: nowrap;
        overflow-x: hidden;
    `
    const { scroll } = useSpring({
        scroll: scrollIdx * (dotWidth + lineWidth + margin),
        config: {duration: 500}
    })
    const arrowHandleClick = (dir) => () => {
        setScrollIdx(dir === 1 ? Math.min(scrollIdx+offset, posts.length-1) : Math.max(scrollIdx-offset, 0))
    }
    return (
        <div css={TimelineBoxCSS}>
            <animated.div scrollLeft={scroll} css={TimelineContentCSS}>
                {posts.map((post, i) => <TimelineItem key={i} idx={i} post={post}
                                                   isActive={i === activeIdx} 
                                                   dotWidth={dotWidth}
                                                   lineWidth={lineWidth}
                                                   margin={margin}
                                                   onClick={switchToSlide(i)}/>)}
            </animated.div>
            <Arrow direction="left" handleClick={arrowHandleClick(-1)}/>
            <Arrow direction="right" handleClick={arrowHandleClick(1)}/>
        </div>
    )
}

export default Timeline
