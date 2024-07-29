import { createStyles } from 'antd-style'
import { rs } from '@/utils'

export const useMenuItemStyle = createStyles(({ css, token }, { active }: { active?: boolean }) => {
  const url = rs(`/assets/header-menu/${token.themeAssetsPath}/main-bg.png`)

  return css`
    width:100%;
    height:100%;
    /* flex:0 0 auto; */
    /* margin: 0 0.12rem; */
    flex-grow:0;
    flex-shrink:0;
    flex-basis:100%;
    font-family:YouSheBiaoTiHei;
    letter-spacing:0.02rem;
    height:0.38rem;
    min-width:.8rem;
    padding:0 0.02rem;

    background-image:url(${url});
    background-size:cover;
    background-repeat:no-repeat;
    color:${active ? token.textMenuSelect : token.textMenu};
    font-size:0.22rem;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor: pointer;

    
    `
})
