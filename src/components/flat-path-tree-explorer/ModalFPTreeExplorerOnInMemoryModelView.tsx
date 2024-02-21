import { FPTreeExplorerModelProvider } from "./FPTreeExplorerModel";
import { WithInMemoryFPTreeExplorerModelProps, WithInMemoryFPTreeExplorerProviderModel } from "./InMemoryFPTreeExplorerModel";
import ModalFPTreeExplorerView, { ModalFPTreeExplorerViewProps } from "./ModalFPTreeExplorerView";

export type ModalFPTreeExplorerOnInMemoryModelViewProps = WithInMemoryFPTreeExplorerModelProps & ModalFPTreeExplorerViewProps

export const ModalFPTreeExplorerOnInMemoryModelView: React.FunctionComponent<ModalFPTreeExplorerOnInMemoryModelViewProps> = (props) => {
    return <WithInMemoryFPTreeExplorerProviderModel tree={props.tree} postItemSelection={props.postItemSelection}>
      {(modelProvider: FPTreeExplorerModelProvider) => 
        <ModalFPTreeExplorerView
            title={props.title}
            open={true}
            {...modelProvider}
        />
      }
    </WithInMemoryFPTreeExplorerProviderModel>
  };