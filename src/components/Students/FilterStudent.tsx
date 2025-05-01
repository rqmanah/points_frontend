import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import SortIcon from "../icons/SortIcon";
import FilterIcon from "../icons/FilterIcon";
function FilterStudent({setSort}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="d-flex gap-2 ">
      <div>
        {/* <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          border: "1px solid #707070",
          borderRadius: "200px",
          padding: "8px 16px",
        }}
      >
        <FilterIcon />
        <span style={{ color: "#3A3A3A" }}>فلتر</span>
      </Button> */}
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
          <MenuItem onClick={handleClose}>حسب الاسم</MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              setSort("asc");
            }}
          >
            تصاعدي
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              setSort("des");
            }}
          >
            تنازلي
          </MenuItem>
        </Menu>
      </div>
      <div>
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

export default FilterStudent;
