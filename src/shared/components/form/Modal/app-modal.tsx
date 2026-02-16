import { useScreenSize } from '@shared/hooks/use-screen';
import { Modal, ModalProps } from 'antd';
import { BaseSyntheticEvent, CSSProperties, JSX } from 'react';

const bodyStyle: CSSProperties = {
  padding: 5,
  marginTop: 20,
  marginBottom: 20,
  minHeight: 100,
  maxHeight: 400,
  overflow: 'auto',
  background: 'var(--color-off-white)',
  border: '1px solid var(--color-gray-600)',
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
      style={{ top: isMobile ? 5 : undefined }}
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
      styles={{
        body: bodyStyle,
        content: { paddingRight: isMobile ? 8 : undefined, paddingLeft: isMobile ? 8 : undefined },
      }}
      {...restProps}
    >
      {children}
    </Modal>
  );
}

export default AppModal;
