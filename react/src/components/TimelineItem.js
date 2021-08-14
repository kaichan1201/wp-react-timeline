/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'

import Dot from './Dot'

const TimelineItem = ({isActive, idx, post, dotWidth, lineWidth, margin, onClick}) => {
    const LineCSS = css`
            position: relative;
            width: ${lineWidth}px;
            margin-right: ${margin}px;
            bottom: 10px;
            border-top: 4px solid #37cc5c;
            opacity: 0.8;
            display: inline-block;
        `
    const Line = () => <div css={LineCSS} />

    return (
        <div>{
            idx === 0 ? <Dot dotWidth={dotWidth} margin={margin} isActive={isActive} onClick={onClick} post={post}/> : (
                <>
                    <Line />
                    <Dot dotWidth={dotWidth} margin={margin} isActive={isActive} onClick={onClick} post={post}/>
                </>
            )
        }</div>
    )
}

export default TimelineItem
