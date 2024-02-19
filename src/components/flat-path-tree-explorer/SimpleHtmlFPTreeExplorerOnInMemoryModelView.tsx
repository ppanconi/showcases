import * as React from 'react';
import { useContext } from 'react';
import { FPTreeExplorerModelContext, FPTreeItem } from './FPTreeExplorerModel';
import { SimpleHtmlFPTreeExplorerView } from './SimpleHtmlFPTreeExplorerView';
import { WithInMemoryFPTreeExplorerModelProps, WithInMemoryFPTreeExplorerProviderModel } from './InMemoryFPTreeExplorerModel';

export const SimpleHtmlFPTreeExplorerViewWithInMemoryContextModel: React.FunctionComponent = () => {
  const modelProvider = useContext(FPTreeExplorerModelContext);
  return <>{modelProvider ?
      <SimpleHtmlFPTreeExplorerView 
        {...modelProvider}
        /> 
    : <p>no tree model provided</p>
  }
  </>;
};


export const SimpleHtmlFPTreeExplorerViewWithInMemoryModel: React.FunctionComponent<WithInMemoryFPTreeExplorerModelProps> = (props) => {
  return <WithInMemoryFPTreeExplorerProviderModel tree={props.tree} postItemSelection={props.postItemSelection}>
    {(modelProvider: FPTreeExplorerModelProvider) => 
      <SimpleHtmlFPTreeExplorerView
          {...modelProvider}
      />
    }
  </WithInMemoryFPTreeExplorerProviderModel>
};




