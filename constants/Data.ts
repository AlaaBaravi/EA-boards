import { ProfileItem } from "./Types";

export const ProfileTabs: ProfileItem[] = [
  {
    title: "Account Info & Settings",
    icon: "settings",
    to: "/(app)/(profile)/accountInfo",
  },
  {
    title: "App Settings",
    icon: "sliders",
    to: "/(app)/(profile)/appSettings",
  },
  {
    title: "About & Feedback",
    icon: "info",
    to: "/(app)/(profile)/about",
  },
];
