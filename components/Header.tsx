import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link className={"md:flex-1"} href={"/"}>
        <Image
          src={"/assets/icons/logo.svg"}
          alt={"Logo with name"}
          className={"hidden md:block"}
          width={120}
          height={32}
        />
        <Image src={"/assets/icons/logo-icon.svg"} alt={"Logo"} className={"mr-2 md:hidden"} width={32} height={32} />
      </Link>
      {children}
    </div>
  );
};

export default Header;