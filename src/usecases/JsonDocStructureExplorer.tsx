import * as React from 'react';
import { Button, Container, Form, Header, Segment, SegmentInline, TextArea } from 'semantic-ui-react';
import { FPTreeItem } from '../components/flat-path-tree-explorer/FPTreeExplorerModel';
import { TreeNode } from '../components/flat-path-tree-explorer/InMemoryFPTreeExplorerModel';
import { ModalFPTreeExplorerOnInMemoryModelView } from '../components/flat-path-tree-explorer/ModalFPTreeExplorerOnInMemoryModelView';
import { SimpleHtmlFPTreeExplorerOnInMemoryModelView } from '../components/flat-path-tree-explorer/SimpleHtmlFPTreeExplorerOnInMemoryModelView';
import { Convert, Doc, SAMPLE_JSON } from './Doc';

interface JsonDocStructureExplorerState {
    json: string;
    doc?: Doc;
    modal: boolean;
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
    const [state, setState] = React.useState<JsonDocStructureExplorerState>({json: SAMPLE_JSON, modal: false});

    const showModalExplorer = state.doc && state.modal;
    const showInlineExplorer = state.doc && !state.modal;

    const parseJson = (modal: boolean) => {
        try {
            const doc = Convert.toDoc(state.json);
            setState({...state, doc: doc, parsingError: undefined, selectedItem: undefined, modal: modal});
        } catch(e) {
            setState({...state, parsingError: e as Error, doc: undefined, selectedItem: undefined});     
        }
        
    };

    return <Container style={{ margin: 20 }}>
        
        <Segment>
            <Form>
                <Header size="small">
                    <TextArea 
                        id="ta"
                        rows={state.doc ? 10 : 20}
                        cols={70}
                        value={state.json}
                        onChange={e => setState({...state, json: e.target.value})}
                    />
                </Header>
                {!state.doc &&     
                <SegmentInline >
                    <Button onClick={() => parseJson(false)}>Explore</Button>
                    <Button onClick={() => parseJson(true)}>Explore in a Modal</Button>        
                </SegmentInline>
                }
            </Form>
        </Segment>
        {state.parsingError && 
            <p style={{color: "red"}}>{state.parsingError?.message}</p>
        }
        {showInlineExplorer &&
            <Segment>
            <SegmentInline>
            <SimpleHtmlFPTreeExplorerOnInMemoryModelView 
                tree={mapDocToTreeNode(state.doc!)}
                postItemSelection={selItem => setState({...state, doc: undefined, selectedItem: selItem})}
            />
            </SegmentInline>
            </Segment>
        }
        {showModalExplorer &&
            <ModalFPTreeExplorerOnInMemoryModelView 
                title={"Select Document"}
                tree={mapDocToTreeNode(state.doc!)}
                postItemSelection={selItem => setState({...state, doc: undefined, selectedItem: selItem})}
                >
            </ModalFPTreeExplorerOnInMemoryModelView>
        }
        {state.selectedItem && 
            <p>
                Selected Doc: <b>{state.selectedItem.text}</b>
            </p>
        }
    </Container>;
};

export default JsonDocStructureExplorer;
