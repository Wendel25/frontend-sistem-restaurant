import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { FaEnvelope, FaKey } from "react-icons/fa";

import { toast } from "react-toastify";

import styles from "../styles/home.module.scss";
import logo from "../styles/img/logo.png";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import { AuthContext } from "../contexts/AuthContext";

import { casSSRGuest } from "../utils/casSSRGuest";

export default function Home() {
  const { signup } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.error("Preencha com os dados de login!");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    };

    await signup(data);

    setLoading(false);
  }

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
          <form onSubmit={handleLogin}>
            <div className={styles.containerFields}>
              <div className={styles.fields}>
                <div className={styles.containerIcon}>
                  <FaEnvelope className={styles.icon} />
                </div>
                <Input
                  placeholder="Digite seu email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.fields}>
                <div className={styles.containerIcon}>
                  <FaKey className={styles.icon} />
                </div>
                <Input
                  placeholder="Digite sua senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>

          {/*
            <Link href="/" className={styles.text}>
              Cadastrar
            </Link>
          */}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = casSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
