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

export interface DSOptionCollection {
    key: DSOptionCollectionKey
    options?: DSOption[]
}

export const dsOptionCollection = (key: string,  options?: DSOption[]): DSOptionCollection => ({
    key: key as DSOptionCollectionKey,
    options: options
})

export interface DependentSelectionsModelProvider {
    selections: DSOption[];
    collections: DSOptionCollection[];
    onSelect: (selected: DSOption) => void;
}

export type DependentSelectionsProps<P = unknown> = P & DependentSelectionsModelProvider
