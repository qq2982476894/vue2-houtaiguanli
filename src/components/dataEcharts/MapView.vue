<template>
  <div class="map-view-container">
    <div id="map"></div>
  </div>
</template>

<script>
import geoJson from '@/assets/geo.json';
export default {
  data() {
    return {};
  },
  mounted() {
    const myChart = this.$echarts.init(document.getElementById('map'));
    this.$echarts.registerMap('china', geoJson);
    console.log(geoJson);
    myChart.setOption({
      backgroundColor: 'rgb(57,76,108)',
      geo: {
        emphasis: {
          focus: 'self',
          itemStyle: {
            color: '#f40',
            areaColor: '#fff',
          },
        },
        map: 'china',
        aspectScale: 0.75,
        zoom: 1.1,
        roam: true,
        label: {
          show: true,
          fontWeight: 'bolder',
          textStyle: {
            color: '#fff',
          },
          emphasis: {
            focus: 'self',
            textStyle: {
              color: '#f40',
              areaColor: '#fff',
            },
          },
        },
        itemStyle: {
          normal: {
            borderColor: '#f40',
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.2,
              colorStops: [
                {
                  offset: 0,
                  color: '#08c0ff',
                },
                {
                  offset: 1,
                  color: '#3f2b96',
                },
              ],
              globalCoord: true,
            },
            shadowColor: '#fff',
            shadowOffsetX: 2,
            shadowOffsetY: 4,
          },
        },
        regions: [
          {
            name: '南海诸岛',
          },
        ],
      },

      //   series: [
      //     {
      //       type: 'map',
      //       zoom: 1.1,
      //       map: 'china',
      //       aspectScale: 1.1,
      //       label: {
      //         show: true,
      //         fontWeight: 'bolder',
      //         textStyle: {
      //           color: '#fff',
      //         },
      //         emphasis: {
      //           focus: 'self',
      //           textStyle: {
      //             color: '#f40',
      //             areaColor: '#fff',
      //           },
      //         },
      //       },
      //       itemStyle: {
      //         normal: {
      //           borderColor: '#f40',
      //           areaColor: {
      //             type: 'radial',
      //             x: 0.5,
      //             y: 0.5,
      //             r: 0.2,
      //             colorStops: [
      //               {
      //                 offset: 0,
      //                 color: '#08c0ff',
      //               },
      //               {
      //                 offset: 1,
      //                 color: '#3f2b96',
      //               },

      //             ],
      //             globalCoord: true,
      //           },
      //           shadowColor: '#08c0ff',
      //           shadowOffsetX: 1,
      //           shadowOffsetY: 5,
      //         },
      //       },
      //     },
      //   ],
    });

    myChart.on('click', function (params) {
      const { name } = params;
      console.log(name);
      const data = geoJson.features.find((item) => {
        return item.properties.name === name;
      });

      console.log(data);
    });
  },
};
</script>

<style lang="less">
.map-view-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  #map {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 590px;
  }
}
</style>