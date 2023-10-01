import { t } from "i18next";
import classes from "./About.module.css";

export default function AboutPage() {
  return (
    <>
      <header className={classes.title}>
        <h1>{t("title.about_page")}</h1>
      </header>
      <main className={classes.main}>
        <section>
          <h2>{t("title.projects_origin")}</h2>
          <p>{t("projects_origin_description")}</p>
        </section>
        <section>
          <h2>{t("title.site_functionality")}</h2>
          <p>{t("site_functionality_description")}</p>
        </section>
        <section className={classes.info}>
          <div>
            <h4>{t("title.questions_or_hints")}</h4>
            <p>
              {t("questions_or_hints_description")}{" "}
              <a href="mailto:francesco.orlando.dev@gmail.com">
                francesco.orlando.dev@gmail.com
              </a>
            </p>
          </div>
          <div>
            <h4>{t("title.github_repo")}</h4>
            <p>
              {t("github_repo_description")}{" "}
              <a
                href="https://github.com/francesco-orlando9/league-of-legends-fe-projects/"
                target="blank"
              >
                link
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
