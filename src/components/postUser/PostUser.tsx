import styles from "./postUser.module.css";
import Image from "next/image";
import { getUser } from "@/lib/data";

export default async function PostUser({ userId }: any) {
  const user = await getUser(userId);

  return (
    <>
      <Image
        src={user.img ? user.img : "/noavatar.png"}
        alt="avatar"
        width={50}
        height={50}
        className={styles.avatar}
      />
      <div className={styles.container}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user.username}</span>
      </div>
    </>
  );
}
