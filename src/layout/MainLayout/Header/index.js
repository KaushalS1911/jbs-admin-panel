import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase, Typography } from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import SearchSection from "./SearchSection";
import ProfileSection from "./ProfileSection";
import NotificationSection from "./NotificationSection";

// assets
import { IconMenu2 } from "@tabler/icons";
import { useSelector } from "react-redux";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const { configs } = useSelector((state) => state.configs);

  return (
    <>
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <LogoSection />
        <ButtonBase
          sx={{ borderRadius: "12px", overflow: "hidden", marginLeft: "15px" }}
        >
          <Avatar
            variant="sqaure"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              "&:hover": {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="red"
          >
            <IconMenu2 stroke={1.7} size="1.5rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      <Box
      sx={{
        marginLeft: "4rem",
        flexGrow: 1,
        display: "flex",
        "@media (max-width: 600px)": {
          marginLeft: "0",
        }
      }}
    >
        <Typography
          color="secondary"
          sx={{
            fontSize: "20px",
            fontWeight: "700",
            textTransform: "uppercase",
            wordWrap: "break-word",
            textAlign: "center",
          }}
        >
          {configs?.company_details?.name}
        </Typography>   
      </Box>
      <Box sx={{ flexGrow: 1 }} />

      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
