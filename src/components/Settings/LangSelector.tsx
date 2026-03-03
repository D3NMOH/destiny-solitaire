import styles from "./Settings.module.css";
import { languages } from "@/data/translations";

export default function LangSelector({ language, setLanguage }: any) {
  return (
    <div className={styles["select-list"]}>
      {languages.map((lang) => (
        <div
          className={styles["select-item"]}
          style={{
            backgroundColor: lang.id === language ? "#fff1" : "transparent",
          }}
          key={lang.id}
          onClick={() => {
            setLanguage(lang.id);
          }}
          title={lang.name}
        >
          {lang.name}
        </div>
      ))}
    </div>
  );
}
