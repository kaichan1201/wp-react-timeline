/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { css } from '@emotion/react'
import { animated, useSpring } from 'react-spring'

import TimelineItem from '../components/TimelineItem'
import Arrow from '../components/Arrow'

const dotWidth = 30
const lineWidth = 70
const margin = 5

const Timeline = ({posts, activeIdx, switchToSlide}) => {
    const [scrollIdx, setScrollIdx] = useState(0)
    const TimelineBoxCSS = css`
        position: relative;
        width: 50%;
        height: 30%;
        margin-top: 1vh;
        margin-bottom: 1vh;
    `
    const TimelineContentCSS = css`
        display: flex;
        width: 70%;
        height: 100%;
        margin-left: 15%;
        white-space: nowrap;
        overflow-x: hidden;
    `
    const { scroll } = useSpring({
        scroll: scrollIdx * (dotWidth + lineWidth + margin),
        config: {duration: 500}
    })
    const arrowHandleClick = (dir) => () => {
        setScrollIdx(dir === 1 ? Math.min(scrollIdx+5, posts.length-1) : Math.max(scrollIdx-5, 0))
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
