import { css } from "@emotion/css";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";

import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { week } from "./consts";
import { useFullscreen } from "@/schema-component/hooks";

export const HeaderClock = memo(() => {
  const [dateValue, setDateValue] = useState(new Date());

  const [isFullscreen, { toggleFullscreen }] = useFullscreen(() =>
    document.getElementById("root")
  );

  useEffect(() => {
    const interval = setInterval(() => setDateValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 0.24rem;
        font-weight: 400;
        font-size: 0.2rem;
        color: rgba(195, 212, 229, 0.7);
        line-height: 0.22rem;
      `}
    >
      <div
        className={css`
          margin-right: 0.16rem;
          min-width: 2rem;
        `}
      >
        {dayjs(dateValue).format("YYYY-MM-DD HH:mm:ss")}
      </div>
      <div
        className={css`
          margin-right: 0.16rem;
          min-width: 0.7rem;
        `}
      >
        星期
        {week[dayjs(dateValue).day()]}
      </div>

      <div
        onClick={() => {
          try {
            toggleFullscreen();
          } catch (error) {}
        }}
        className={css`
          font-size: 0.2rem;
          line-height: 0.2rem;
          padding: 0.08rem;
          cursor: pointer;
        `}
      >
        {isFullscreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen />}
      </div>
    </div>
  );
});
