/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'

const TimelineItem = ({isActive, idx, dotWidth, lineWidth, margin, onClick}) => {
    const DotCSS = css`
        position: relative;
        height: ${dotWidth}px;
        width: ${dotWidth}px;
        border-radius: 50%;
        margin-right: ${margin}px;
        background-color: ${isActive ? '#ecf542':'#37cc5c'};
        opacity: 0.6;
        display: inline-block;
        &:hover{
            cursor: pointer;
            opacity: 0.9;
        }
    `
    const Dot = () => <div css={DotCSS} onClick={onClick}/>

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
            idx === 0 ? <Dot /> : (
                <>
                    <Line />
                    <Dot />
                </>
            )
        }</div>
    )
}

export default TimelineItem
