/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import { useTransition } from 'react-spring'
import { css } from '@emotion/react'

import RelatedItem from '../components/RelatedItem'

const Related = ({posts, activeIdx}) => {
    const [relatedPosts, setRelatedPosts] = useState([])

    const intersectNums = (A, B) => A.filter(a => B.includes(a)).length
    useEffect(() => { // find related posts and sort them based on revelancy
        let pairs = posts.map(p => [intersectNums(p.tags, posts[activeIdx].tags), p])
        pairs = pairs.filter(p => p[0] > 0 && p[1] !== posts[activeIdx])
        pairs.sort((a, b) => b[0] - a[0])
        setRelatedPosts(pairs.map(p => p[1]))
    }, [activeIdx, posts])

    const transitions = useTransition(relatedPosts, {
        from: {
            opacity: 0,
            height: 0,
            innerHeight: 0,
            transform: `translate3d(-10%, 0, 0)`,
        },
        enter: {
            opacity: 1,
            height: 50,
            innerHeight: 50,
            transform: `translate3d(0%, 0, 0)`,
        },
        leave: [{height: 0}, {opacity: 0, innerHeight: 0}],
        trail: 400,
        delay: 400,
    })

    const relatedCSS = css`
        width: 50%;
    `
    return (
        <div css={relatedCSS}>
            {transitions((style, rp, _, index) => (
                <RelatedItem key={index} style={style} post={rp} />
            ))}
        </div>
    )
}

export default Related
