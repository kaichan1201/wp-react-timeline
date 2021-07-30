/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import { animated } from 'react-spring'

const realtedItemCSS = css`
    background-color: rgba(248, 161, 11, 0.64);
    height: 10%;
    margin-top: 1%;
    display: flex;
    flex-direction: row;
`

const RelatedItem = ({style, post}) => {
    return (
        <animated.div css={realtedItemCSS} style={style}>
            <p>{post.title.rendered}</p>
        </animated.div>
    )
}

export default RelatedItem
