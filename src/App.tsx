import "./App.css";
import Router from "./Router";
import GlobalStyle from "./components/GlobalStyle";
import { ReactQueryDevtools } from "react-query/devtools";
import styled, { ThemeProvider } from "styled-components";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "./atom";
import { lightTheme, darkTheme } from "./theme";

const Toggle = styled.button`
  width: 20px;
  height: 20px;
`;

function App() {
  const dark = useRecoilState(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={dark[0] ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
