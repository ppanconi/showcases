import * as React from 'react';
import { useContext } from 'react';
import { FPTreeExplorerModelContext, FPTreeExplorerModelProvider } from './FPTreeExplorerModel';
import { WithInMemoryFPTreeExplorerModelProps, WithInMemoryFPTreeExplorerProviderModel } from './InMemoryFPTreeExplorerModel';
import { SimpleHtmlFPTreeExplorerView } from './SimpleHtmlFPTreeExplorerView';

export const SimpleHtmlFPTreeExplorerOnInMemoryContextModelView: React.FunctionComponent = () => {
  const modelProvider = useContext(FPTreeExplorerModelContext);
  return <>{modelProvider ?
      <SimpleHtmlFPTreeExplorerView 
        {...modelProvider}
        /> 
    : <p>no tree model provided</p>
  }
  </>;
};

export const SimpleHtmlFPTreeExplorerOnInMemoryModelView: React.FunctionComponent<WithInMemoryFPTreeExplorerModelProps> = (props) => {
  return <WithInMemoryFPTreeExplorerProviderModel tree={props.tree} postItemSelection={props.postItemSelection}>
    {(modelProvider: FPTreeExplorerModelProvider) => 
      <SimpleHtmlFPTreeExplorerView
          {...modelProvider}
      />
    }
  </WithInMemoryFPTreeExplorerProviderModel>
};




