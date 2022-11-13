import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const AfterInputAddon = ({ type, disabled, onClick }) => {
  switch (type) {
    case "add":
      return <PlusOutlined disabled={disabled} onClick={onClick} />;
    case "minus":
      return <MinusOutlined disabled={disabled} onClick={onClick} />;

    default:
      return null;
  }
};

export default AfterInputAddon;
