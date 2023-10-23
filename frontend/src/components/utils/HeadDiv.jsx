/* eslint-disable react/prop-types */
import React from "react";
import styles from "./HeadDiv.module.css";
const HeadDiv = ({ title }) => {
  return (
    <React.Fragment>
      <div className={styles.imgDiv}>
        <img src="/img/img1.jpg" alt="contact" className={styles.imgDesign} />
      </div>
      <div className={styles.make_opacity}>
        <h1 style={{ color: "#fff", fontSize: "45px", fontWeight: "bold" }}>
          {title}
        </h1>
      </div>
    </React.Fragment>
  );
};

export default HeadDiv;
