
import React, { ReactNode} from "react";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

const AddTermToBoardModal = (props: ModalType) => {
  return (
    <>
      {props.isOpen && (
        <div onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()}>
            {props.children}
          </div>
        </div>
      )};

    </>
  );
};

export default AddTermToBoardModal
