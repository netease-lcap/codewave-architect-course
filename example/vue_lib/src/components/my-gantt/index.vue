<template>
  <!-- Echarts 图表 -->
  <div ref="progressChart" class="progressChart" style="height: 300px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "App",
  mounted() {
    this.initChart();
  },
  methods: {
    /* 初始化图表 */
    initChart() {
      const progressChart = echarts.init(this.$refs.progressChart);
      const option = {
        // 鼠标移入提示工具
        tooltip: {
          trigger: "axis",
          formatter(params) {
            if (params[1].data && params[0].data) {
              return (
                `<div>开始时间：${params[1].data}</div>` +
                `<div>结束时间：${params[0].data}</div>`
              );
            } else {
              return "";
            }
          },
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          containLabel: true,
          show: false,
          right: 80,
          left: 40,
          bottom: 40,
          top: 20,
          backgroundColor: "#fff",
        },
        legend: {
          // 图例组件
          data: ["持续时间"],
          align: "auto",
          top: "bottom",
        },
        xAxis: {
          type: "time",
          position: "top", // x 轴位置
          axisTick: {
            // 隐藏刻度
            show: false,
          },
          axisLine: {
            // 隐藏轴线
            show: false,
          },
          splitLine: {
            // 显示网格线
            show: true,
          },
        },
        yAxis: {
          inverse: true, // y 轴数据翻转，该操作是为了保证项目一放在最上面，项目七在最下面
          axisTick: {
            // 隐藏刻度
            show: false,
          },
          axisLine: {
            // 隐藏轴线
            show: false,
          },
          data: ["项目一", "项目二", "项目三", "项目四", "项目五", "项目六", "项目七"],
        },
        series: [
          {
            name: "持续时间",
            type: "bar",
            stack: "duration",
            itemStyle: {
              color: "#007acc",
              borderColor: "#fff",
              borderWidth: 1,
            },
            zlevel: -1,
            data: [
              "2021-01-31",
              "2021-02-25",
              "2021-03-25",
              "2021-04-01",
              "2021-04-10",
              "2021-05-25",
              "2021-07-25",
            ], // 结束时间
          },
          {
            name: "持续时间",
            type: "bar",
            stack: "duration", // 堆叠标识符，同个类目轴上系列配置相同的 stack 值可以堆叠放置
            itemStyle: {
              color: "#fff",
            },
            zlevel: -1, // zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
            z: 9, // z值小的图形会被z值大的图形覆盖，z相比zlevel优先级更低，而且不会创建新的 Canvas
            data: [
              "2021-01-01",
              "2021-01-31",
              "2021-02-25",
              "2021-03-25",
              "2021-04-01",
              "2021-04-10",
              "2021-05-25",
            ], // 开始时间
          },
        ],
      };
      progressChart.setOption(option);
      // 浏览器窗口大小变化，图表大小自适应
      window.addEventListener("resize", () => {
        progressChart.resize();
      });
    },
  },
};
</script>

<style scoped>
.progressChart {
  width: 100%;
  /* height: 420px; */
  border: 1px solid #aaa;
}
</style>
