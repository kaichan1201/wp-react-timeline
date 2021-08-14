/** @jsxImportSource @emotion/react */
import React from 'react'
import {css} from '@emotion/react'
import { animated } from '@react-spring/web'

const SlideCSS = css`
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(
        rgba(0,0,0,0.45),
        rgba(0,0,0,0.45)
    ),
    url("https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg");
    background-size: cover;
`

const textWrapCSS = css`
    height: 100%;
    margin-left: 2vw;
    margin-right: 2vw;
    color: white;
`

const wordContentCSS = css`
    margin-left: 5vw;
    margin-right: 5vw;
    height: 60%;
    overflow: hidden;
    text-align: justify;
`

const Slide = ({post, style}) => {
    return (
        <animated.div css={SlideCSS} style={style}>
            <div css={textWrapCSS}>
                    <p>{post.acf.event_date}</p>
                    <h1>{post.title.rendered}</h1>
                    <div css={wordContentCSS}>
                        <p>{post.acf.timeline_text}</p>
                    </div>
            </div>
        </animated.div>
    )
}

export default Slide
