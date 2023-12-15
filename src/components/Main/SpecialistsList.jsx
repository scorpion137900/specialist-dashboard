import { Box, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import theme from "../../Styles/Styles";
const disease = ["اضطرابات الأطفال", "الاكتئاب", "الفصام", " الوسواس القهري"];
const SpecialistsList = () => {
  return (
    <>
      <Box
        sx={{
          my: "80px",
          py: "100px",
          borderTopRightRadius: "200px",
          boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          minHeight: "50vh",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            clipPath: "circle(50% at 100% 100%)",

            width: "100%",
            height: "100%",
            left: "0",
            top: "0",
            background:
              "linear-gradient( 109.6deg, rgba(45,116,213,1) 11.2%, rgba(121,137,212,1) 91.2% )",
            opacity: "0.2",
          }}
        ></Box>
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                component="h4"
                sx={{ fontWeight: "700", color: "text.secondary" }}
              >
                مختصون مرخصون على مدار الساعة
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{
                  my: "20px",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "text.secondary",
                }}
              >
                أفضل الأطباء والأخصائيين النفسيين والأسريين المرخصين لتقديم
                الجلسات بسهولة وخصوصية عبر التطبيق.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "end",
                [theme.breakpoints.down("md")]: {
                  justifyContent: "center",
                },
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  maxWidth: "450px",
                  width: "100%",
                  p: "40px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  borderTopRightRadius: "60px",
                  borderBottomLeftRadius: "60px",
                  backgroundColor: "bg",
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    color: "text.secondary",
                  }}
                >
                  <Typography color="text.secondary">
                    30M دقيقة استشارية
                  </Typography>
                  <MoreTimeIcon
                    sx={{
                      color: "primary.main",
                    }}
                  />
                </Paper>
                <Paper
                  elevation={1}
                  sx={{
                    p: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography color="text.secondary">610+ مختص مرخص</Typography>
                  <SupervisedUserCircleIcon
                    sx={{
                      color: "primary.main",
                    }}
                  />
                </Paper>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {disease.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        background:
                          "linear-gradient( 109.6deg, rgba(45,116,213,1) 11.2%, rgba(121,137,212,1) 91.2% )",
                        color: "#fff",
                        width: "fit-content",
                        p: "10px ",
                        fontSize: "13px",
                        fontWeight: "600",
                        borderRadius: "5px",
                        display: " inline-flex",
                        cursor: "pointer",
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SpecialistsList;
