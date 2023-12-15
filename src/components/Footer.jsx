import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import theme from "../Styles/Styles";
import { notifyInfo } from "../utils/helper";
import { icons } from "../utils/icons";
const Footer = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleTimeNavigate = () => {
    if (user) {
      navigate("/diagnosis-times");
    } else {
      notifyInfo("يجب عليك تسجيل الدخول أولا");
      navigate("/login");
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "text.secondary",
        mt: "250px",
        pt: "100px",
        pb: "20px",
        borderTopRightRadius: "80px",
        borderTopLeftRadius: "80px",
        position: "relative",

        // background:
        //   " linear-gradient( 109.6deg, rgba(45,116,213,1) 11.2%, rgba(121,137,212,1) 91.2% )",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Box
          sx={{
            borderRadius: "50px",
            py: "50px",
            position: "absolute",
            top: "-200px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 30px)",
            backgroundImage:
              " linear-gradient( 109.6deg, rgba(45,116,213,1) 11.2%, rgba(121,137,212,1) 91.2% )",
          }}
        >
          <Container maxWidth="xl" sx={{ textAlign: "center" }}>
            <Typography
              component="h4"
              variant="h4"
              color="light.main"
              fontSize={"2.5rem"}
              fontWeight="bold"
            >
              البدء بالتشخيص
            </Typography>
            <Button
              variant="outlined"
              color="light"
              sx={{
                mt: "20px",
                fontWeight: "bold",
              }}
              onClick={handleTimeNavigate}
            >
              ابدأ الان
            </Button>
          </Container>
        </Box>
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={6} lg={4}>
            <div className="social-icons">
              {icons.map((icon, index) => (
                <a href={icon.link} key={index} target="_blank">
                  {<icon.component w={20} h={20} />}
                </a>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ textAlign: "center" }}>
            <Typography color="light.main">
              {" "}
              Specialist &copy; 2023 All Rights Reserved
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            sx={{
              display: "flex",
              justifyContent: "end",
              [theme.breakpoints.down("md")]: {
                justifyContent: "center",
              },
            }}
          >
            <CardMedia
              component="img"
              image={logo}
              alt="logo"
              sx={{
                width: 80.5,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
