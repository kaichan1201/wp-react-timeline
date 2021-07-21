import styled from '@emotion/styled'

const SliderContent = styled.div`
  transform: translateX(-${props => props.activeIdx * props.slideWidth}vw);
  transition: transform ease-out 0.35s;
  height: 70vh;
  width: ${props => props.totalWidth}vw;
  display: flex;
`
export default SliderContent