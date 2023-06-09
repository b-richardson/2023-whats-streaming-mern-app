
import { ListItemButton, ListItemIcon, ListItemText, Menu, Typography } from "@mui/material";
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
// import { setUser } from "../../redux/features/userSlice";

const ProviderMenu = () => {
  // const { provider } = useSelector((state) => state.user);
  // const { provider } = useSelector((state) => state.provider);
  // const {provider, setProvider } = useState('All Streaming');

  // const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
      {'hello' && (
        <>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={toggleMenu}
          >
            Provider
          </Typography>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfigs.provider.map((menuOption, index) => (
              <ListItemButton
                component={Link}
                to={menuOption.path}
                key={index}
                onClick={() => setAnchorEl(null)}
              >
                <ListItemIcon>{menuOption.icon}</ListItemIcon>
                <ListItemText disableTypography primary={
                  <Typography textTransform="uppercase">{menuOption.display}</Typography>
                } />
              </ListItemButton>
            ))}
            {/* <ListItemButton
              sx={{ borderRadius: "10px" }}
              onClick={() => dispatch(setUser(null))}
            >
              <ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>
              <ListItemText disableTypography primary={
                <Typography textTransform="uppercase">sign out</Typography>
              } />
            </ListItemButton> */}
          </Menu>
        </>
      )}
    </>
  );
};

export default ProviderMenu;