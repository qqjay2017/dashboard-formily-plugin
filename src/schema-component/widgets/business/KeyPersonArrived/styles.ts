import styled from '@emotion/styled'

export const ItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

export const ItemImg = styled.img`
  width: 0.4rem;
  height: 0.4rem;
`

export const JobTitle = styled.div`
  margin-top: 0.04rem;

  font-weight: 600;
  font-size: 0.14rem;
  color: #c5dfef;
  line-height: 0.16rem;
  text-align: center;
`

export const NumWrap = styled.div`
  width: 100%;
  margin-top: 0.04rem;
  padding: 0.06rem 0.16rem;
  color: rgba(195, 212, 229, 0.7);
  max-width: 2.2rem;
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
  flex: 1;
`

export const NumLabelValue = styled.div`
  font-weight: 400;
  font-size: 0.14rem;
  color: #64e3ff;
  line-height: 0.16rem;
  text-align: right;
`
