import { ChartSpec } from 'app/types';
import { GroupResult } from 'app/editor/group';
import { SimpleChart } from './SimpleChart';
import { BmapChart } from './BmapChart';
import { RadarChart } from './RadarChart';

export const ChartCard = ({
  actions,
  spec,
  groupResult,
}: {
  actions?: React.ReactNode;
  spec: ChartSpec;
  groupResult: GroupResult;
}) => {
  switch (spec.type) {
    case 'radar':
      return <RadarChart groupResult={groupResult} actions={actions} {...spec} />;

    case 'bmap':
      return <BmapChart groupResult={groupResult} actions={actions} {...spec} />;

    default:
      return <SimpleChart groupResult={groupResult} actions={actions} {...spec} />;
  }
};
