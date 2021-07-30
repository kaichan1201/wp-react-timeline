/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io'

const Arrow = ({direction, handleClick}) => {
    return (
        <div
            onClick={handleClick}
            css={css`
                display: flex;
                position: absolute;
                top: 40%;
                ${direction === 'right' ? `right: 1vw` : `left: 1vw`};
                height: 50px;
                width: 50px;
                justify-content: center;
                border-radius: 50%;
                cursor: pointer;
                align-items: center;
                transition: transform ease-in 0.1s;
                &:hover {
                    transform: scale(1.1);
                }
            `}
        >
            {direction === 'right' ? <IoIosArrowForward size={42} color="white"/> : <IoIosArrowBack size={42} color="white"/>}
        </div>
    )
}

export default Arrow
