/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useMemo } from 'react'
import { css } from '@emotion/react'
import { animated, useSpring } from 'react-spring'

import TimelineItem from '../components/TimelineItem'
import Arrow from '../components/Arrow'
import { getDateFormat } from '../utils'

const dotWidth = 25
const lineWidth = 50
const margin = 5
const offset = 9

const getYearMonth = p => getDateFormat(p.acf.event_date, '/', true, true, false)

const Timeline = ({displayPosts, activeIdx, switchToSlide}) => {
    const MainBoxCSS = css`
        position: relative;
        width: 85%;
        height: 100%;
        display: flex;
        flex-direction: row;
    `
    const MonthBoxCSS = css`
        position: relative;
        width: 30%;
        height: 100%;
        margin-top: 1vh;
        margin-bottom: 1vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
    `
    const MonthContentCSS = css`
        @media only screen and (min-width: 640px) {
            position: relative;
            width: 30%;
            height: 100%;
            top: 20%;
            font-size: 20px;
            text-align: center;
        }
        
        @media only screen and (max-width: 640px) {
            position: relative;
            font-size: 10px;
            width: 30%;
            height: 100%;
            top: 20%;
          }
    `
    const TimelineBoxCSS = css`
        position: relative;
        width: 70%;
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
        setScrollIdx(dir === 1 ? Math.min(scrollIdx+offset, displayPosts.length-1) : Math.max(scrollIdx-offset, 0))
    }

    let months = useMemo(() => ([...new Set(displayPosts.map(p => getYearMonth(p))
        )]), [displayPosts])
        
    let monthFirstIdxs = []
    let idx = 0
    for (let i=0; i<displayPosts.length;i++){
        if (getYearMonth(displayPosts[i]) === months[idx]) {
            monthFirstIdxs.push(i)
            idx += 1
        }
    }
    // change active month and scroll position whenever active post change
    useEffect(() => {
        if (displayPosts.length > 0) {
            setMonthIdx(months.indexOf(getYearMonth(displayPosts[activeIdx])))
            setScrollIdx(activeIdx)
        }
    }, [activeIdx, displayPosts, months])
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
                    {displayPosts.map((post, i) => <TimelineItem key={i} idx={i} post={post}
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
