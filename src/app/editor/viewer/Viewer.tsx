import React from 'react';
import { ChartSpec, Widget } from 'app/types';
import { useAppSelector } from 'app/store';
import { DatasourceView } from './DatasourceView';
import { group } from '../group';
import { OutputView } from './OutputView';
import { ChartView } from './ChartView';

export type ViewerProps = {
  widget: Partial<Widget>;
};

export function Viewer(props: ViewerProps) {
  const { widget } = props;
  const { datasource: datasourceId } = widget;

  const datasource = useAppSelector((state) => {
    if (datasourceId) {
      return state.datasource.allDatasources.find((ds) => ds.id === datasourceId);
    }
  });

  const groupResult = React.useMemo(() => {
    if (datasource) {
      if (widget.label && datasource.meta.schema.findIndex((s) => `$${s.field}` === widget.label!.trim()) >= 0)
        if (widget.output && widget.output.length > 0) {
          try {
            return group(datasource, widget.label, widget.output);
          } catch (err) {
            console.error(err);
          }
        }
    }
  }, [datasource, widget]);

  const charts: ChartSpec[] | null = widget.charts && widget.charts.length > 0 ? widget.charts : null;

  return (
    <article>
      {datasource && <DatasourceView datasource={datasource} />}
      {groupResult && <OutputView widget={widget as Widget} groupResult={groupResult} />}
      {groupResult && charts && <ChartView groupResult={groupResult} charts={charts} />}
    </article>
  );
}
