import * as React from 'react';
import { DSOption, DSOptionCollection, DependentSelectionsModelProvider, DependentSelectionsProps, updateSelection,  } from "./DependentSelectionsModel"


const DependentSelection: React.FunctionComponent<DependentSelectionsProps> = (props) => {

  return <>{props.collections.map((col, collectionIndex) => 
    col.type === "radio" 
      ? <RadioCollection key={col.key + "_sel"} model={props} collection={col} collectionIndex={collectionIndex} />
      : <SelectCollection key={col.key + "_sel"} model={props} collection={col} collectionIndex={collectionIndex} />
  )}</>;
};

const SelectCollection: React.FunctionComponent<{model: DependentSelectionsModelProvider, collection: DSOptionCollection<DSOption>, collectionIndex: number}> = 
  ({model, collection, collectionIndex}) => {
  const selected = collectionIndex < model.selections.length ? model.selections[collectionIndex].key : "";
    
  return <p key={collection.key + "_p"}>
    <label key={collection.key + "_label"}>{collection.title}:</label><br />
    <select 
      key={collection.key} 
      disabled={collection.options == undefined} 
      onChange={(e) => updateSelection(model, collectionIndex, e.target.value) }
      value={selected}
    >
      {collection.options?.map(op => 
          <option value={op.key} key={op.key}>{op.label}</option>
      )}
      </select>
  </p>
}

const RadioCollection: React.FunctionComponent<{model: DependentSelectionsModelProvider, collection: DSOptionCollection<DSOption>, collectionIndex: number}> = 
  ({model, collection, collectionIndex}) => {
    const selectedKey = collectionIndex < model.selections.length ? model.selections[collectionIndex].key : "";
    console.log(`selectedKey: ${selectedKey}`);
    return <>{collection.options?.map(op => 
      <label key={op.key}>
        <input type="radio" value={op.key} name={collection.key} checked={selectedKey === op.key} 
               onChange={(e) => updateSelection(model, collectionIndex, e.target.value)}/>
              {op.label}&nbsp;&nbsp;
        </label>
    )}</>
    
}

export default DependentSelection;
