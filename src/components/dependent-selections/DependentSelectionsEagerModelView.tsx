import * as React from 'react';
import { DSEagerModelProps, WithEagerDependentSelectionsProviderModel } from './DependentSelectionsEagerModel';
import DependentSelection from './DependentSelectionsView';

type DependentSelectionsEagerModelViewProps = DSEagerModelProps

const DependentSelectionsEagerModelView: React.FunctionComponent<DependentSelectionsEagerModelViewProps> = (props) => {
  return <WithEagerDependentSelectionsProviderModel {...props}>
    {(modelProvider) => <DependentSelection {...modelProvider}></DependentSelection>}
  </WithEagerDependentSelectionsProviderModel>;
};

export default DependentSelectionsEagerModelView;
