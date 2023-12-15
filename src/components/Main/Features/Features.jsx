import { Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import theme from "../../../Styles/Styles";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";
import ShutterSpeedTwoToneIcon from "@mui/icons-material/ShutterSpeedTwoTone";
import SupportAgentTwoToneIcon from "@mui/icons-material/SupportAgentTwoTone";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import EmergencyRecordingOutlinedIcon from "@mui/icons-material/EmergencyRecordingOutlined";
import VpnLockOutlinedIcon from "@mui/icons-material/VpnLockOutlined";
// background-color: #0093E9;
// background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
const Features = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ py: "100px", textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h4"
          sx={{ fontWeight: "600", color: "text.secondary" }}
        >
          منصة الرفاهية النفسية
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{
            my: "30px",
            fontSize: "18px",
            width: "50%",
            mx: "auto",
            color: "text.main",
            [theme.breakpoints.down("md")]: {
              width: "90%",
            },
          }}
        >
          تطبيق specialist هو الحل المتكامل لتقديم خدمات الرعاية والرفاهية
          النفسية عن بعد، عبر الجلسات والمحاضرات ومجموعات الدعم المقدمة من
          المختصين المرخصين.
          <br />
          جلسات نفسية على مدار الساعة ، بأمان وخصوصية ، يقدمها لك أفضل الأطباء و
          المعالجين النفسيين المرخصين.
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          my={"50px"}
          sx={{
            "& p": {
              color: "light.main",
              fontSize: "20px",
              fontWeight: "600",
            },
            "& svg": {
              fill: "light.main",
              color: "light.main",
              fontSize: "40px",
            },
          }}
        >
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper
              elevation={6}
              sx={{
                background:
                  "linear-gradient(to right, var(--main-color),var(--text-secondary))",
                p: "25px",
              }}
            >
              <ManageHistoryOutlinedIcon />
              <Typography variant="body1" component={"p"}>
                جلسات مجدولة
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper
              sx={{
                background:
                  "linear-gradient(to bottom, var(--main-color),var(--text-secondary))",
                p: "25px",
                backgroundImage:
                  "linear-gradient( 109.6deg,  var(--main-color) 11.2%, rgba(121,137,212,1) 91.2% )",
              }}
              elevation={6}
            >
              <ShutterSpeedTwoToneIcon />
              <Typography variant="body1" component={"p"}>
                جلسات فورية
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper
              sx={{
                // background: "linear-gradient(to right, #000046, #1cb5e0)",
                background:
                  "linear-gradient(to left, var(--main-color),var(--text-secondary))",
                p: "25px",
                backgroundColor: " #8EC5FC",
                backgroundImage:
                  "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
              }}
              elevation={6}
            >
              <SupportAgentTwoToneIcon />
              <Typography variant="body1" component={"p"}>
                مجموعات دعم
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper
              elevation={6}
              sx={{
                background:
                  "linear-gradient(to top, var(--main-color),var(--text-secondary))",
                backgroundImage:
                  " radial-gradient( circle farthest-corner at 10% 20%,  rgba(97,186,255,1) 0%, rgba(166,239,253,1) 90.1% )",
                p: "25px",
              }}
            >
              <HealthAndSafetyOutlinedIcon />
              <Typography variant="body1" component={"p"}>
                برامج علاجية
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper
              elevation={6}
              sx={{
                background:
                  "linear-gradient(to left, var(--main-color),var(--text-secondary))",
                p: "25px",
                backgroundImage:
                  "linear-gradient( 109.6deg,  rgba(45,116,213,1) 11.2%, rgba(121,137,212,1) 91.2% )",
              }}
            >
              <EmergencyRecordingOutlinedIcon />
              <Typography variant="body1" component={"p"}>
                لقاءات مسجلة
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Paper
              elevation={6}
              sx={{
                background:
                  "linear-gradient(to left, var(--main-color),var(--text-secondary))",
                p: "25px",
                backgroundImage:
                  "linear-gradient( 109.6deg,  rgba(45,116,213,1) 11.2%, rgba(121,137,212,1) 91.2% )",
              }}
            >
              <VpnLockOutlinedIcon />
              <Typography variant="body1" component={"p"}>
                خصوصية
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Features;
