import { PropsWithChildren, useState, ReactNode } from "react"
import { FPTreeExplorerModelContext, FPTreeExplorerModelProvider, FPTreeItem } from "./FPTreeExplorerModel"

/**
 * generic business logic
 */
export interface TreeNode {
    key: string;
    text: string;
    iconName?: string;
    children?: TreeNode[];
}

interface InnerState {
    currentNode: TreeNode;
    path: TreeNode[];
    selectedNode?: TreeNode;
}

function findNode(tree: TreeNode, key: string, path: TreeNode[]) : {currentNode: TreeNode, path: TreeNode[]}|null {
    if (tree.key === key) 
        return {currentNode: tree, path};  
    if (tree.children)
        for (const i of tree.children) {
            const res = findNode(i, key, [...path, tree]);
            if (res) return res; 
        }
    return null;
}
// -----------------------

/**
 * hook to link generic business logic to
 * specific React state management 
 */
function useModelProvider(props: WithInMemoryFPTreeExplorerModelProps): FPTreeExplorerModelProvider {
    const [state, setState] = useState<InnerState>({currentNode: props.tree, path: []});

    return {
        currentItem: {
            item: state.currentNode,
            children: state.currentNode.children,
            path: state.path
        },
        onExploreItem: (item) => setState(findNode(props.tree, item.key, [])!),
        selectedItem: state.selectedNode,
        onSelectItem: (item) => {
            setState({ ...state, selectedNode: item });
            if (props.postItemSelection) props.postItemSelection(item);
        }
    };
}

export interface WithInMemoryFPTreeExplorerModelProps {
    tree: TreeNode;
    postItemSelection?: (item: FPTreeItem) => void;
}

export const WithInMemoryFPTreeExplorerContextModel: React.FunctionComponent<PropsWithChildren<WithInMemoryFPTreeExplorerModelProps>> = (props) => {

    const modelProvider = useModelProvider(props);
    
    return <FPTreeExplorerModelContext.Provider
        value={modelProvider}>
        <div>{props.children}</div>
    </FPTreeExplorerModelContext.Provider>
}

export interface WithInMemoryFPTreeExplorerProviderModel extends WithInMemoryFPTreeExplorerModelProps {
    children: (modelProvider: FPTreeExplorerModelProvider) => ReactNode;
}

export const WithInMemoryFPTreeExplorerProviderModel: 
    React.FunctionComponent<PropsWithChildren<WithInMemoryFPTreeExplorerProviderModel>> = (props) => {

    const modelProvider = useModelProvider(props);
    
    return <>{props.children(modelProvider)}</>;
}

