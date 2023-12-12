import Head from "next/head";
import Navbar from "../ui/Navbar/Navbar";
import styles from "./styles.module.scss";
import useSWR from "swr";
import Image from "next/image";
import { useEffect, useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MainLayout({ children, meta = {} }) {
  const { title, description } = meta;
  /*  const { data = {}, error } = useSWR("/api/config", fetcher); */
  const [tiModal, setTIModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setUser(JSON.parse(localStorage?.getItem("user")));
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f3e8e4" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainContainer}>
        <Navbar user={user} />
        <div className={styles.mainContent}>{children}</div>

        <div
          className={`modal modal-permanent ${tiModal ? "is-active" : ""}`}
          onClick={() => setTIModal(false)}
        >
          <div
            className="modal-background"
            onClick={() => setTIModal(false)}
          ></div>
          {/* <Image
            alt=""
            className="ti-logo"
            src="/assets/ti_logo.png"
            width="500"
            height="500"
          /> */}
        </div>
      </main>
    </>
  );
}
