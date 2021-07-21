/** @jsxImportSource @emotion/react */
import React from 'react'
import {css} from '@emotion/react'
import {FaCircle} from 'react-icons/fa'

const dotCSS = css`
                        padding: 10px;
                        margin-right: 5px;
                        cursor: pointer;
                    `
const Dot = ({ active , handleClick}) => (
    <div css={dotCSS} onClick={handleClick}>
        <FaCircle style={{color:`${active ? 'yellow': 'grey'}`}}/>
    </div>
  )

const Dots = ({posts, activeIdx, setActiveIdx}) => {
    return (
        <div
          css={css`
            position: relative;
            bottom: 7vh;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        `}>
            {posts.map((_, i) => <Dot key={i} 
                                         active={activeIdx === i}
                                         handleClick={()=>setActiveIdx(i)}/>)}
        </div>
    )
}

export default Dots
