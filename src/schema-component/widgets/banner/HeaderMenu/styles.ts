import { createStyles } from "antd-style";

export const useMenuItemStyle = createStyles(({ css, token }) => {
    const url = `/assets/header-menu/${token.themeAssetsPath}/main-bg.png`
    return css`
    height:0.38rem;
    min-width:.8rem;
    padding:0.12rem;
    background-image:url(${url});
    background-size:cover;
    background-repeat:no-repeat;
    color:${token.textMenu};
    font-size:0.22rem;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor: pointer;

    
    `
})