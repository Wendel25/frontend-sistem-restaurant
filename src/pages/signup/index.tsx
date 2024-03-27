import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/home.module.scss";
import logo from "../../styles/img/logo.png";

import { Input } from "./../../components/ui/Input/index";
import { Button } from "@/components/ui/Button";
import { FaUser, FaKey, FaEnvelope } from "react-icons/fa";

export default function Signup() {
  return (
    <>
      <Head>
        <title>CoddeWave - Criar conta</title>
      </Head>

      <div className={styles.container}>
        <Image
          className={styles.img}
          src={logo}
          alt="logo initial page"
          priority={true}
        />

        <div className={styles.login}>
          <h1>Criar sua conta</h1>
          <form>
            <div className={styles.containerFields}>
              <div className={styles.fields}>
                <div className={styles.containerIcon}>
                  <FaUser className={styles.icon} />
                </div>
                <Input placeholder="Digite seu nome" type="text" />
              </div>

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
              Cadastrar
            </Button>
          </form>

          <Link href="/" className={styles.text}>
            Já possui conta? Faça login
          </Link>
        </div>
      </div>
    </>
  );
}
