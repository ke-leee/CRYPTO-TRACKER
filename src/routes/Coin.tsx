import { useParams } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
  coinId: string;
}

const Coin = () => {
  const { coinId } = useParams<RouteParams>();
  console.log(coinId);
  return (
    <>
      <h1>Coin: {coinId}</h1>
    </>
  );
};
export default Coin;
