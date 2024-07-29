import { createStyles } from 'antd-style'
import { rs } from '@/utils'

export const useClassicFrame5Style = createStyles(
  ({ css, token }, { hasTitle }: { hasTitle?: boolean }) => {
    const { themeProvider, isDarkTheme } = token
    const headerBgUrl = rs(
      `/assets/schema-component/ClassicFrame5/${token.themeAssetsPath}/bg1.png`,
    )

    return css`
      &.nodeContent5Renderer {
        width: 100%;
        height: 100%;
        /* background: var(--node-content-bg); */
        /* overflow: hidden; */
      }

      .nodeContent5RendererTitle {
        height: 100%;
        color: var(--secondary);
        padding-left: 0.16rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        background: url(${headerBgUrl}) no-repeat;
        background-size: 100% 100%;
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

      .nodeContent5RendererContent {
        background: var(--node-content-bg);
        height: ${hasTitle ? ' calc(100% - 0.46rem)' : '100%'};
        position: relative;
      }
    `
  },
)
