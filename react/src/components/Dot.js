/** @jsxImportSource @emotion/react */
import React from 'react'
import {css} from '@emotion/react'
import { usePopperTooltip } from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'

const Dot = ({dotWidth, margin, isActive, onClick, post}) => {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
      } = usePopperTooltip({
          placement: 'top',
      });
    
    const DotCSS = css`
        position: relative;
        height: ${dotWidth}px;
        width: ${dotWidth}px;
        border-radius: 50%;
        margin-right: ${margin}px;
        background-color: ${isActive ? '#ecf542':'#37cc5c'};
        opacity: 0.6;
        display: inline-block;
        &:hover{
            cursor: pointer;
            opacity: 0.9;
        }
    `

    const DotTextCSS = css`
        position: absolute;
        margin: auto;
        font-size: 10px;
    `

    const TooltipCSS = css`
        background-color: blue;
        opacity: 0.9;
        color: white;
    `
    
    return (
        <>
            <div css={DotCSS} ref={setTriggerRef} onClick={onClick}>
                <p css={DotTextCSS}>{post.acf.event_date.slice(0, -3)}</p>
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
