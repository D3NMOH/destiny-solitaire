import type { List } from "@/types";

// icons
// suits
import destinyIcon from "@/assets/Destiny.svg";
import spadesIcon from "@/assets/Spades.svg";
import spadesOutlineIcon from "@/assets/Spades_outline.svg";
// BGs
import lightDarkIcon from "@/assets/DestinyLightDark.svg";

import destiny2Icon from "@/assets/Destiny2.svg";
import trevelerIcon from "@/assets/Traveler.svg";
import witchQueenIcon from "@/assets/WitchQueen.svg";
import beyondLightIcon from "@/assets/BeyondLight.svg";
import lightfallIcon from "@/assets/Lightfall.svg";
import finalShapeIcon from "@/assets/FinalShape.svg";
import heartIcon from "@/assets/Heart.svg";
import eofIcon from "@/assets/EdgeOfFate.svg";
import yopIcon from "@/assets/YearOfProphecy.svg";
import renegadesIcon from "@/assets/Renegades.svg";

const bgPrefix = "themes/bg/";
const shirtPrefix = "themes/shirts/";
const suitPrefix = "themes/suits/";

export const backgroundTheme: List[] = [
  { id: 1, name: "Default", path: "", icon: destinyIcon },
  { id: 2, name: "Dark", path: bgPrefix + "Dark", icon: destiny2Icon },
  {
    id: 3,
    name: "Light-Dark",
    path: bgPrefix + "Light-Dark",
    icon: lightDarkIcon,
  },
];

export const shirtTheme: List[] = [
  { id: 1, name: "Default", path: "", icon: destinyIcon },
  { id: 2, name: "Destiny 2", path: shirtPrefix + "D2", icon: destiny2Icon },
  {
    id: 3,
    name: "The Treveler",
    path: shirtPrefix + "Traveler",
    icon: trevelerIcon,
  },
  {
    id: 4,
    name: "The Witch Queen",
    path: shirtPrefix + "witch",
    icon: witchQueenIcon,
  },
  {
    id: 5,
    name: "Beyond Light",
    path: shirtPrefix + "bl",
    icon: beyondLightIcon,
  },
  {
    id: 6,
    name: "Lightfall",
    path: shirtPrefix + "Lightfall",
    icon: lightfallIcon,
  },
  {
    id: 7,
    name: "The Final Shape",
    path: shirtPrefix + "FinalShape",
    icon: finalShapeIcon,
  },
  {
    id: 8,
    name: "Heart",
    path: shirtPrefix + "Heart",
    icon: heartIcon,
  },
  {
    id: 9,
    name: "The Edge of Fate",
    path: shirtPrefix + "eof",
    icon: eofIcon,
  },
  {
    id: 10,
    name: "Year of Prophecy",
    path: shirtPrefix + "yop",
    icon: yopIcon,
  },
  {
    id: 11,
    name: "Renegades",
    path: shirtPrefix + "Renegades",
    icon: renegadesIcon,
  },
];

export const suitTheme: List[] = [
  { id: 1, name: "Default", path: "", icon: destinyIcon },
  {
    id: 2,
    name: "Classic Light",
    path: suitPrefix + "classic_light",
    icon: spadesIcon,
  },
  {
    id: 3,
    name: "Classic Dark",
    path: suitPrefix + "classic_dark",
    icon: spadesOutlineIcon,
  },
];
