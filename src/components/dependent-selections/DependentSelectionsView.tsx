import * as React from 'react';
import { DSOption, DSOptionCollection, DependentSelectionsProps } from "./DependentSelectionsModel"
import { Select } from 'semantic-ui-react';


const DependentSelection: React.FunctionComponent<DependentSelectionsProps> = (props) => {
  return <>{props.collections.map((col, i) => {
    const selected = i < props.selections.length ? props.selections[i].key : ""
    return <Select key={col.key} disabled={col.options == undefined} options={col.options ?? []} defaultValue={selected} />
  })}</>;
};



export default DependentSelection;
