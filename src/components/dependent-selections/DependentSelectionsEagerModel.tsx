import { ReactNode, useState } from "react";
import { DSOption, DSOptionCollection, DependentSelectionsModelProvider, dsOption } from "./DependentSelectionsModel";

export interface DSOptionWithDeps extends DSOption  {
    subCollection?: DSOptionCollection<DSOptionWithDeps> 
} 

// eslint-disable-next-line react-refresh/only-export-components
export const dsOptionWithDeps = (key: string,  label: string, subCollection?: DSOptionCollection<DSOptionWithDeps>): DSOptionWithDeps => ({
    ...dsOption(key, label),
    subCollection: subCollection
})

export interface DSEagerModelProps {
    entryCollection: DSOptionCollection<DSOptionWithDeps>;
    selections: DSOption[];
    onSelect: (selected: DSOption[]) => void;
}

interface InnerState {
    currentSelections: DSOption[];
}

function findSelectedCollections(currentCollection: DSOptionCollection<DSOptionWithDeps>, selections: DSOption[])
    : DSOptionCollection<DSOption>[] {

    if (selections.length > 0) {
        const subCollection = currentCollection.options!.find(op => op.key === selections[0].key)!.subCollection;
        if (subCollection != undefined ) {
            return [currentCollection, ... findSelectedCollections(subCollection, selections.slice(1))]        
        }
    } 
    return [currentCollection]; 
}

function useModelProvider(props: DSEagerModelProps) : DependentSelectionsModelProvider {
    const [state, setState] = useState<InnerState>({currentSelections: props.selections});

    const selectedCollections = findSelectedCollections(props.entryCollection, state.currentSelections)

    return {
        selections: state.currentSelections,    
        collections: selectedCollections,
        onSelect: (selected => { 
            setState({...state, currentSelections: selected});
            props.onSelect(selected);
        })
    };
}

export interface WithEagerDependentSelectionsProviderModelProps extends DSEagerModelProps {
    children: (modelProvider: DependentSelectionsModelProvider) => ReactNode;
}

export const WithEagerDependentSelectionsProviderModel: React.FunctionComponent<WithEagerDependentSelectionsProviderModelProps> = (props: WithEagerDependentSelectionsProviderModelProps) => {
    const modelProvider = useModelProvider(props);
    return <>{props.children(modelProvider)}</>
}
