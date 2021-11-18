import React from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Button } from '@mui/material';
import { useAppSelector } from 'app/store';
import { Widget } from 'app/types';
import { SelectDatasource } from './SelectDatasource';
import { ConfigGrouping } from './ConfigGrouping';

export type EditorStepsProps = {
  widget: Partial<Widget>;
  onChange: (widget: Partial<Widget>) => void;
};

export function EditorSteps(props: EditorStepsProps) {
  const { widget, onChange } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const datasources = useAppSelector((state) => state.datasource.allDatasources);

  const handleChangeDs = (datasource: string) => {
    const { id, size, title } = widget;
    onChange({ id, size, title, datasource });
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      <Step>
        <StepLabel>选择数据集</StepLabel>
        <StepContent>
          <SelectDatasource datasources={datasources} value={widget.datasource} onChange={handleChangeDs} />
          <Box>
            <Button onClick={() => setActiveStep(1)}>下一步</Button>
          </Box>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>配置数据转换方案</StepLabel>
        <StepContent>
          <ConfigGrouping value={widget} onChange={onChange} />
          <Box>
            <Button onClick={() => setActiveStep(0)}>返回</Button>
            <Button onClick={() => setActiveStep(2)}>下一步</Button>
          </Box>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Dashboard组件</StepLabel>
        <StepContent>
          <Box>
            <Button onClick={() => setActiveStep(1)}>返回</Button>
            <Button onClick={() => setActiveStep(2)}>确定</Button>
          </Box>
        </StepContent>
      </Step>
    </Stepper>
  );
}
