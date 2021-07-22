/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useState, useEffect } from 'react'
import RelatedPostItem from '../components/RelatedPostItem'

const RelatedPosts = ({posts, activeIdx}) => {
    const [relatedPosts, setRelatedPosts] = useState([])

    const intersectNums = (A, B) => A.filter(a => B.includes(a)).length

    useEffect(() => { // find related posts and sort them based on revelancy
        let pairs = posts.map(p => [intersectNums(p.tags, posts[activeIdx].tags), p])
        pairs = pairs.filter(p => p[0] > 0 && p[1] != posts[activeIdx])
        pairs.sort((a, b) => b[0] - a[0])
        setRelatedPosts(pairs.map(p => p[1]))
    }, [activeIdx, posts])

    const relatedPostsCSS = css`
        margin: 0 auto;
    `

    return (
        <div css={relatedPostsCSS}>
            {relatedPosts.map((rp, i) => <RelatedPostItem key={i} post={rp}/>)}
        </div>
    )
}

export default RelatedPosts
