import CountUp from "react-countup";

interface CountToProps {
  startVal?: number;
  endVal?: number;
  duration?: number;
  autoplay?: boolean;
}

export function CountTo(props: CountToProps) {
  const { startVal = 0, endVal = 0, duration = 1.5 } = props;

  return <CountUp start={startVal} end={endVal} duration={duration}></CountUp>;
}
