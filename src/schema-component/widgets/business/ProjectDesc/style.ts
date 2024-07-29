import styled from '@emotion/styled'

export const ProjectDescImgWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const FitCoverImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-width: 100%;
`

export const TextBgWrap = styled.div`
  width: 100%;
  height: 33%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.1rem;
  font-size: 0.12rem;
  line-height: 0.16rem;
  overflow: hidden;
  color: rgba(195, 212, 229, 0.9);
  z-index: 2;
`

export const AutoScrollWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  padding: 0;

  overflow: hidden auto;
`
