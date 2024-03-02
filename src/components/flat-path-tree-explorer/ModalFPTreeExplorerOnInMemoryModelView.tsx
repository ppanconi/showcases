import { WithInMemoryFPTreeExplorerModelProps, withInMemoryFPTreeExplorerProviderModel } from "./InMemoryFPTreeExplorerModel";
import ModalFPTreeExplorerView, { ModalFPTreeExplorerViewProps } from "./ModalFPTreeExplorerView";

export type ModalFPTreeExplorerOnInMemoryModelViewProps = WithInMemoryFPTreeExplorerModelProps & ModalFPTreeExplorerViewProps

// export const ModalFPTreeExplorerOnInMemoryModelView: React.FunctionComponent<ModalFPTreeExplorerOnInMemoryModelViewProps> = (props) => {
//     return <WithInMemoryFPTreeExplorerProviderModel tree={props.tree} postItemSelection={props.postItemSelection}>
//       {(modelProvider: FPTreeExplorerModelProvider) => 
//         <ModalFPTreeExplorerView
//             title={props.title}
//             open={props.open}
//             {...modelProvider}
//         />
//       }
//     </WithInMemoryFPTreeExplorerProviderModel>
//   };
export const ModalFPTreeExplorerOnInMemoryModelView = withInMemoryFPTreeExplorerProviderModel(ModalFPTreeExplorerView)