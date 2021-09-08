/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { animated, useSpring } from 'react-spring'

import TimelineItem from '../components/TimelineItem'
import Arrow from '../components/Arrow'

const dotWidth = 25
const lineWidth = 50
const margin = 5
const offset = 9

const Timeline = ({posts, activeIdx, switchToSlide}) => {
    const MainBoxCSS = css`
        position: relative;
        width: 100%;
        height: 12vh;
        display: flex;
        flex-direction: row;
    `
    const MonthBoxCSS = css`
        position: relative;
        width: 20%;
        height: 100%;
        margin-top: 1vh;
        margin-bottom: 1vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
    `
    const MonthContentCSS = css`
        position: relative;
        width: 30%;
        height: 100%;
        top: 20%;
        font-size: 20px;
        text-align: center;
    `
    const TimelineBoxCSS = css`
        position: relative;
        width: 50%;
        height: 100%;
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
    const [monthIdx, setMonthIdx] = useState(0)
    const [scrollIdx, setScrollIdx] = useState(0)
    const { scroll } = useSpring({
        scroll: scrollIdx * (dotWidth + lineWidth + margin),
        config: {duration: 500}
    })
    const arrowHandleClick = (dir) => () => {
        setScrollIdx(dir === 1 ? Math.min(scrollIdx+offset, posts.length-1) : Math.max(scrollIdx-offset, 0))
    }

    let months = [...new Set(posts.map(p => p.acf.event_date.slice(0, -3)))]
    let monthFirstIdxs = []
    let idx = 0
    for (let i=0; i<posts.length;i++){
        if (posts[i].acf.event_date.slice(0, -3) === months[idx]) {
            monthFirstIdxs.push(i)
            idx += 1
        }
    }
    // change active month and scroll position whenever active post change
    useEffect(() => {
        setMonthIdx(months.indexOf(posts[activeIdx].acf.event_date.slice(0, -3)))
        setScrollIdx(activeIdx)
    }, [activeIdx, posts])
    // change active post to the first post of the active month
    const nextMonth = () => {
        let newMonthIdx = Math.min(monthIdx + 1, months.length - 1)
        setMonthIdx(newMonthIdx)
        switchToSlide(monthFirstIdxs[newMonthIdx])()
    }
    const lastMonth = () => {
        let newMonthIdx = Math.max(monthIdx - 1, 0)
        setMonthIdx(newMonthIdx)
        switchToSlide(monthFirstIdxs[newMonthIdx])()
    }

    return (
        <div css={MainBoxCSS}>
            <div css={MonthBoxCSS}>
                <div css={MonthContentCSS}>{months[monthIdx]}</div>
                <Arrow direction="left" handleClick={lastMonth}/>
                <Arrow direction="right" handleClick={nextMonth}/>
            </div>
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
        </div>
    )
}

export default Timeline
