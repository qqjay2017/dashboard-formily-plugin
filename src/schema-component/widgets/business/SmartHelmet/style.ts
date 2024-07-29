import styled from '@emotion/styled'
import { ellipTextStyle } from '@/utils'

export const HelmetLeftWrap = styled.div`
  width: 38%;
  height: 100%;
  padding: 0.08rem;
  padding-right: 0.1rem;
  overflow: hidden;
`

export const HelmetRightWrap = styled.div`
  width: calc(62% - 0.1rem);
  height: 100%;
  padding-left: 0.1rem;
`

export const NumLabelWrap = styled.div`
  width: 100%;
  display: flex;
  font-weight: 400;
  font-size: 0.14rem;
  color: rgba(195, 212, 229, 0.7);
  line-height: 0.16rem;
  text-align: left;
`
export const NumLabelLabel = styled.div`
  width: 75%;
  ${ellipTextStyle}
`

export const NumLabelValue = styled.div`
  width: 25%;
  max-width: 25%;
  min-width: 35px;
  font-weight: 400;
  font-size: 0.14rem;
  color: #87e15e;
  line-height: 0.16rem;
  text-align: right;
`

export const HelmetLeftTopWrap = styled.div`
  width: 100%;
  height: calc(50% - 0.1rem);
`
export const HelmetLeftBottompWrap = styled.div`
  width: 100%;
  height: calc(50% - 0.1rem);
  margin-top: 0.1rem;
`

export const CountItemCount = styled.span`
  font-size: 0.26rem;
  color: #f1bb80;
  line-height: 0.3rem;
  text-align: left;
`

export const CountItemUnit = styled.span`
  font-size: 0.16rem;
  color: #f1bb80;
  line-height: 0.3rem;
  text-align: left;
`

export const CountItemWrap = styled.div`
  margin-top: 0.2rem;
`

export const RightLabel = styled.div`
  font-weight: 600;
  font-size: 0.14rem;
  color: #c5dfef;
  line-height: 0.16rem;
  padding-bottom: 0.08rem;
`

export const AnaItemWrap = styled.div`
  height: 0.55rem;
  min-height: 55px;
  background: rgba(255, 255, 255, 0.06);
  padding: 0.12rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 0.1rem;
`

export const HelmetRightScrollWrap = styled.div`
  width: 100%;
  height: calc(100% - 0.3rem);
  overflow: hidden auto;
`

export const ProgressStatusLine3Percent = styled.div`
  width: 50%;
  position: absolute;
  left: 0;
  top: 0;
  height: 0.12rem;
  max-width: 100%;
  background: linear-gradient(
    270deg,
    #ffffff 0%,
    #1860ec 46%,
    rgba(24, 96, 236, 0) 100%
  );
`

export const ProgressStatusLine3Style = styled.div`
  height: 0.12rem;
  width: 100%;
  background-color: #1a4063;
  position: relative;
  max-height: 12px;
`
