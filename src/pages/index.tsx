import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "../styles/home.module.scss";
import logo from "../styles/img/logo.png";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { FaEnvelope, FaKey } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Head>
        <title>CoddeWave - Faça seu login</title>
      </Head>

      <div className={styles.container}>
        <Image
          className={styles.img}
          src={logo}
          alt="logo initial page"
          priority={true}
        />

        <div className={styles.login}>
          <form>
            <div className={styles.containerFields}>
              <div className={styles.fields}>
                <div className={styles.containerIcon}>
                  <FaEnvelope className={styles.icon} />
                </div>
                <Input placeholder="Digite seu email" type="text" />
              </div>
              <div className={styles.fields}>
                <div className={styles.containerIcon}>
                  <FaKey className={styles.icon} />
                </div>
                <Input placeholder="Digite sua senha" type="password" />
              </div>
            </div>

            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>

          <Link href="/signup" className={styles.text}>
            Cadastrar
          </Link>
        </div>
      </div>
    </>
  );
}
