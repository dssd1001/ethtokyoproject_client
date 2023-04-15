import { Tag } from "@/components/Tag";
import ReactECharts from "echarts-for-react";
import React, { useRef, useEffect, useState } from "react";

export const PortfolioAllocationsChart = ({
  userWalletAssets,
  userVaultAllocations,
}) => {
  const chartRef = useRef(null);
  const [option, setOption] = useState({});

  useEffect(() => {
    const chartOptions = {
      tooltip: {
        trigger: "item",
        backgroundColor: "#000000",
        textStyle: { color: "#ffffff" },
        formatter: "<strong>{b}</strong><br/> {c} ({d}%)",
      },

      legend: { show: false },
      series: [
        {
          name: "Vault Allocations",
          type: "pie",
          //   left: 20,
          //   height: 80,
          radius: ["45%", "75%"],
          selectedMode: "single",
          itemStyle: {
            borderWidth: 2,
            borderColor: "#ffffff1a",
          },
          label: {
            show: false,
          },
          labelLine: { show: false },
          data: userVaultAllocations.map(
            (userVaultAllocation) => userVaultAllocation
          ),
        },
        // {
        //   name: "Asset Holdings",
        //   type: "pie",
        //   radius: ["45%", "60%"],
        //   selectedMode: "single",
        //   itemStyle: {
        //     borderWidth: 2,
        //     borderColor: "#ffffff1a",
        //   },
        //   label: {
        //     show: false,
        //   },
        //   labelLine: { show: false },
        //   data: userWalletAssets.map((userWalletAsset) => userWalletAsset),
        // },
        // {
        //   name: "Vaults",
        //   type: "pie",
        //   radius: ["70%", "75%"],
        //   barWidth: 10,
        //   itemStyle: {
        //     borderWidth: 2,
        //     borderColor: "#ffffff1a",
        //   },
        //   label: {
        //     show: false,
        //   },
        //   // label: {
        //   //   formatter: "{per|{d}%}",
        //   //   rich: {
        //   //     per: {
        //   //       fontSize: 14,
        //   //       fontWeight: "bold",
        //   //       lineHeight: 33,
        //   //     },
        //   //   },
        //   // },
        //   labelLine: { show: false },
        //   data: userVaultAllocations.map(
        //     (userVaultAllocation) => userVaultAllocation
        //   ),
        // },
      ],
    };

    setOption(chartOptions);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative">
        <ReactECharts option={option} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-circle flex flex-col items-center justify-center marketing-exp-circle">
            <h1 className="text-xl font-bold">$22.5k</h1>
            {/* <span className="text-xs">USDT</span> */}
            {/* <span className="text-xs">+4.11%</span> */}

            <Tag color="emerald">
              <span className="text-2xs">+50%</span>
            </Tag>
          </div>
        </div>
      </div>
    </div>
  );
};
