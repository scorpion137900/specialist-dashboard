import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "ar",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      ar: {
        translation: {
          headerTitle: "معكم في رحلة الأمل",
          Links: [
            { path: "/", name: "الرئيسية" },
            { path: "/specialists", name: "المختصين" },
            { path: "/blogs", name: "المدونة" },
            { path: "/videos", name: "فيديوهات" },
            { path: "/pricing", name: "البرامج" },
            { path: "/complaint", name: "الشكاوي" },
            { path: "/rooms", name: "الغرفة" },
            { path: "/times", name: "مواعيد الحجز" },
          ],
        },
      },
      en: {
        translation: {
          headerTitle: "With you in the journey of hope",
          Links: [
            { path: "/", name: "Home" },
            { path: "/specialists", name: "Specialists" },
            { path: "/blogs", name: "Blogs" },
            { path: "/videos", name: "Videos" },
            { path: "/pricing", name: "Pricing" },
            { path: "/complaint", name: "Complaint" },
            { path: "/rooms", name: "Rooms" },
            { path: "/times", name: "Booking Times" },
          ],
        },
      },
    },
  });

export default i18n;
