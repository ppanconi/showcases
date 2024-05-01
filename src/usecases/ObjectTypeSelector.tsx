import * as React from 'react';

import { DSOptionWithDeps, dsOptionWithDeps } from '../components/dependent-selections/DependentSelectionsEagerModel';
import { dsOptionCollection } from '../components/dependent-selections/DependentSelectionsModel';
import DependentSelectionsEagerModelView from '../components/dependent-selections/DependentSelectionsEagerModelView';


const options = [
    { key: "TABLE", text: "Table", enabled: true },
    { key: "CHART", text: "Chart", enabled: true },
    { key: "CHECKBOX", text: "Checkbox", enabled: true },
    { key: "DROPDOWN_LIST", text: "Dropdown List", enabled: true },
    { key: "FREE_TEXT", text: "Free Text", enabled: true },
    { key: "AMOUNT", text: "Amount", enabled: true },
    { key: "DIMENSION_ATTRIBUTE", text: "Dimension Attribute", enabled: true },
    { key: "DOCUMENT_PART_INCLUDE", text: "Document Part Include", enabled: false },
    /* { key: 'DYNAMIC_FIELD', text: 'Dynamic Field' },
    { key: 'IMAGE', text:'Image'}*/
  ];


const ObjectTypeSelector: React.FunctionComponent = () => {

  const dsOptions: DSOptionWithDeps[] = options.map(
    o => o.key === "FREE_TEXT" ? 
      dsOptionWithDeps("FREE_TEXT_MAIN_TYPE", 
        "Text", 
        dsOptionCollection("FREE_TEXT_SUBTYPE", "Text Types", 
          [dsOptionWithDeps("FREE_TEXT", "Free Text"), dsOptionWithDeps("TGK_TEXT", "TGK Text")], "radio"
      )
    )
    :
    dsOptionWithDeps(o.key, o.text)
  );

  const optionsCollections = dsOptionCollection("OBJECT_TYPES", "Objects Types", dsOptions);

  return <DependentSelectionsEagerModelView 
            entryCollection={optionsCollections}
            onSelect={(selected) => console.log("selected:", selected.map(o => o.label).join(","))}
            selections={[]}/>;
};

export default ObjectTypeSelector;
