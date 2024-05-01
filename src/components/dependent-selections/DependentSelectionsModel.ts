type DSOptionKey = string & { readonly __tag: unique symbol }

export interface DSOption {
    key: DSOptionKey;
    label: string
}

export const dsOption = (key: string,  label: string): DSOption => ({
    key: key as DSOptionKey,
    label: label
})

type DSOptionCollectionKey = string & { readonly __tag: unique symbol }

type DSOptionCollectionType = "select" | "radio"

export interface DSOptionCollection<P extends DSOption> {
    key: DSOptionCollectionKey,
    title: string,
    type: DSOptionCollectionType,
    options?: P[]
}

export const dsOptionCollection = <P extends DSOption>(key: string, title: string, options?: P[], type?: DSOptionCollectionType,): DSOptionCollection<P> => ({
    key: key as DSOptionCollectionKey,
    title: title,
    type: type ?? "select",
    options: options
})

export interface DependentSelectionsModelProvider {
    selections: DSOption[];
    collections: DSOptionCollection<DSOption>[];
    onSelect: (selected: DSOption[]) => void;
}

export const updateSelection = (model: DependentSelectionsModelProvider, 
                                collectionIndex: number, 
                                selectedKey: string): void => {
    model.onSelect([
        ...model.selections.slice(0, collectionIndex), 
        model.collections[collectionIndex].options!.find(o => o.key === selectedKey)!
    ]);
}


export type DependentSelectionsProps<PR = unknown> = PR & DependentSelectionsModelProvider
