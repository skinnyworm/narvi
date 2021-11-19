import React from 'react';
import { Widget } from 'app/types';
import { useAppSelector } from 'app/store';
import { DatasourceView } from './DatasourceView';
import { group } from '../group';
import { OutputView } from './OutputView';

export type ViewerProps = {
  widget: Partial<Widget>;
};

export function Viewer(props: ViewerProps) {
  const { widget } = props;
  const { datasource: datasourceId, label, output } = widget;

  const datasource = useAppSelector((state) => {
    if (datasourceId) {
      return state.datasource.allDatasources.find((ds) => ds.id === datasourceId);
    }
  });

  const groupResult = React.useMemo(() => {
    if (datasource && widget.label && widget.output) {
      return group(datasource, widget.label, widget.output);
    }
  }, [datasource, widget]);

  return (
    <article>
      {datasource && <DatasourceView datasource={datasource} />}
      {groupResult && <OutputView widget={widget as Widget} groupResult={groupResult} />}
    </article>
  );
}
