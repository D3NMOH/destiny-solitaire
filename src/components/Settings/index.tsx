import { Activity, useState } from "react";
import { Card } from "../Card";
import Selector from "./Selector";
import LangIcon from "@/assets/icons/LangIcon";
import ThemeIcon from "@/assets/icons/ThemeIcon";
import ShirtIcon from "@/assets/icons/ShirtIcon";
import ThemeSwitchIcon from "@/assets/icons/ThemeSwitchIcon";
import { langStore } from "@/stores/langStore";
import { translations } from "@/data/translations";
import styles from "./Settings.module.css";
import logo from "../../assets/logo.webp";
import pkg from "../../../package.json";
import InfoIcon from "@/assets/icons/InfoIcon";
import ReactIcon from "@/assets/icons/ReactIcon";
import ZustandIcon from "@/assets/icons/ZustandIcon";
import GameIcon from "@/assets/icons/GameIcon";
import type { Card as CardType } from "@/types";

export default function Settings({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const { language } = langStore();
  const localizedText = translations[language];

  const tabs = [
    { id: 0, icon: LangIcon },
    { id: 1, icon: ThemeSwitchIcon },
    { id: 2, icon: ThemeIcon },
    { id: 3, icon: ShirtIcon },
    { id: 4, icon: InfoIcon },
  ];

  const aboutItems = [
    { title: "Game", icon: GameIcon, value: pkg.version },
    {
      title: "React",
      icon: ReactIcon,
      value: pkg.dependencies.react.replace("^", ""),
    },
    {
      title: "Zustand",
      icon: ZustandIcon,
      value: pkg.dependencies.zustand.replace("^", ""),
    },
  ];

  const cardsPreview: { cardProps: CardType; gridArea: string }[] = [
    {
      cardProps: {
        id: "1",
        suit: "Solar",
        rank: "10",
        faceUp: true,
      },
      gridArea: "1 / 1 / 2 / 2",
    },
    {
      cardProps: {
        id: "2",
        suit: "Void",
        rank: "Q",
        faceUp: true,
      },
      gridArea: "1 / 2 / 2 / 3",
    },
    {
      cardProps: {
        id: "3",
        suit: "Stasis",
        rank: "A",
        faceUp: true,
      },
      gridArea: "2 / 1 / 3 / 2",
    },
    {
      cardProps: {
        id: "4",
        suit: "Strand",
        rank: "K",
        faceUp: true,
      },
      gridArea: "2 / 2 / 3 / 3",
    },
    {
      cardProps: {
        id: "5",
        suit: "Strand",
        rank: "10" as const,
        faceUp: false,
      },
      gridArea: "1 / 3 / 3 / 5",
    },
  ];

  return (
    <div
      className={styles.settings}
      style={{
        pointerEvents: show ? "auto" : "none",
        opacity: show ? 1 : 0,
        transform: ` translateY(${show ? 0 : "-100%"})`,
      }}
    >
      <div>
        <h2 style={{ paddingBottom: "20px" }}>{localizedText?.settings}</h2>
        <button className={styles["close-btn"]} onClick={() => setShow(false)}>
          <div className={styles["close-btn--1"]} />
          <div className={styles["close-btn--2"]} />
        </button>
      </div>
      <div className={styles["settings-container"]}>
        <section className={styles["settings-tabs"]}>
          {tabs.map((Tab) => (
            <button
              key={Tab.id}
              className={styles["settings-tab"]}
              onClick={() => setActiveTab(Tab.id)}
              style={{
                backgroundColor: activeTab === Tab.id ? "#fff3" : "transparent",
              }}
            >
              <Tab.icon />
            </button>
          ))}
        </section>
        <section className={styles["settings-content"]}>
          <Activity mode={activeTab !== 4 ? "visible" : "hidden"}>
            <Selector
              selLang={activeTab === 0}
              selSuit={activeTab === 1}
              selTheme={activeTab === 2}
              selShirt={activeTab === 3}
            />
          </Activity>
          <Activity mode={activeTab === 4 ? "visible" : "hidden"}>
            <img src={logo} alt="logo" className={styles.logo} />
            <div className={styles["about"]}>
              <div className={styles["about-content"]}>
                {aboutItems.map((item, index) => (
                  <p key={index} className={styles["about-item"]}>
                    <item.icon />
                    <strong>{item.title}:</strong>
                    <span>v{item.value}</span>
                  </p>
                ))}
              </div>
              <div className={styles["about-footer"]}>
                <a
                  href="https://github.com/D3NMOH/destiny-solitaire"
                  target="_blank"
                >
                  <span>by D3NMOH</span>{" "}
                  <img
                    src="../../assets/Github.svg"
                    alt="Github"
                    height="20px"
                  />
                </a>
              </div>
            </div>
          </Activity>
          <Activity mode={activeTab !== 4 ? "visible" : "hidden"}>
            <div className={styles["card-preview-container"]}>
              <center>
                <h3>{localizedText?.preview}</h3>
              </center>
              <div className={styles["card-preview"]}>
                {cardsPreview.map((card) => (
                  <Card
                    key={card.cardProps.id}
                    card={card.cardProps}
                    style={{
                      position: "relative",
                      aspectRatio: "10/14",
                      width: "100%",
                      height: "100%",
                      gridArea: card.gridArea,
                    }}
                  />
                ))}
              </div>
            </div>
          </Activity>
        </section>
      </div>
    </div>
  );
}
