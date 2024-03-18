"use client";

import Image from "next/image";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import { useState } from "react";
import { handleLogout } from "@/lib/action";

const links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Contact",
    path: "/contact",
  },
  {
    label: "Blog",
    path: "/blog",
  },
];

export default function Links({ session }: any) {
  const [open, setOpen] = useState(false);

  const isAdmin = false;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink key={link.label} item={link} />
        ))}{" "}
        {session?.user ? (
          <>
            {session.user?.isAdmin && (
              <NavLink item={{ label: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ label: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        src={"/menu.png"}
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
        className={styles.menuButton}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink key={link.label} item={link} />
          ))}
        </div>
      )}
    </div>
  );
}
