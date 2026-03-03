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

export default function Settings({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) {
  const [tab, setTab] = useState(0);
  const { language } = langStore();
  const localizedText = translations[language];

  const tabs = [
    { icon: LangIcon },
    { icon: ThemeSwitchIcon },
    { icon: ThemeIcon },
    { icon: ShirtIcon },
    { icon: InfoIcon },
  ];

  const aboutItems = [
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
    { title: "Game", icon: GameIcon, value: pkg.version },
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
      <div style={{ display: "flex" }}>
        <h2 style={{ paddingBottom: "20px" }}>{localizedText?.settings}</h2>
        <button className={styles["close-btn"]} onClick={() => setShow(false)}>
          <div className={styles["close-btn--1"]} />
          <div className={styles["close-btn--2"]} />
        </button>
      </div>
      <div className={styles["settings-container"]}>
        <section className={styles["settings-tabs"]}>
          {tabs.map((Tab, i) => (
            <button
              className={styles["settings-tab"]}
              onClick={() => setTab(i)}
              style={{
                backgroundColor: tab === i ? "#fff3" : "transparent",
              }}
            >
              <Tab.icon />
            </button>
          ))}
        </section>
        <section className={styles["settings-content"]}>
          <Activity mode={tab !== 4 ? "visible" : "hidden"}>
            <Selector
              selLang={tab === 0}
              selTheme={tab === 1}
              selSuit={tab === 2}
              selShirt={tab === 3}
            />
          </Activity>
          <Activity mode={tab === 4 ? "visible" : "hidden"}>
            <div className={styles.about}>
              <img src={logo} alt="logo" className={styles.logo} />
              <div className={styles["about-content"]}>
                {aboutItems.map((item, index) => (
                  <p className={styles["about-item"]}>
                    <item.icon />
                    <strong>{item.title}:</strong>
                    <span>v{item.value}</span>
                  </p>
                ))}
              </div>
              <div className={styles["about-footer"]}>by D3NMOH</div>
            </div>
          </Activity>
          <Activity mode={tab !== 4 ? "visible" : "hidden"}>
            <div className={styles["card-preview-container"]}>
              <h3 style={{ textAlign: "center" }}>{localizedText?.preview}</h3>
              <div className={styles["card-preview"]}>
                <Card
                  card={{ suit: "Solar", rank: "10", faceUp: true, id: "1" }}
                  style={{
                    position: "relative",
                    aspectRatio: "10/14",
                    width: "100%",
                    height: "100%",
                    gridArea: "1 / 1 / 2 / 2",
                  }}
                />
                <Card
                  card={{ suit: "Void", rank: "Q", faceUp: true, id: "1" }}
                  style={{
                    position: "relative",
                    aspectRatio: "10/14",
                    width: "100%",
                    height: "100%",
                    gridArea: "1 / 2 / 2 / 3",
                  }}
                />

                <Card
                  card={{ suit: "Stasis", rank: "A", faceUp: true, id: "1" }}
                  style={{
                    position: "relative",
                    aspectRatio: "10/14",
                    width: "100%",
                    height: "100%",
                    gridArea: "2 / 1 / 3 / 2",
                  }}
                />
                <Card
                  card={{ suit: "Strand", rank: "K", faceUp: true, id: "1" }}
                  style={{
                    position: "relative",
                    aspectRatio: "10/14",
                    width: "100%",
                    height: "100%",
                    gridArea: "2 / 2 / 3 / 3",
                  }}
                />

                <Card
                  card={{ suit: "Strand", rank: "10", faceUp: false, id: "1" }}
                  style={{
                    flex: 1,
                    position: "relative",
                    aspectRatio: "10/14",
                    gridArea: "1 / 3 / 3 / 5",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>
            </div>
          </Activity>
        </section>
      </div>
    </div>
  );
}
