import { createStyles } from 'antd-style'
import { rs } from '../../../../utils/resolveStatic'

export const useClassicFrameStyle = createStyles(
  ({ css, token }, { hasTitle }: { hasTitle?: boolean }) => {
    const { themeProvider, isDarkTheme } = token

    const url = rs(
      `/assets/schema-component/ClassicFrame/${themeProvider}-${isDarkTheme ? 'dark' : 'light'}/bg1.png`,
    )
    return css`
      &.nodeContentRenderer {
        width: 100%;
        height: 100%;
        background: var(--node-content-bg);
        /* overflow: hidden; */
      }

      .nodeContentRendererTitle {
        height: 100%;
        color: var(--secondary);
        padding-left: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        &::after {
          content: "";
          width: calc(100% - 0.36rem);
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
        font-size: 0.18rem;
        line-height: 0.2rem;

        font-family: Lijin;
        font-style: italic;
        letter-spacing: 1px;
        color: var(--node-content-foreground);
      }
      .nrtSubTitle {
        font-size: 12px;
      }
      .nrtExtra {
        height: 0.46rem;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      .nodeContentRendererContent {
        height: ${hasTitle ? ' calc(100% - 0.46rem)' : '100%'};
        position: relative;
      }

      .nodeContentRendererTitleBg {
        width: 0.26rem;
        height: 0.26rem;
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 0.1rem;
        background-image: url(${url});
        background-repeat: no-repeat;
        background-size: cover;
      }
    `
  },
)
