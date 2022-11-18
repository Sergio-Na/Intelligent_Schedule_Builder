

import { useState } from "react";

const useCourseModal = () => {
  const [isOpen, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpen);
  };

  return {
    isOpen,
    toggle
  };
}

export default useCourseModal;