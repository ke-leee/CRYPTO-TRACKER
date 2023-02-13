import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  //   console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => Number(price.close)) as number[],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) => price.time_close),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
          <ApexChart
            type={"candlestick"}
            series={
              [
                {
                  data: data?.map((price) => {
                    return {
                      x: new Date(price.time_open * 1000)
                        .toISOString()
                        .slice(0, 10),
                      y: [
                        parseFloat(price.open).toFixed(3),
                        parseFloat(price.high).toFixed(3),
                        parseFloat(price.low).toFixed(3),
                        parseFloat(price.close).toFixed(3),
                      ],
                    };
                  }),
                },
              ] as any
            }
            options={{
              xaxis: {
                categories: data?.map((price) =>
                  new Date(price.time_open * 1000).toISOString().slice(0, 10)
                ),
                type: "datetime",
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
              },
              chart: {
                toolbar: {
                  show: false,
                },
              },
              grid: { show: false },
              yaxis: { show: false },
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(2)}`,
                },
              },
            }}
            width="480"
            height="200"
          />
        </>
      )}
    </div>
  );
};
export default Chart;
