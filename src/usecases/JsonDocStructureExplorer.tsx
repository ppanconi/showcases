import * as React from 'react';
import { Convert, Doc, SAMPLE_JSON } from './Doc';
import { TreeNode } from '../components/flat-path-tree-explorer/InMemoryFPTreeExplorerModel';
import { FPTreeItem } from '../components/flat-path-tree-explorer/FPTreeExplorerModel';
import { SimpleHtmlFPTreeExplorerViewWithInMemoryModel } from '../components/flat-path-tree-explorer/SimpleHtmlFPTreeExplorerOnInMemoryModelView';

interface JsonDocStructureExplorerState {
    json: string;
    doc?: Doc;
    parsingError?: Error;
    selectedItem?: FPTreeItem;
}

function mapDocToTreeNode(doc: Doc): TreeNode {
    return {
        key: doc.title,
        text: doc.title,
        children: doc.subParts.map(d => mapDocToTreeNode(d))
    }
}

const JsonDocStructureExplorer: React.FunctionComponent = () => {
    const [state, setState] = React.useState<JsonDocStructureExplorerState>({json: SAMPLE_JSON});

    const parseJson = () => {
        try {
            const doc = Convert.toDoc(state.json);
            setState({...state, doc: doc, parsingError: undefined, selectedItem: undefined});
        } catch(e) {
            setState({...state, parsingError: e as Error, doc: undefined, selectedItem: undefined});     
        }
        
    };

    return <div>
        <textarea 
            rows={state.doc ? 10 : 20}
            cols={70}
            value={state.json}
            onChange={e => setState({...state, json: e.target.value})}
        />
        <p><button onClick={parseJson}>Explore</button></p>        
        {state.parsingError && 
            <p style={{color: "red"}}>{state.parsingError?.message}</p>
        }
        {state.doc &&
            <SimpleHtmlFPTreeExplorerViewWithInMemoryModel 
                tree={mapDocToTreeNode(state.doc)}
                postItemSelection={selItem => setState({...state, doc: undefined, selectedItem: selItem})}
            />
        }
        {state.selectedItem && 
            <p>
                Selected Doc: {state.selectedItem.text}
            </p>
        }
    </div>;
};

export default JsonDocStructureExplorer;
