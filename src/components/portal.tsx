import { createPortal } from "react-dom";

const Portal = () => {
  return createPortal(<p>This is Portal</p>, document.getElementById("portal"));
};

export default Portal;
