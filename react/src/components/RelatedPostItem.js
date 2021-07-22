/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'

const postItemCSS = css`
`

const RelatedPostItem = ({post}) => {
    return (
        <div>
            <h1>{post.title.rendered}</h1>
        </div>
    )
}

export default RelatedPostItem
