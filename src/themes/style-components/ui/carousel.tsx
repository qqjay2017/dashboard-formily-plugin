import { useCallback, useEffect, useState } from 'react'
import type { EmblaCarouselType } from 'embla-carousel'
import type { ComponentPropsWithRef } from 'react'
import { css } from '@emotion/css'
import { cn, rs } from '@/utils'

interface UsePrevNextButtonsType {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export function usePrevNextButtons(
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi)
      return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi)
      return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi)
      return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

type PropType = ComponentPropsWithRef<'div'> & { disabled?: boolean }

const prevButtonCss = css`
  cursor: pointer;
  position: absolute;

  top: 50%;
  margin-top: -0.1rem;
  z-index: 100;
  width: 0.12rem;
  height: 0.2rem;
`

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, className, disabled, ...restProps } = props

  return (
    <div
      className={cn(
        prevButtonCss,
        css`
          opacity: ${disabled ? 0.25 : 1};
          left: 10px;
        `,
        className,
      )}
      {...restProps}
    >
      {children || (
        <img
          src={rs('/assets/header-menu/arrow-left.png')}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </div>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, className, disabled, ...restProps } = props

  return (
    <div
      className={cn(
        prevButtonCss,
        css`
          opacity: ${disabled ? 0.25 : 1};
          right: 10px;
        `,
        className,
      )}
      {...restProps}
    >
      {children || (
        <img
          src={rs('/assets/header-menu/arrow-right.png')}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </div>
  )
}
