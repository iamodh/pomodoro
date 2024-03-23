import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled, { createGlobalStyle } from "styled-components";
import { counterState, statsState } from "./atom";
import { useEffect, useState } from "react";
import { useSecondFormat } from "./utils";

const GlobalStyles = createGlobalStyle`
  body {
    background-color:#E74C3D;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
`;

const Numbers = styled.div`
  display: flex;
  align-items: center;
  margin: 80px 0px;
`;

const ANumber = styled(motion.div)`
  color: #e74c3d;
  font-weight: 600;
  background-color: white;
  font-size: 56px;
  padding: 50px 20px;
  border-radius: 5px;
  box-shadow: 0 0.25em 0.375em rgba(50, 50, 93, 0.09),
    0 0.063em 0.188em rgba(0, 0, 0, 0.08);
  font-variant-numeric: tabular-nums;
`;

const Divider = styled.div`
  margin: 0px 10px;
  font-size: 40px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
`;

const aNumberVariants = {
  start: {
    scale: 0.7,
    opacity: 0.5,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
};

const Button = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 0;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
  svg {
    width: 50px;
  }
`;

const Counters = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
`;

const Counter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Value = styled.span`
  opacity: 0.7;
  font-size: 18px;
  margin-bottom: 10px;
  font-variant-numeric: tabular-nums;
`;

const Name = styled.span`
  font-size: 14px;
`;

function App() {
  const [counter, setCounter] = useRecoilState(counterState);
  const [minutes, seconds] = useSecondFormat(counter.value);
  const onPlayClick = () => {
    if (counter.running) {
      setCounter((current) => ({ ...current, running: false }));
    } else {
      setCounter((current) => ({ ...current, running: true }));
    }
  };

  const [intervalId, setIntervalId] = useState<null | number>(null);
  useEffect(() => {
    if (counter.running) {
      // decrease counter value by 1
      if (intervalId === null) {
        let timeout = setInterval(() => {
          setCounter((current) => ({
            ...current,
            // no negative number
            value: Math.max(current.value - 1, 0),
          }));
        }, 1000);
        setIntervalId(Number(timeout));
      }
    } else {
      // stop decreasing
      if (intervalId !== null) {
        setIntervalId(null);
        clearInterval(intervalId);
      }
    }
  }, [counter, setCounter, intervalId]); // include setters for the case

  const [stats, setStats] = useRecoilState(statsState);
  useEffect(() => {
    if (counter.value === 0) {
      //all rounds ended
      if (intervalId !== null) {
        setIntervalId(null);
        clearInterval(intervalId);
      }
      if (stats.round === 4) {
        setStats((current) => ({
          ...current,
          round: 1,
          goal: current.goal + 1,
        }));
      }
      // left rounds exsist
      else {
        setStats((current) => ({ ...current, round: current.round + 1 }));
      }
      // stop time and reset
      setCounter((current) => ({ ...current, running: false, value: 5 }));
    }
  }, [counter, stats, intervalId, setCounter, setStats]); // include setters for the case

  return (
    <Wrapper>
      <GlobalStyles />
      <Title>Pomodoro</Title>
      <Numbers>
        <ANumber
          variants={aNumberVariants}
          initial="start"
          animate="end"
          key={`${minutes}-minutes`}
        >
          {minutes}
        </ANumber>
        <Divider>:</Divider>
        <ANumber
          variants={aNumberVariants}
          initial="start"
          animate="end"
          key={`${seconds}-seconds`}
        >
          {seconds}
        </ANumber>
      </Numbers>
      <Button
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.2 }}
        onClick={onPlayClick}
      >
        {counter.running ? (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
          </svg>
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        )}
      </Button>
      <Counters>
        <Counter>
          <Value>{stats.round}/4</Value>
          <Name>Round</Name>
        </Counter>
        <Counter>
          <Value>{stats.goal}/12</Value>
          <Name>Goal</Name>
        </Counter>
      </Counters>
    </Wrapper>
  );
}

export default App;
