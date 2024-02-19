import React from "react";
import { FPTreeItem, FPTreeExplorerProps } from "./FPTreeExplorerModel";

interface SimpleHtmlFPTreeExplorerViewProps {}

export const SimpleHtmlFPTreeExplorerView: React.FunctionComponent<FPTreeExplorerProps<SimpleHtmlFPTreeExplorerViewProps>> = (props) => {
  const { currentItem, onExploreItem, onSelectItem, selectedItem } = props;

  function onClick(clickedItem: FPTreeItem) {
    if (clickedItem?.key !== currentItem.item.key) onExploreItem(clickedItem);
  }

  return (
    <div style={{textAlign: "left"}}>
      <Breadcrumb
        items={[...currentItem.path, currentItem.item]}
        onClick={ (clickedItem: FPTreeItem) => onClick(clickedItem!)}
        onSelect={onSelectItem}
        selected={selectedItem}
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

const Breadcrumb: React.FunctionComponent<InnerProps> = ({ items, onClick, onSelect, selected }) => {
    return (
      <div>
        <p>
          {items.map((item, index) => (
            <span key={index}> {" > "}
              {index === items.length - 1 ? (
                <b>{item.text}</b>
              ) : (
                <a href="#" onClick={(_) => onClick(item)}>{item.text}</a>
              )}
              <input type="radio" checked={selected?.key === item.key} onChange={(_) => onSelect(item)}></input>
            </span>
          ))}
        </p>
      </div>
    );
  };
  
const DetailsList: React.FunctionComponent<InnerProps> = ({items, onClick, onSelect, selected}) => {
  return <ul>
    {items.map(item => <li key={item.key}>
      <a href="#" onClick={(_) => onClick(item)}>{item.text}</a>
      <input 
        type="radio"
        value={item.key} 
        checked={selected?.key === item.key} 
        onChange={(_) => onSelect(item)}></input>
    </li>)}
  </ul>;
}