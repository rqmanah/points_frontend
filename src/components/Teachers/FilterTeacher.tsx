import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterIcon from "../icons/FilterIcon";
import SortIcon from "../icons/SortIcon";
function FilterTeacher({ setSort }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSort({
      sort_by: "asc",
    });
  };

  return (
    <div className="d-flex gap-2 w-100 ">
      <div className="w-100">
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{
            border: "1px solid #707070",
            borderRadius: "200px",
            padding: "8px 16px",
            width: "100%",
          }}
        >
          <SortIcon />
          <span style={{ color: "#3A3A3A", margin: "0 5px" }}>ترتيب حسب</span>
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              setSort({
                sort_by: "title",
              });
            }}
          >
            حسب الاسم
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              setSort({
                sort_by: "asc",
              });
            }}
          >
            تصاعدي
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              setSort({
                sort_by: "des",
              });
            }}
          >
            تنازلي
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default FilterTeacher;
