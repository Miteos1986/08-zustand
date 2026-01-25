"use client";

import { RotatingLines } from "react-loader-spinner";
import css from "./loading.module.css";

function Loading() {
  return (
    <div className={css.container}>
      <RotatingLines
        strokeColor="blue"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}

export default Loading;
