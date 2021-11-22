import React from 'react';
import { ChartPaper, ChartPaperProps } from './ChartPaper';
import { GroupResult } from 'app/editor/group';
import { ChartOptions, ReactECharts } from './ReactECharts';
import { geoCoordMap } from './geoCoordMap';

const colors = ['#f4e925', '#f37848'];

type Series = {
  name: string;
  showLabel?: boolean;
  color?: string;
  size?: 'flat' | 'scaled';
};

export type BmapChartOptions = Pick<BmapChartProps, 'title' | 'showLegend' | 'category' | 'series'>;

export type BmapChartProps = Omit<ChartPaperProps, 'children'> & {
  showLegend?: boolean;
  category?: 'city' | 'province';
  series: Series[];
  groupResult: GroupResult; // [{"上海": {销量: 39}}]
};

export function BmapChart(props: BmapChartProps) {
  const { showLegend = true, category, series: seriesData, groupResult, ...paperProps } = props;

  const series = React.useMemo<ChartOptions['series']>(() => {
    return seriesData.map(({ name, showLabel = true, color, size = 'flat' }, i) => {
      let range = [0, 0];

      const data = Object.entries(groupResult).reduce<Array<{ name: string; value: number[] }>>(
        (result, [city, data]) => {
          const geoCoord = geoCoordMap[city];
          const itemValue = data[name];
          range = [Math.min(range[0], itemValue), Math.max(range[1], itemValue)];
          return geoCoord ? [...result, { name: city, value: [...geoCoord, itemValue] }] : result;
        },
        [],
      );

      const symbolSize =
        size === 'flat'
          ? () => 20
          : (val: number[]) => {
              const value = 2 + (35 * val[2]) / (range[1] - range[0]);

              return value;
            };
      const seriesColor = color || colors[i % colors.length];

      return {
        name,
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data,
        encode: {
          value: 2,
        },
        symbolSize,
        showEffectOn: 'emphasis',
        rippleEffect: {
          brushType: 'stroke',
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: showLabel,
        },
        itemStyle: {
          color: seriesColor,
          shadowBlur: 10,
          shadowColor: '#333',
        },
        zlevel: i + 1,
      };
    });
  }, [seriesData, groupResult]);

  const option: ChartOptions = {
    backgroundColor: 'transparent',
    legend: {
      show: showLegend,
      backgroundColor: 'rgba(255,255,255,.5)',
    },

    tooltip: {
      trigger: 'item',
    },

    bmap: {
      center: [104.114129, 37.550339],
      zoom: 4,
      roam: true,
      mapStyle: {
        styleJson: [
          {
            featureType: 'water',
            elementType: 'all',
            stylers: {
              color: '#044161',
            },
          },
          {
            featureType: 'land',
            elementType: 'all',
            stylers: {
              color: '#004981',
            },
          },
          {
            featureType: 'boundary',
            elementType: 'geometry',
            stylers: {
              color: '#064f85',
            },
          },
          {
            featureType: 'railway',
            elementType: 'all',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'highway',
            elementType: 'geometry',
            stylers: {
              color: '#004981',
            },
          },
          {
            featureType: 'highway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#005b96',
              lightness: 1,
            },
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'arterial',
            elementType: 'geometry',
            stylers: {
              color: '#004981',
            },
          },
          {
            featureType: 'arterial',
            elementType: 'geometry.fill',
            stylers: {
              color: '#00508b',
            },
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'green',
            elementType: 'all',
            stylers: {
              color: '#056197',
              visibility: 'off',
            },
          },
          {
            featureType: 'subway',
            elementType: 'all',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'manmade',
            elementType: 'all',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'local',
            elementType: 'all',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'arterial',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'boundary',
            elementType: 'geometry.fill',
            stylers: {
              color: '#029fd4',
            },
          },
          {
            featureType: 'building',
            elementType: 'all',
            stylers: {
              color: '#1a5787',
            },
          },
          {
            featureType: 'label',
            elementType: 'all',
            stylers: {
              visibility: 'off',
            },
          },
        ],
      },
    },

    series,
  };

  return (
    <ChartPaper {...paperProps} size="large">
      <ReactECharts option={option} style={{ height: 500 }} size="large" />
    </ChartPaper>
  );
}
