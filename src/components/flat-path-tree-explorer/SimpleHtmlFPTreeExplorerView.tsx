import React from "react";
import { FPTreeItem, FPTreeExplorerProps } from "./FPTreeExplorerModel";
import { Breadcrumb, List, ListItem } from "semantic-ui-react";

interface SimpleHtmlFPTreeExplorerViewProps {}

export const SimpleHtmlFPTreeExplorerView: React.FunctionComponent<FPTreeExplorerProps<SimpleHtmlFPTreeExplorerViewProps>> = (props) => {
  const { currentItem, onExploreItem, onSelectItem, selectedItem } = props;

  function onClick(clickedItem: FPTreeItem) {
    if (clickedItem?.key !== currentItem.item.key) onExploreItem(clickedItem);
  }

  return (
    <div style={{textAlign: "left"}}>
      <Breadcrumb
        sections={[...currentItem.path, currentItem.item]
          .map((item, index) => ({ 
            key: item.key, 
            content: <>{item.text} <input type="radio" style={{verticalAlign: "middle"}} checked={selectedItem?.key === item.key} onChange={(_) => onSelectItem(item)}></input></>, 
            active: index === currentItem.path.length,
            onClick: index !== currentItem.path.length ? () => onClick(item) : undefined
          }))}
        icon='right angle'
      />
      <DetailsList 
         onClick={(clickedItem: FPTreeItem) => onClick(clickedItem!)}
         onSelect={onSelectItem}
         items={currentItem.children ?? []}
         selected={selectedItem}
      />
    </div>
  );
};

interface InnerProps {
    items: FPTreeItem[];
    onClick: (item: FPTreeItem) => void;
    onSelect: (item: FPTreeItem) => void;
    selected?: FPTreeItem;
}
  
const DetailsList: React.FunctionComponent<InnerProps> = ({items, onClick, onSelect, selected}) => {
  return <List bulleted>
    {items.map(item => 
      <ListItem key={item.key}>
         <a href="#" onClick={(_) => onClick(item)}>{item.text}</a>&nbsp; 
         <input 
          type="radio"
          value={item.key} 
          checked={selected?.key === item.key} 
          onChange={(_) => onSelect(item)}
          style={{verticalAlign: "middle"}}  
         ></input>
      </ListItem>
    )}
  </List>;
}