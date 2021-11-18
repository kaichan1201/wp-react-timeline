/** @jsxImportSource @emotion/react */
import React from 'react'
import {css} from '@emotion/react'
import { usePopperTooltip } from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'

const colorMap = [['#86BED5', '#3E97BD'], ['#23b7c2', '#1e9da6']]

const Dot = ({dotWidth, margin, isActive, onClick, post}) => {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
      } = usePopperTooltip({
          placement: 'bottom',
      });

    const month = parseInt(post.acf.event_date.split('/')[1])
    
    const DotCSS = css`
        position: relative;
        height: ${dotWidth}px;
        width: ${dotWidth}px;
        border-radius: 50%;
        margin-right: ${margin}px;
        background-color: ${isActive ? colorMap[month % colorMap.length][0]:colorMap[month % colorMap.length][1]};
        display: inline-block;
        &:hover{
            cursor: pointer;
        }
    `

    const DotTextCSS = css`
        position: absolute;
        margin: auto;
        font-size: 15px;
        left: -0.5vw;
        top: 4.5vh;
    `

    const TooltipCSS = css`
        background-color: #107790;
        opacity: 0.9;
        color: white;
    `
    
    return (
        <>
            <div css={DotCSS} ref={setTriggerRef} onClick={onClick}>
                <p css={DotTextCSS}>{post.acf.event_date.slice(5)}</p>
            </div>
            {
                visible && (
                    <div ref={setTooltipRef} {...getTooltipProps({className: 'tooltip-container'})} css={TooltipCSS}>
                        <span>{post.acf.event_date}</span>
                        <span>{post.title.rendered}</span>
                        <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                    </div>
                )
            }
        </>
    )
}
export default Dot
