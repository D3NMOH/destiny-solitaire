import type { List } from "@/types";

const bgPrefix = "themes/bg/";
const shirtPrefix = "themes/shirts/";
const suitPrefix = "themes/suits/";

export const backgroundTheme: List[] = [
  { id: 1, name: "Default", path: "" },
  { id: 2, name: "Dark", path: bgPrefix + "Dark" },
  { id: 3, name: "Light-Dark", path: bgPrefix + "Light-Dark" },
];

export const shirtTheme: List[] = [
  { id: 1, name: "Default", path: "" },
  { id: 2, name: "Destiny 2", path: shirtPrefix + "D2" },
  { id: 3, name: "The Treveler", path: shirtPrefix + "Traveler" },
  { id: 4, name: "The Witch Queen", path: shirtPrefix + "witch" },
  { id: 5, name: "Beyond Light", path: shirtPrefix + "bl" },
  { id: 6, name: "Lightfall", path: shirtPrefix + "Lightfall" },
  { id: 7, name: "The Final Shape", path: shirtPrefix + "FinalShape" },
  { id: 8, name: "Heart", path: shirtPrefix + "Heart" },
  { id: 9, name: "The Edge of Fate", path: shirtPrefix + "eof" },
  { id: 10, name: "Year of Prophecy", path: shirtPrefix + "yop" },
];

export const suitTheme: List[] = [
  { id: 1, name: "Default", path: "" },
  { id: 2, name: "Classic Light", path: suitPrefix + "classic_light" },
  { id: 3, name: "Classic Dark", path: suitPrefix + "classic_dark" },
];
