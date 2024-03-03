import { WithInMemoryFPTreeExplorerModelProps, withInMemoryFPTreeExplorerProviderModel } from "./InMemoryFPTreeExplorerModel";
import ModalFPTreeExplorerView, { ModalFPTreeExplorerViewProps } from "./ModalFPTreeExplorerView";

export type ModalFPTreeExplorerOnInMemoryModelViewProps = WithInMemoryFPTreeExplorerModelProps & ModalFPTreeExplorerViewProps

export const ModalFPTreeExplorerOnInMemoryModelView = withInMemoryFPTreeExplorerProviderModel(ModalFPTreeExplorerView)