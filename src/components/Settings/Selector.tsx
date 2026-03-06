import styles from "./Settings.module.css";

import { themeStore } from "@/stores/themeStore";
import { langStore } from "@/stores/langStore";

import { backgroundTheme, shirtTheme, suitTheme } from "@/data/themes";
import { languages } from "@/data/translations";

import type { SelectorProps } from "@/types";

export default function Selector({
  selTheme,
  selShirt,
  selSuit,
  selLang,
}: SelectorProps) {
  const { theme, setTheme, shirt, setShirt, st, setSt } = themeStore();
  const { language, setLanguage } = langStore();

  const selector = selTheme
    ? {
        list: backgroundTheme,
        type: theme,
        set: setTheme,
      }
    : selShirt
      ? {
          list: shirtTheme,
          type: shirt,
          set: setShirt,
        }
      : selSuit
        ? {
            list: suitTheme,
            type: st,
            set: setSt,
          }
        : selLang
          ? {
              list: languages,
              type: language,
              set: setLanguage,
            }
          : null;

  return (
    <div className={styles["select-list"]}>
      {selector?.list.map((item) => (
        <div
          key={item.id}
          className={styles["select-item"]}
          style={{
            backgroundColor:
              item.id === selector.type ? "#fff1" : "transparent",
          }}
          onClick={() => {
            selector.set(item.id);
          }}
        >
          <div style={{ width: "30px", height: "30px" }}>
            <img
              src={item.icon}
              alt={item.name}
              style={{ display: item.icon ? "inline-block" : "none" }}
            />
            {typeof item.id === "string" && (
              <p
                style={{
                  backgroundColor: "#fff3",
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  width: "30px",
                  height: "30px",
                  borderRadius: "7px",
                  fontSize: "15px",
                }}
              >
                {item.id.toUpperCase()}
              </p>
            )}
          </div>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
