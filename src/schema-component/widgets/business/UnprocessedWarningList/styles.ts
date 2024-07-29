import styled from '@emotion/styled'

export const WarnListItemWrap = styled.div`
  padding-left: 0.3rem;
  position: relative;
`

export const WarnListItemTitle = styled.div`
  font-weight: 400;
  font-size: 0.14rem;
  color: #c3d4e5;
  line-height: 0.16rem;
  text-align: left;
`

export const WarnListItemDetail = styled.div`
  font-weight: 400;
  font-size: 0.12rem;
  color: rgba(195, 212, 229, 0.5);
  line-height: 0.14rem;
  text-align: left;

  margin-top: 0.08rem;
`

export const WarnListItemDate = styled.div`
  font-weight: 400;
  font-size: 0.12rem;

  line-height: 0.14rem;
  margin-top: 0.08rem;
  padding-bottom: 0.14rem;
  text-align: left;
  color: #c3d4e5;
`

export const WarnListItemPoint = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0.03rem;
  z-index: 20;

  background-color: #ffc85e;
`

export const WarnListItemLine = styled.div`
  height: calc(100% - 0.05rem);
  width: 2px;
  background-color: #c3d4e5;
  position: absolute;
  left: 5px;
  margin-left: -1px;
  bottom: -0.05rem;
  z-index: 19;
`
