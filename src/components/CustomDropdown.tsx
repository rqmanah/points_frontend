import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { useState } from "react";

function CustomDropDown({ title, children }: any) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex">
      <Dropdown
        style={{ backgroundColor: "#ff5050" }}
        isOpen={dropdownOpen}
        toggle={toggle}
        color="primary"
      >
        <DropdownToggle caret>{title}</DropdownToggle>
        <DropdownMenu>{children}</DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default CustomDropDown;
