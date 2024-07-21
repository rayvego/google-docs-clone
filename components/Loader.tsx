import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className={"loader"}>
      <Image src={"/assets/icons/loader.svg"} alt={"loader"} height={32} width={32} className={"animate-spin"}></Image>
      Loading...
    </div>
  );
};

export default Loader;