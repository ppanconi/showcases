import React from "react";

export interface FPTreeItem {
    key: string;
    text: string;
    iconName?: string;
  }
  
export interface FPTreeExplorableItem {
    item: FPTreeItem;
    path: FPTreeItem[];
    children?: FPTreeItem[];
  }

export interface FPTreeExplorerModelProvider {
    currentItem: FPTreeExplorableItem;
    onExploreItem: (item: FPTreeItem) => void;
    onSelectItem: (item: FPTreeItem) => void;
    selectedItem?: FPTreeItem;
}

export type FPTreeExplorerProps<P = unknown> = P & FPTreeExplorerModelProvider

export const FPTreeExplorerModelContext = React.createContext<FPTreeExplorerModelProvider|undefined>(undefined);