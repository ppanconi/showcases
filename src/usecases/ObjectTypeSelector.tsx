import * as React from 'react';
import { DSOption, DependentSelectionProps, eagerCollection } from '../components/dependent-selections/DependentSelectionsModel';
import DependentSelection from '../components/dependent-selections/DependentSelectionsView';


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

  const dsOptions = options.map(o => o.key === "FREE_TEXT" ? 
    { key: "FREE_TEXT_MAIN_TYPE", 
      label: o.text, 
      subOptions: eagerCollection("FREE_TEXT_SUBTYPE", [{key: "FREE_TEXT", label: "Free Text"}, {key: "TGK_TEXT", label: "TGK Text"}])
    }
    :
     {
      key: o.key, 
      label: o.text
    });

  const optionsCollections = eagerCollection("OBJECT_TYPES", dsOptions);

  return <DependentSelection 
            optionsCollection={optionsCollections}
            onSelection={(selected) => console.log("selected:", selected)}
            selected={[]}/>;
};

export default ObjectTypeSelector;
