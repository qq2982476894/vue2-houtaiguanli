<template>
  <div class="data-view-container">
    <div id="main1"></div>
    <div id="main2"></div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      legend: null,
      xAxis: null,
      series: null,
    };
  },
  methods: {
    async getDataview() {
      const {
        data: { legend, xAxis, series },
      } = await this.$axios.getDataview();
      console.log(legend, xAxis, series);
      this.legend = legend;
      this.xAxis = xAxis;
      this.series = series;
    },
    createEchars(legend, xAxis, series) {
      // 基于准备好的dom，初始化echarts实例
      this.myChart2 = this.$echarts.init(document.getElementById('main2'));
      // 指定图表的配置项和数据
      const option = {
        title: {
          text: '会话量',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: legend,
        },
        xAxis: {
          type: 'category',
          data: xAxis,
        },
        yAxis: {
          type: 'value',
        },
        series: series,
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart2.setOption(option);
    },
  },
  async created() {
    await this.getDataview();
    this.createEchars(this.legend, this.xAxis, this.series);
  },
  mounted() {
    this.myChart1 = this.$echarts.init(document.getElementById('main1'));
    const option = {
      title: {
        text: '大佬进阶版',
      },
      tooltip: {
        trigger: 'axis',
      },

      xAxis: {
        type: 'category',
        data: ['一班', '二班', '三班', '四班', '五班', '六班'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '人数',
          type: 'bar',
          data: [45, 42, 46, 48, 52, 47],
        },
      ],
    };
    this.myChart1.setOption(option);
    window.addEventListener('resize', () => {
      this.myChart1 && this.myChart1.resize();
      this.myChart2 && this.myChart2.resize();
    });
  },
};
</script>

<style lang="less">
.data-view-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  #main1,
  #main2 {
    width: 50%;
    height: 500px;
    box-sizing: border-box;
    margin: 0 5px;
  }
}
</style>