import { createStyles } from "antd-style";

export const useMenuItemStyle = createStyles(({ css, token }, { active }: { active?: boolean; }) => {
    const url = `/assets/header-menu/${token.themeAssetsPath}/main-bg.png`

    return css`
    
    font-family:YouSheBiaoTiHei;
    letter-spacing:0.02rem;
    height:0.38rem;
    min-width:.8rem;
    padding:0 0.12rem;

    background-image:url(${url});
    background-size:cover;
    background-repeat:no-repeat;
    color:${active ? token.textMenuSelect : token.textMenu};
    font-size:0.16rem;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor: pointer;

    
    `
})