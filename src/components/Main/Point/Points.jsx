import {
  PsychologyOutlined,
  ShieldTwoTone,
  ShowChartSharp,
} from "@mui/icons-material";
import { Box, Container } from "@mui/material";
import program from "../../../assets/images/Points/plan.png";
import measure from "../../../assets/images/Points/measure.png";
import feel from "../../../assets/images/Points/feel.png";
import Point from "./Point";
const Points = () => {
  return (
    <Box py={"150px"}>
      <Container maxWidth="xl">
        <Point
          Icon={ShieldTwoTone}
          img={program}
          text={[
            "المقاييس النفسية",
            "خطط علاجية متكاملة مبنية على أسس علمية",
            "برامج متكاملة لمجموعة من المشكلات النفسية الأكثر شيوعًا مثل الاكتئاب والقلق ، مكونة من عدة جلسات فردية مع مختص مؤهل و دليل تثقيفي وتمارين مساعدة تقدم بأسعار رمزية.",
          ]}
        />
        <Point
          Icon={ShowChartSharp}
          img={measure}
          reverse
          text={[
            "البرامج العلاجية",
            "مقــــاييس القــلق والاكتئــاب",
            "مجموعة من الاسئلة المقننة التي تساعدك بشكل مبدأي في تقييم حالتك ومعرفة مستوى الشدة الحالي حتى يتمكن المختص في تقديم الخدمه بشكل افضل.",
          ]}
        />
        <Point
          Icon={PsychologyOutlined}
          img={feel}
          text={[
            "كيف تشعر اليوم",
            "خاصية تتبع المزاج اليومي",
            "خاصية متتبع المزاج اليومي تساعدك على رفع الوعي بنفسك ومتابعة مدى تحسن مزاجك على مر الأيام.",
          ]}
        />
      </Container>
    </Box>
  );
};

export default Points;
