/** @jsxImportSource @emotion/react */
import React from 'react'
import {css} from '@emotion/react'

const SlideCSS = css`
                height: 100%;
                width: 100%;
                color: #c1cee3;
                background-color: #3b434f;
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

const Slide = ({post}) => {
    return (
        <div css={SlideCSS}>
            <div css={textWrapCSS}>
                <p>{post.acf.event_date}</p>
                <h1>{post.title.rendered}</h1>
                <p css={wordContentCSS}>{post.acf.timeline_text}</p>                
            </div>
        </div>
    )
}

export default Slide
