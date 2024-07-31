import { ConfirmationCompProps } from '@interface/UiInterfaces';
import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

const ConfirmationComp: React.FC<ConfirmationCompProps> = ({
  heading = 'Confirmation Box',
  content,
  forSave = 'Save',
  forCancel = 'Cancel',
  cancelClick,
  saveClick,
}) => {
  return (
    <div>
      <Title level={2}>{heading}</Title>
      <p className="contentMd">{content}</p>
      <div className="flex justify-end mt-4 gap-4">
        <Button onClick={cancelClick}>{forCancel}</Button>
        <Button onClick={saveClick} type="primary">
          {forSave}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationComp;
