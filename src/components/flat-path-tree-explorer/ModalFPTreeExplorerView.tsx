import * as React from 'react';
import {
    Button,
    Modal,
    ModalActions,
    ModalContent,
    ModalDescription,
    ModalHeader
} from 'semantic-ui-react';
import { FPTreeExplorerProps } from './FPTreeExplorerModel';
import { SimpleHtmlFPTreeExplorerView } from './SimpleHtmlFPTreeExplorerView';

export interface ModalFPTreeExplorerViewProps {
    open: boolean;
    title: string;
    onClose?: (event: React.MouseEvent<HTMLElement>, data: ModalFPTreeExplorerViewProps) => void
    onOpen?: (event: React.MouseEvent<HTMLElement>, data: ModalFPTreeExplorerViewProps) => void
}

const ModalFPTreeExplorerView: React.FunctionComponent<FPTreeExplorerProps<ModalFPTreeExplorerViewProps>> = (props) => {

  return  (
    <Modal
      onClose={props.onClose ? (e, _) => props.onClose!(e, props) : undefined }
      onOpen={props.onOpen ? (e, _) => props.onOpen!(e, props) : undefined }
      open={props.open}
    >
      <ModalHeader>{props.title}</ModalHeader>
      <ModalContent>
        <ModalDescription>
            <SimpleHtmlFPTreeExplorerView {...props}></SimpleHtmlFPTreeExplorerView>
        </ModalDescription>
      </ModalContent>
      {props.onClose &&
        <ModalActions>
            <Button
            content="Ok"
            labelPosition='right'
            icon='checkmark'
            onClick={(e, _) => props.onClose!(e, props)}
            positive
        />
        </ModalActions>
      }
    </Modal>
  );
};

export default ModalFPTreeExplorerView;
