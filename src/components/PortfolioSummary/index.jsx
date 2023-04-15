// import ReactEChartsCore from "echarts-for-react/lib/core";
import ReactECharts from "echarts-for-react";
// import { LineChart } from "echarts/charts";
// import {
//   GridComponent,
//   LegendComponent,
//   TitleComponent,
//   TooltipComponent,
// } from "echarts/components";
// import * as echarts from "echarts/core";
// import { CanvasRenderer } from "echarts/renderers";
import { Heading } from "@/components/Heading";
import React, { useRef, useEffect, useState } from "react";
// import { tooltipFormatter } from "helpers/echart-utils";

// echarts.use([
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   LineChart,
//   CanvasRenderer,
//   LegendComponent,
// ]);

import dayjs from "dayjs";

export const getPosition = (pos, params, dom, rect, size) => ({
  top: pos[1] - size.contentSize[1] - 10,
  left: pos[0] - size.contentSize[0] / 2,
});

export const tooltipFormatter = (params) => {
  let tooltipItem = ``;
  if (Array.isArray(params)) {
    params?.forEach((el) => {
      tooltipItem =
        tooltipItem +
        `<div class='ms-1'>
      <h6 class="text-700">
      <div class="dot me-1 fs--2 d-inline-block" style="background-color:${
        el.borderColor ? el.borderColor : el.color
      }"></div>
      ${el.seriesName} : ${
          typeof el.value === "object" ? el.value[1] : el.value
        }
      </h6>
      </div>`;
    });
  }
  return `<div>
            <p class='mb-2 text-600'>
              ${
                dayjs(params[0].axisValue).isValid()
                  ? dayjs(params[0].axisValue).format("MMMM DD")
                  : params[0].axisValue
              }
            </p>
            ${tooltipItem}
          </div>`;
};

const PortfolioValueChart = ({}) => {
  const chartRef = useRef(null);
  const [option, setOption] = useState({});
  const randomData = () => {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
      name: now.toString(),
      value: [
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
        Math.round(value),
      ],
    };
  };

  let data = [];
  let now = +new Date(1997, 9, 3);
  const oneDay = 24 * 3600 * 1000;
  let value = Math.random() * 1000;
  for (let i = 0; i < 1000; i++) {
    data.push(randomData());
  }

  useEffect(() => {
    const chartOptions = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: false,
        },
        padding: [7, 10],
        backgroundColor: "#f9fafd",
        borderColor: "#374151",
        textStyle: { color: "bg-zinc-500" },
        borderWidth: 1,
        transitionDuration: 0,
        formatter: tooltipFormatter,
      },
      xAxis: {
        type: "time",
        splitLine: {
          show: false,
        },
        axisLabel: {
          textStyle: { color: "bg-zinc-500" },
        },

        axisLine: {
          lineStyle: {
            textStyle: { color: "bg-zinc-500" },
          },
        },
        axisPointer: {
          lineStyle: {
            textStyle: { color: "bg-zinc-500" },
          },
        },
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        splitLine: {
          show: false,
        },
        axisLabel: {
          textStyle: { color: "bg-zinc-500" },
        },
      },
      series: [
        {
          name: "Total",
          type: "line",
          showSymbol: false,
          emphasis: {
            scale: false,
          },
          data: data,
          lineStyle: {
            textStyle: { color: "bg-zinc-500" },
          },
          itemStyle: {
            textStyle: { color: "bg-zinc-500" },
            textStyle: { color: "bg-zinc-500" },
            borderWidth: 2,
          },
          symbol: "circle",
          symbolSize: 10,
        },
      ],
      grid: { right: 5, left: "7%", bottom: "10%", top: "5%" },
    };
    setOption(chartOptions);
  }, []);

  useEffect(() => {
    const interval = setInterval(function () {
      for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
      }
      chartRef.current.getEchartsInstance().setOption({
        series: [
          {
            data: data,
          },
        ],
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ReactECharts
      // echarts={echarts}
      ref={chartRef}
      option={option}
      // style={{ height: "18.75rem" }}
    />
  );
};

const PortfolioAllocationsChart = ({
  userWalletAssets,
  userVaultAllocations,
}) => {
  const chartRef = useRef(null);
  const [option, setOption] = useState({});

  useEffect(() => {
    const chartOptions = {
      tooltip: {
        trigger: "item",
        backgroundColor: "#f9fafd",
        textStyle: { color: "bg-zinc-500" },
        formatter: "<strong>{b}</strong><br/> {c} ({d}%)",
      },
      legend: { show: false },
      series: [
        {
          name: "Asset Holdings",
          type: "pie",
          radius: ["45%", "60%"],
          selectedMode: "single",
          itemStyle: {
            borderWidth: 2,
            borderColor: "#374151",
          },
          label: {
            show: false,
          },
          labelLine: { show: false },
          data: userWalletAssets.map((userWalletAsset) => userWalletAsset),
        },
        {
          name: "Funds",
          type: "pie",
          radius: ["70%", "75%"],
          barWidth: 10,
          itemStyle: {
            borderWidth: 2,
            borderColor: "bg-zinc-500",
          },
          label: {
            formatter: "{per|{d}%}",
            rich: {
              per: {
                fontSize: 14,
                fontWeight: "bold",
                lineHeight: 33,
              },
            },
          },
          labelLine: { show: false },
          data: userVaultAllocations.map(
            (userVaultAllocation) => userVaultAllocation
          ),
        },
      ],
    };

    setOption(chartOptions);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative py-2">
        <ReactECharts
          // ref={chartRef}
          // echarts={echarts}
          option={option}
          // style={{ minHeight: "18.75rem" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-circle flex items-center justify-center marketing-exp-circle">
            <h1 className="text-xl font-bold">$1.1M</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

function PortfolioSummaryComponent({ userWalletAssets, userVaultAllocations }) {
  return (
    // <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
    //   {stats.map((stat) => (
    //     <div key={stat.id} className="flex flex-col bg-white/5 p-8">
    //       <dt className="text-sm font-semibold leading-6 text-gray-300">
    //         {stat.name}
    //       </dt>
    //       <dd className="order-first text-3xl font-semibold tracking-tight text-white">
    //         {stat.value}
    //       </dd>
    //     </div>
    //   ))}
    // </dl>

    <div className="not-prose my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10">
      <h1 className="sr-only">Page title</h1>
      {/* Main 3 column grid */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-0">
        {/* Left column */}
        <div className="grid grid-cols-1 gap-4 ">
          <section aria-labelledby="section-1-title">
            <h2 className="sr-only" id="section-1-title">
              Section title
            </h2>
            <div className="overflow-hidden rounded-l-lg bg-zinc-50 dark:bg-white/2.5">
              <div className="p-6">
                <PortfolioAllocationsChart
                  userWalletAssets={userWalletAssets}
                  userVaultAllocations={userVaultAllocations}
                />
                {/* <MarketingExpensesList data={marketingExpensesData} /> */}
              </div>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <section aria-labelledby="section-2-title">
            <h2 className="sr-only" id="section-2-title">
              Section title
            </h2>
            <div className="overflow-hidden rounded-r-lg bg-zinc-100  dark:bg-zinc-900">
              <div className="p-6">
                <PortfolioValueChart />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function PortfolioSummary({ userWalletAssets, userVaultAllocations }) {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="resources">
        Portfolio Summary
      </Heading>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Your portfolio value and metrics at a glance.
      </p>
      <div className="not-prose grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-1">
        <PortfolioSummaryComponent
          userWalletAssets={userWalletAssets}
          userVaultAllocations={userVaultAllocations}
        />
      </div>
    </div>
  );
}
