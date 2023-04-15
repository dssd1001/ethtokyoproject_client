import { Tag } from "@/components/Tag";

import { equityData } from "@/content/equityData.js";
import { bitcoinData } from "@/content/bitcoinData.js";

import ReactECharts from "echarts-for-react";
import React, { useRef, useEffect, useState } from "react";
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

export const PortfolioValueChart = ({}) => {
  const chartRef = useRef(null);
  const [option, setOption] = useState({});
  useEffect(() => {
    const chartOptions = {
      colorBy: "series",
      // test: () => {
      //   console.log(bitcoinData);
      // },
      stateAnimation: {
        duration: 300,
        easing: "cubicOut",
      },
      animationDuration: 10000,
      animation: "auto",
      animationDurationUpdate: 500,
      animationEasing: "cubicInOut",
      animationEasingUpdate: "cubicInOut",
      animationThreshold: 2000,
      progressiveThreshold: 3000,
      progressive: 400,
      hoverLayerThreshold: 3000,
      tooltip: {
        order: "valueDesc",
        trigger: "axis",
      },
      // visualMap: [
      //   {
      //     show: false,
      //     type: "continuous",
      //     seriesIndex: 0,
      //     min: 0,
      //     max: 300000,
      //     target: {
      //       inRange: {
      //         color: ["#B468FF", "#9643FF", "#4356FF", "#53FFFF"],
      //       },
      //     },
      //   },
      //   {
      //     show: false,
      //     type: "continuous",
      //     seriesIndex: 1,
      //     dimension: 0,
      //     min: 0,
      //     max: bitcoinData.map((btc) => btc.date),
      //   },
      // ],
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisLine: {
          lineStyle: { color: "#8392A5" },
          onZero: false,
        },
        splitLine: { show: false },
        min: "dataMin",
        max: "dataMax",
        axisPointer: {
          z: 100,
        },
        data: bitcoinData.map((btc) => btc.date),
      },
      yAxis: {
        scale: true,
        axisLine: { lineStyle: { color: "#8392A5" } },
        splitLine: { show: false },
        splitArea: {
          show: false,
        },
        // name: 'USDC',
        // nameTextStyle: {
        //   color: '#335eea',
        // },
        // nameLocation: 'middle',
        // nameGap: 60,
        // scale: true,
      },
      grid: [
        {
          left: 70,
          right: 20,
          top: 10,
          bottom: 40,
          // height: 0,
        },
      ],
      series: [
        {
          name: "Flagship Fund",
          type: "line",
          showSymbol: false,
          //   endLabel: {
          //     show: true,
          //     formatter: function (params: any) {
          //       return 'Hidden AI: ' + params.value;
          //     },
          //     valueAnimation: true,
          //     distance: 8,
          //   },
          labelLayout: {
            moveOverlap: "shiftY",
          },
          empahsis: {
            focus: "series",
          },
          data: equityData.map((equity) => equity.equity),
          lineStyle: {
            color: "#10b981",
          },
        },
        {
          name: "Bitcoin Buy & Hold",
          type: "line",
          showSymbol: false,
          //   endLabel: {
          //     show: true,
          //     formatter: function (params: any) {
          //       return 'Buy & Hold: ' + params.value;
          //     },
          //   },
          labelLayout: {
            moveOverlap: "shiftY",
          },
          emphasis: {
            focus: "series",
          },
          data: bitcoinData.map(
            (btc) => 15000 * (btc.close / bitcoinData[0]?.close)
          ),
          lineStyle: {
            color: "#F7931A",
          },
        },
      ],
    };

    setOption(chartOptions);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-end items-end pt-6 px-6">
        <div className="flex mr-2">
          <Tag color="zinc">
            <span className="text-base">1D</span>
          </Tag>
        </div>
        <div className="flex mr-2">
          <Tag color="zinc">
            <span className="text-base">1W</span>
          </Tag>
        </div>
        <div className="flex mr-2">
          <Tag color="zinc">
            <span className="text-base">1M</span>
          </Tag>
        </div>
        <div className="flex">
          <Tag color="indigo">
            <span className="text-base">1Y</span>
          </Tag>
        </div>
      </div>
      <div className="relative">
        <ReactECharts ref={chartRef} option={option} />
      </div>
    </div>
  );
};
