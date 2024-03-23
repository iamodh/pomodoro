import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled, { createGlobalStyle } from "styled-components";
import { counterState } from "./atom";

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

function App() {
  const [counter, setCounter] = useRecoilState(counterState);
  const onPlayClick = () => {
    if (counter.running) {
      setCounter((current) => ({ ...current, running: false }));
    } else {
      setCounter((current) => ({ ...current, running: true }));
    }
  };
  return (
    <Wrapper>
      <GlobalStyles />
      <Title>Pomodoro</Title>
      <Numbers>
        <ANumber variants={aNumberVariants} initial="start" animate="end">
          25
        </ANumber>
        <Divider>:</Divider>
        <ANumber variants={aNumberVariants} initial="start" animate="end">
          00
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
    </Wrapper>
  );
}

export default App;
