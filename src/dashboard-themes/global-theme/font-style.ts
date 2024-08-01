import { css } from '@emotion/css'
import { rs } from '@/utils'

export const fontStyle = css`
                                        @font-face {
                                          font-family: "Lijin";
                                          src: url(${rs('/assets/fonts/lijin.ttf')})
                                            format("truetype");
                                          font-weight: normal;
                                          font-style: normal;
                                        }
                                        @font-face {
                                          font-family: "YouSheBiaoTiHei";
                                          src: url(${rs('/assets/fonts/youshe.ttf')})
                                            format("truetype");
                                          font-weight: normal;
                                          font-style: normal;
                                        }
                                        @font-face {
                                          font-family: "Digiface";
                                          src: url(${rs('/assets/fonts/digiface.ttf')})
                                            format("truetype");
                                          font-weight: normal;
                                          font-style: normal;
                                        }
                                      `
