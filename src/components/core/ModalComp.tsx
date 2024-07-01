import { useAppStore } from '@utils/Store';
import { Modal } from 'antd';
import React from 'react';
import { useStore } from 'zustand';

interface ModalCompProps {
  component: React.ReactNode;
  width?: string;
  closable?: boolean;
}

const ModalComp: React.FC<ModalCompProps> = ({
  component,
  width,
  closable = false,
}) => {
  const { isModelOpen } = useAppStore();
  return (
    <>
      <Modal
        open={isModelOpen}
        closable={closable}
        className="modal"
        width={width ? width : '32rem'}
        centered
        footer={null}
      >
        {component}
      </Modal>
    </>
  );
};

export default React.memo(ModalComp);
