const Toast = ({ msg, handleShow, bgColor }) => (
  <div className={`toast ${bgColor}`} onClick={handleShow}>
    <p className={`toastText is-size-4 ${bgColor}`}>{msg.msg}</p>
  </div>
);

export default Toast;
