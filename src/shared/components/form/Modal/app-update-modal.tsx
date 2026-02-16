import { useScreenSize } from '@shared/hooks/use-screen';
import { Modal, ModalProps } from 'antd';
import { BaseSyntheticEvent, CSSProperties, JSX } from 'react';

const bodyStyle: CSSProperties = {
  marginTop: 20,
  marginBottom: 40,
  minHeight: 100,
  maxHeight: 400,
  overflow: 'auto',
};

type Props = {
  title: string;
  isOpen: boolean;
  closeModal: VoidFunction;
  children: JSX.Element;
  loading: boolean;
  submitHandler: (e?: BaseSyntheticEvent<object> | undefined) => void;
} & ModalProps;

function AppModal(props: Props) {
  const { isMobile } = useScreenSize();
  const { title, isOpen, closeModal, children, submitHandler, loading, ...restProps } = props;
  return (
    <Modal
      style={{ top: isMobile ? 20 : undefined }}
      title={title}
      open={isOpen}
      onCancel={closeModal}
      onOk={submitHandler}
      closable
      okText={title}
      cancelButtonProps={{
        type: 'link',
        disabled: loading,
      }}
      okButtonProps={{
        htmlType: 'submit',
        loading: loading,
      }}
      styles={{ body: bodyStyle }}
      {...restProps}
    >
      {children}
    </Modal>
  );
}

export default AppModal;
