import { Trans, useTranslation } from "react-i18next";

const Header = ({ first, second, title, imgSrc }) => {
  return (
    <div
      className="header"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="title">
        <img src={imgSrc} />
        <span className="yellow">
          <Trans i18nKey={first}></Trans>{" "}
        </span>
        <span className="purple">
          <Trans i18nKey={second}></Trans>
        </span>
      </div>
      <div className="intro">
        <Trans i18nKey={title}></Trans>
      </div>
    </div>
  );
};

export default Header;
