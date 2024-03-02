import * as React from 'react';
import { useContext } from 'react';
import { FPTreeExplorerModelContext } from './FPTreeExplorerModel';
import { withInMemoryFPTreeExplorerProviderModel } from './InMemoryFPTreeExplorerModel';
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

export const SimpleHtmlFPTreeExplorerOnInMemoryModelView = withInMemoryFPTreeExplorerProviderModel(SimpleHtmlFPTreeExplorerView)



