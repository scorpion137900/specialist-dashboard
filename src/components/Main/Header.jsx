import { Button, CardMedia, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import HeaderPhoto from "../../assets/images/HeaderPhoto.svg";
import header from "../../assets/images/header.png";
import theme from "../../Styles/Styles";
import { notifyInfo } from "../../utils/helper";
const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
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
        minHeight: "80vh",
        backgroundColor: "bg",
        borderBottomLeftRadius: "50px",
        borderBottomRightRadius: "150px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          pt: "90px",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              [theme.breakpoints.down("md")]: {
                textAlign: "center",
              },
            }}
          >
            <Typography
              component={"h3"}
              variant="h3"
              sx={{
                color: "text.secondary",
                fontWeight: "600",
              }}
            >
              {t("headerTitle")}
            </Typography>
            <Typography
              component={"p"}
              variant="body1"
              sx={{
                color: "text.main",
                fontSize: "18px",
                fontWeight: "600",
                my: "30px",
              }}
            >
              جلسات نفسية وأسرية ، بكل سهولة وخصوصية
            </Typography>
            <Button variant="outlined" onClick={handleTimeNavigate}>
              البدء بالتشخيص
            </Button>
          </Grid>
          <Grid item xs={12} md={6} sx={{ overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={header}
              height="120%"
              sx={{
                pt: "50px",
                position: "relative",
                top: "30px",
                objectFit: "cover",
                width: "110%",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
