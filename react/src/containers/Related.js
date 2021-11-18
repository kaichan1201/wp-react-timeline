/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import { animated, useSpring, useTransition } from 'react-spring'
import { css } from '@emotion/react'

import RelatedItem from '../components/RelatedItem'
import { intersectNums } from '../utils'

const Related = ({allPosts, posts, activeIdx}) => {
    const [relatedPosts, setRelatedPosts] = useState([])
    const [showRelated, setShowRelated] = useState(false)

    useEffect(() => { // find related posts and sort them based on revelancy
        if (posts.length > 0) {
            setShowRelated(false)

            setTimeout(() => {
                let pairs = allPosts.map(p => [intersectNums(p.tags, posts[activeIdx].tags), p])
                pairs = pairs.filter(p => p[0] > 0 && p[1] !== posts[activeIdx])
                pairs.sort((a, b) => b[0] - a[0])

                setRelatedPosts(pairs.map(p => p[1]))
            }, 1000)
        }
    }, [activeIdx, allPosts, posts])

    const transitions = useTransition(relatedPosts, {
        from: {
            opacity: 0,
            height: 50,
            innerHeight: 0,
            transform: `translate3d(-10%, 0, 0)`,
        },
        enter: {
            opacity: 1,
            height: 100,
            innerHeight: 50,
            transform: `translate3d(0%, 0, 0)`,
        },
        leave: [{height: 50, opacity: 0, innerHeight: 0}],
        trail: 400,
        delay: 400,
    })

    const relatedSpring = useSpring({
        opacity: showRelated ? 1:0,
        from: {opacity: 0}
    })
    useEffect(() => {
        setShowRelated(true)
    }, [relatedPosts])

    const relatedCSS = css`
        position: absolute;
        background-color: rgba(255,255,255,0.50);
        width: 100%;
        top: 75%;
        padding-left: 2%;
        padding-right: 2%;
        height: 25%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        z-index: 1;
    `
    return (
        <animated.div style={relatedSpring} css={relatedCSS}>
            {relatedPosts.map(rp => <RelatedItem key={rp} post={rp} />)}
            {/* {transitions((style, rp, _, index) => (
                <RelatedItem key={index} style={style} post={rp} />
            ))} */}
        </animated.div>
    )
}

export default Related
