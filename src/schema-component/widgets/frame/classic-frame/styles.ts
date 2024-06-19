import { createStyles } from "antd-style";
import { rs } from "../../../../utils/resolveStatic";

export const useClassicFrameStyle = createStyles(({ css, token }, { hasTitle }: { hasTitle?: boolean }) => {
  const { themeProvider, isDarkTheme } = token
  console.log(token, 'token')
  const url = rs(`/assets/classic-frame/${themeProvider}-${isDarkTheme ? 'dark' : "light"}/bg1.png`)
  return css`
    &.nodeContentRenderer {
      width: 100%;
      height: 100%;
      background: var(--node-content-bg);
      /* overflow: hidden; */
    }

    .nodeContentRendererTitle {
      height: 46px;
      color: var(--secondary);
      padding-left: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      &::after {
        content: "";
        width: calc(100% - 36px);
        height: 2px;
        background: linear-gradient(
          90deg,
          #154c8d 0%,
          rgba(21, 76, 141, 0.14) 100%
        );
        border-radius: 0px 0px 0px 0px;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 2;
      }
    }
    .nrtTitle {
      font-size: 18px;
      line-height:20px;
      font-family:YouSheBiaoTiHei;
      letter-spacing:2px;
      color:var(--node-content-foreground)
    }
    .nrtSubTitle {
      font-size: 12px;
    }
    .nrtExtra {
      height: 46px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .nodeContentRendererContent {
      height:${hasTitle ? " calc(100% - 46px)" : "100%"};
      position:relative;
     
    }

    .nodeContentRendererTitleBg {
      width: 26px;
      height: 26px;
      position: absolute;
      z-index: 2;
      bottom: 0;
      left: 10px;
      background-image: url(${url});
      background-repeat: no-repeat;
      background-size: cover;
    }
  `;
});
