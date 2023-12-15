// export const API_URL = "http://mohamedasalam-001-site1.etempurl.com/api";
// export const API_URL = "http://specialistorg-001-site1.btempurl.com/api";
export const API_URL = "http://servercompany7-001-site1.btempurl.com/api";
export const PATHS = (isAdmin) => [
  { name: "Dashboard", path: "/", multiple: false },
  {
    name: "Times",
    path: "/times",
    multiple: true,
    subPaths: isAdmin
      ? [
          { name: "View Times", path: "" },
          { name: "Staff Times", path: "staff-times" },
        ]
      : [{ name: "Staff Times", path: "staff-times" }],
  },
  isAdmin
    ? { name: "Specialities", path: "/specialities", multiple: false }
    : null,
  {
    name: "Videos",
    path: "/videos",
    multiple: true,
    subPaths: isAdmin
      ? [
          { name: "View videos", path: "" },
          { name: "Add video", path: "upload" },
          { name: "staff Videos", path: "staff-videos" },
        ]
      : [
          { name: "Add video", path: "upload" },
          { name: "staff Videos", path: "staff-videos" },
        ],
  },

  {
    name: "Articles",
    path: "/articles",
    multiple: true,
    subPaths: isAdmin
      ? [
          { name: "View Articles", path: "" },
          { name: "Add Article", path: "add-article" },
          { name: "staff Articles", path: "staff-articles" },
        ]
      : [
          { name: "Add Article", path: "add-article" },
          { name: "staff Articles", path: "staff-articles" },
        ],
  },
  isAdmin ? { name: "Users", path: "/users", multiple: false } : null,
  isAdmin
    ? {
        name: "Bouquets",
        path: "/bouquets",
        multiple: true,
        subPaths: [
          { name: "View Bouquets", path: "" },
          { name: "Add Bouquet", path: "add-bouquet" },
        ],
      }
    : null,
  isAdmin
    ? {
        name: "Video Types",
        path: "/videoTypes",
        multiple: false,
      }
    : null,
  {
    name: "Files",
    path: "/files",
    multiple: true,
    subPaths: isAdmin
      ? [
          { name: "View Files", path: "" },
          { name: "Add File", path: "add-file" },
          { name: "staff Files", path: "staff-files" },
        ]
      : [
          { name: "Add File", path: "add-file" },
          { name: "staff Files", path: "staff-files" },
        ],
  },
  {
    name: "Reports",
    path: "/reports",
    multiple: true,
    subPaths: isAdmin
      ? [
          { name: "View Reports", path: "" },
          { name: "Add Report", path: "add-report" },
          { name: "staff Reports", path: "staff-reports" },
        ]
      : [
          { name: "Add Report", path: "add-report" },
          { name: "staff Reports", path: "staff-reports" },
        ],
  },
  {
    name: "Votes",
    path: "/votes",
    multiple: true,
    subPaths: isAdmin
      ? [
          { name: "View Votes", path: "" },
          { name: "staff Votes", path: "staff-votes" },
        ]
      : [{ name: "staff Votes", path: "staff-votes" }],
  },
];
export const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block", "image", "link"],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button,
];
export const modules = {
  toolbar: {
    container: toolbarOptions,
  },
  clipboard: {
    matchVisual: false,
  },
};

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];
export const HostUrl = "http://servercompany7-001-site1.btempurl.com";
export const imageUrlToFile = async (imageUrl) => {
  // Fetch the image data from the URL
  try {
    // Fetch the image data from the URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Image fetch failed with status: ${response.status}`);
    }

    // Read the image data as a blob
    const blob = await response.blob();
    console.log(
      blob,
      "blobblobblobblobblobblobblobblobblobblobblobblobblobblobblob",
      response
    );
    // Create a File object from the Blob
    const file = new File([blob], blob.type, { type: blob.type });
    console.log(file, "Ssssssssssssssssssssssssssssssssssssssssssssss");
    return file;
  } catch (error) {
    console.error(error);
    return null; // Return null in case of an error
  }
};
