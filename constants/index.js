import {
  Home,
  AddAPhotoOutlined,
  Search,
  BookmarkBorderOutlined,
  PersonOutlined,
} from "@mui/icons-material";

export const sidebarLinks = [
  {
    icon: <Home sx={{ color: "white", fontSize: "26px" }} />,
    route: "/",
    label: "Home",
  },
  {
    icon: <AddAPhotoOutlined sx={{ color: "white", fontSize: "26px" }} />,
    route: "/create-post",
    label: "Create Post",
  },
  // {
  //   icon: <Search sx={{ color: "white", fontSize: "26px" }} />,
  //   route: "/search",
  //   label: "Search",
  // },
  {
    icon: <BookmarkBorderOutlined sx={{ color: "white", fontSize: "26px" }} />,
    route: "/saved-posts",
    label: "Saved Posts",
  },
  {
    icon: <PersonOutlined sx={{ color: "white", fontSize: "26px" }} />,
    route: "/edit-profile",
    label: "Edit Profile",
  },
];

export const pageTitles = [
  {
    url: "/",
    title: "Feed",
  },
  {
    url: "/edit-profile",
    title: "Edit Profile",
  },
  {
    url: "/create-post",
    title: "Create Post",
  },
  {
    url: "/edit-post",
    title: "Edit Post",
  },
  {
    url: "/search",
    title: "Search",
  },
];
