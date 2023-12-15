import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Container } from "@mui/material";
const details = [
  {
    title: " كيف أجد المختص المناسب؟",
    content:
      " من طريق الفلاتر، بإمكانك تحديد المشكلة التي تبحث عن حل لها، السعر  المناسب لك، ونوع المختص",
  },
  {
    title: " ماهي طريقة التواصل مع المختصين؟",
    content:
      "يمكنك التواصل مع المختصين عبر الاتصال الصوتي أو الفيديو أو المحادثة من داخل التطبيق",
  },
  {
    title: " ماهي طريقة حجز جلسة ؟",
    content:
      " تحميل تطبيق لبيه، وإنشاء حساب خاص بك، ثم الدخول على صفحة المختصين وبعدها اختيار المختص المناسب، ومن ثم حجز جلسة بعد ذلك، تواصل بكل خصوصية مع المختص في صفحة المواعيد عبر الشات او الاتصال الصوتي او الفيديو بعدها تقييم الجلسة",
  },
];
const AccordionSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="xl" sx={{ my: "40px" }}>
      {details.map((item, index) => (
        <Accordion
          sx={{ backgroundColor: "bg" }}
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography sx={{ color: "main", fontWeight: "600" }}>
              {item.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color={"text.secondary"} fontWeight="600">
              {item.content}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default AccordionSection;
