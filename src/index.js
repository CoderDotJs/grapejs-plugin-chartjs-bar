/* global Chart */

import grapesjs from "grapesjs";
import addBlocks from "./addBlocks";
import { addComponents } from "./addComponents";
import { addTraits } from "./addTraits";

export default grapesjs.plugins.add("gjs-charts", (editor, opts = {}) => {
  const script = function (props) {
    if (props.data && props.data.labels) {
      const datasets = [];
      props.data?.values &&
        datasets.push({
          label: props.data?.values?.map((dataSet) => dataSet.label),

          data: props.data?.values?.map((dataSet) => dataSet.data),
        });
      const colors = [
        "#0FC083",
        "#81D065",
        "#35ECB5",
        "#4FC3C7",
        "#A6CACB",
        "#EAFB86",
        "#F7BC24",
        "#EB6C99",
        "#8166AD",
        "#18A1AD",
        "#F1F1F1",
        "#87D5AE",
        "#85C1C8",
        "#4FC3C7",
        "#A6CACB",
        "#EAFB86",
        "#EB6C99",
        "#F7BC24",
        "#0FC083",
        "#8166AD",
        "#18A1AD",
        "#81D065",
        "#35ECB5",
        "#4FC3C7",
        "#A6CACB",
        "#EAFB86",
        "#F7BC24",
        "#EB6C99",
        "#8166AD",
      ];
      props.data?.values?.forEach((dataSet, i) => {
        datasets.push({
          label: dataSet.label,
          backgroundColor: colors[i],
          borderColor: colors[i],
          borderRadius: 20,
          data: dataSet.data,
          borderWidth: 1,
          borderSkipped: "start",
        });
      });

      const initLib = function () {
        var data = {
          labels: props.data.labels,
          datasets,
        };
        var options = {
          layout: {
            padding: {
              top: 20,
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 12,
                  color: "#707070",
                },
                padding: 10,
                callback: function (value, index) {
                  // return index + 1;
                  if (typeof this.getLabelForValue(value) === "number")
                    return this.getLabelForValue(value);
                  const words = this.getLabelForValue(value)?.split(" ");
                  if (words.length > 3)
                    return `${this.getLabelForValue(value)?.substr(0, 16)}...`;
                  return this.getLabelForValue(value);
                },
              },
              grid: {
                borderColor: "#0E4449",
                borderWidth: 0,
                z: 0,
                drawTicks: false,
                display: true,
                color: "#ffffff",
              },
            },
            y: {
              grid: {
                drawTicks: false,
                drawBorder: false,
                display: true,
                color: "#ffffff",
              },
              title: {
                display: false,
              },
              ticks: {
                display: false,
              },
              border: false,
            },
          },
          tooltips: {
            enabled: true,
            mode: "label",
          },
          indexAxis: "x",
          elements: {
            bar: {
              borderWidth: 2,
            },
          },
          interaction: {
            intersect: false,
            mode: "nearest",
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            beforeInit: function (chart, options) {
              chart.legend.afterFit = function () {
                this.height = this.height + 90;
              };
            },
            legend: {
              position: "bottom",
              display: false,
              labels: {
                // font: 0,
                // color: 'transparent',
                boxWidth: 16,
                boxHeight: 16,
                usePointStyle: true,
                pointStyle: true,
                useBorderRadius: true,
                borderRadius: 100,
                generateLabels(chart) {
                  const data = chart.data;
                  if (data.labels.length && data.datasets.length) {
                    const {
                      labels: { pointStyle },
                    } = chart.legend.options;

                    return data.labels.map((label, i) => {
                      const meta = chart.getDatasetMeta(0);
                      const style = meta.controller.getStyle(i);

                      return {
                        text: `${label}: ${data["datasets"][0].data[i]}`,
                        fillStyle: style.backgroundColor,
                        strokeStyle: style.borderColor,
                        lineWidth: style.borderWidth,
                        pointStyle: pointStyle,
                        hidden: !chart.getDataVisibility(i),

                        // Extra data used for toggling the correct item
                        index: i,
                      };
                    });
                  }
                  return [];
                },
              },
              onClick(e, legendItem, legend) {
                legend.chart.toggleDataVisibility(legendItem.index);
                legend.chart.update();
              },
              padding: 80,
            },
            datalabels: {
              color: "#000000",
              formatter: (value, ctx) => {
                let sum = 0;
                let dataArr = ctx.chart.data.datasets[0].data;
                dataArr.map((data) => {
                  sum += Number(data);
                });
                let percentage = ((value * 100) / sum).toFixed(1);
                return isNaN(value)
                  ? "0%"
                  : !isNaN(percentage)
                  ? percentage.toString().split(".")[1] == 0
                    ? percentage.toString().split(".")[0] + "%"
                    : percentage + "%"
                  : "0%";
              },
              anchor: "end",
              align: "start",
              offset: -20,
              clamp: false,
            },
            tooltip: {
              titleColor: "#fff",
              footerColor: "#fff",
              boxWidth: 0,
              boxHeight: 0,
              displayColors: false,
              callbacks: {
                footer: (data) => {
                  const context = data[0];
                  const sum = context.dataset.data.reduce(
                    (prev, curr) => prev + Number(curr),
                    0
                  );
                  return `Total: ${sum}`;
                },
                label: (context) => {
                  const sum = context.dataset.data.reduce(
                    (prev, curr) => prev + Number(curr),
                    0
                  );
                  let percentage = ((context.raw * 100) / sum).toFixed(1);
                  return `Amount: ${context.raw} (${
                    !isNaN(percentage)
                      ? percentage.toString().split(".")[1] == 0
                        ? percentage.toString().split(".")[0] + "%"
                        : percentage + "%"
                      : "0%"
                  })`;
                },
                labelTextColor: function (context) {
                  return "#fff";
                },
              },
            },
          },
          categoryPercentage: 1,
          borderRadius: 15,
          barPercentage: 0.8,
        };
        const element = document.getElementById(props.data.id);
        const canvas = element.querySelector(".chartsjs");
        element &&
          new Chart(canvas, {
            type: "bar",
            data: data,
            options: options,
            plugins: [ChartDataLabels],
          });
      };

      if (typeof someExtLib == "undefined") {
        const dataLabels = document.createElement("script");
        dataLabels.setAttribute("type", "text/javascript");
        dataLabels.src =
          "https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0";
        document.body.appendChild(dataLabels);
        const script = document.createElement("script");
        script.onload = initLib;
        script.setAttribute("type", "text/javascript");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js";
        document.body.appendChild(script);
      } else {
        initLib();
      }
    }
  };
  const config = {
    chartType: "gjs-charts-bar",
    chartScript: script,
    chartBlockName: "Bar Chart",
    ...opts,
  };
  addTraits(editor, config);
  addBlocks(editor, config);
  addComponents(editor, config);
});
