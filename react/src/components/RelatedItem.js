/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import { animated } from 'react-spring'

const RelatedItem = ({post}) => {
    const realtedItemCSS = css`
        background-image: linear-gradient(
            rgba(0,0,0,0.50),
            rgba(0,0,0,0.50)
        ),
        url(${post.jetpack_featured_media_url});
        background-size: cover;
        margin-top: 5%;
        color: white;
        height: 100px;
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
    `
    const textCSS = css`
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
        <animated.div css={realtedItemCSS}>
            <a href={post.link} css={textCSS}>{post.title.rendered}</a>
        </animated.div>
    )
}

export default RelatedItem
