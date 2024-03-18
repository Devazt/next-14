"use client";

import { login } from "@/lib/action";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleGithubLogin } from "@/lib/action";
import Image from "next/image";

export default function LoginForm() {
  const [state, formAction] = useFormState(login, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/");
  }, [state?.success, router]);
  return (
    <>
      <form className={styles.github} action={handleGithubLogin}>
        <button>
          <Image
            src="/github-mark-white.svg"
            alt="github"
            width={30}
            height={30}
          />
          Login with Github
        </button>
      </form>
      <form className={styles.form} action={formAction}>
        <input type="text" placeholder="username" name="username" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <button>Login with credentials</button>
        {state?.error && <p>{state.error}</p>}
        <Link href={"/register"}>Not have an account?</Link>
      </form>
    </>
  );
}
