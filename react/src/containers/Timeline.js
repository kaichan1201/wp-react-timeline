/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import TimelineItem from '../components/TimelineItem'
import { animated, useSpring } from 'react-spring'

const dotWidth = 25
const lineWidth = 150
const margin = 5

const Timeline = ({posts, activeIdx, switchToSlide}) => {

    const TimelineBoxCSS = css`
        position: relative;
        width: 50%;
        height: 30%;
        margin-top: 1vh;
        margin-bottom: 1vh;
    `
    const TimelineContentCSS = css`
        display: flex;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
    `
    const { scroll } = useSpring({
        scroll: activeIdx === 0 ? 0 : (activeIdx - 0.5) * (dotWidth + lineWidth + 2*margin),
        from: {scroll: 0},
        config: {duratin: 200}
    })
    return (
        <div css={TimelineBoxCSS}>
            <animated.div scrollLeft={scroll} css={TimelineContentCSS}>
                {posts.map((_, i) => <TimelineItem key={i} idx={i}
                                                   isActive={i === activeIdx} 
                                                   dotWidth={dotWidth}
                                                   lineWidth={lineWidth}
                                                   margin={margin}
                                                   onClick={switchToSlide(i)}/>)}
            </animated.div>
        </div>
    )
}

export default Timeline
