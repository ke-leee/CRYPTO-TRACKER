import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Tabs = styled.ul`
  display: flex;
  flex-wrap: wrap;
  row-gap: 5px;
`;

const Tab = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  span:first-child {
    font-size: 18px;
    font-weight: 600;
  }
  span:last-child {
    font-size: 20px;
    font-weight: 600;
  }
`;
function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  console.log(data);
  const USD = data?.quotes.USD;
  return (
    <div>
      {isLoading ? (
        "Price Loading..."
      ) : (
        <>
          <Tabs>
            <Tab>
              <span>Now</span>
              <span>{USD?.price.toFixed(3)} USD</span>
            </Tab>
            <Tab>
              <span>30m before</span>
              <span>{USD?.percent_change_30m.toFixed(2)} %</span>
            </Tab>
            <Tab>
              <span>1h before</span>
              <span>{USD?.percent_change_1h.toFixed(2)} %</span>
            </Tab>
            <Tab>
              <span>1D before</span>
              <span>{USD?.percent_change_24h.toFixed(2)} %</span>
            </Tab>
            <Tab>
              <span>7D before</span>
              <span>{USD?.percent_change_7d.toFixed(2)} %</span>
            </Tab>
          </Tabs>
        </>
      )}
    </div>
  );
}
export default Price;
