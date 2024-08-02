import { css } from '@emotion/css'

export const designScrollBarStyle = css`

 ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }



  ::-webkit-scrollbar-thumb {
            background-color:var( --dn-scrollbar-color, rgba(0, 0, 0, 0.2) );
            border-radius: 0;
            transition: all .25s ease-in-out;
          }

  ::-webkit-scrollbar-thumb:hover {
    background-color: var( --dn-scrollbar-hover-color, rgba(0, 0, 0, 0.3) );
  }
  
  
  
  `
