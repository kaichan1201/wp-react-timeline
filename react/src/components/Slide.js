/** @jsxImportSource @emotion/react */
import React from 'react'
import {css} from '@emotion/react'
import { animated } from '@react-spring/web'

const textWrapCSS = css`
    height: 100%;
    margin-left: 5vw;
    margin-right: 5vw;
    color: white;
`

const wordContentCSS = css`
    margin-left: 5vw;
    margin-right: 5vw;
    height: 60%;
    overflow: hidden;
    text-align: justify;
    font-size: 20px;
`

const Slide = ({post, style}) => {
    const SlideCSS = css`
        position: absolute;
        height: 100%;
        width: 100%;
        background-image: linear-gradient(
            rgba(0,0,0,0.50),
            rgba(0,0,0,0.50)
        ),
        url(${post.jetpack_featured_media_url ? post.jetpack_featured_media_url: 'https://covidstory.tw/wp-content/uploads/2021/04/Slide24.jpeg'});
        background-size: cover;
        background-position: center;
    `
    const TitleCSS = css`
        font-size: 2em;
        font-weight: bold;
        color: white;
        outline: none;
        text-decoration: none;
        &:visited{
            color:white;
        }
        &:hover{
            border-bottom: 1px solid white;
        }
    `
    return (
        <animated.div css={SlideCSS} style={style}>
            <div css={textWrapCSS}>
                    <p>{post.acf.event_date}</p>
                    <a href={post.link} css={TitleCSS}>
                        {post.title.rendered}
                    </a>
                    <div css={wordContentCSS}>
                        <p>{post.acf.timeline_text}</p>
                    </div>
            </div>
        </animated.div>
    )
}

export default Slide
