import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ImageEditor from './ImageEditor';
import Upload from './Upload';

const EditAndUpload = ({
  showEditor,
  showUpload,
  setShowEditor,
  setShowUpload,
}) => {
  return (
    <div>
      <CSSTransition
        in={showEditor}
        timeout={500}
        classNames="modal-left"
        unmountOnExit
      >
        <ImageEditor
          setShowEditor={setShowEditor}
          setShowUpload={setShowUpload}
        />
      </CSSTransition>
      <CSSTransition
        in={showUpload}
        timeout={500}
        classNames="modal-right"
        unmountOnExit
      >
        <Upload setShowUpload={setShowUpload} />
      </CSSTransition>
    </div>
  );
};

export default EditAndUpload;
