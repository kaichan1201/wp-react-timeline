/** @jsxImportSource @emotion/react */
import React from 'react'
import {css} from '@emotion/react'
import { animated } from '@react-spring/web'

const SlideCSS = css`
                position: absolute;
                height: 100%;
                width: 100%;
                background-color: #3b434f;
                color: white;
                `

const textWrapCSS = css`
                margin-left: 2vw;
                margin-right: 2vw;
                `

const wordContentCSS = css`
                margin-left: 5vw;
                margin-right: 5vw;
                text-align: justify;
                `

const Slide = ({post, style}) => {
    return (
        <animated.div css={SlideCSS} style={style}>
            <div css={textWrapCSS}>
                <p>{post.acf.event_date}</p>
                <h1>{post.title.rendered}</h1>
                <p css={wordContentCSS}>{post.acf.timeline_text}</p>                
            </div>
        </animated.div>
    )
}

export default Slide
