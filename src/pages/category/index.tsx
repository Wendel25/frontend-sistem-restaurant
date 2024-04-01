import { canSSRAuth } from "@/utils/casSSRAuth";
import { useState, FormEvent } from "react";
import Head from "next/head";
import { Header } from "@/components/ui/Header";
import { toast } from "react-toastify";

import styles from "./styles.module.scss";

import { setupAPIClient } from "@/services/api";

import { Input } from '@/components/ui/InputField'

export default function Category() {
  const [name, setName] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (name === "") {
      toast.error("Preencha sua categoria");
      return;
    }

    const apiCliente = setupAPIClient();
    try {
      await apiCliente.post("/new-category", {
        name: name,
      });

      toast.success("Categoria cadastrada!");
      setName("");
    } catch (error) {
      if (
        error.response &&
        error.response.data.error === "Category already exists"
      ) {
        toast.error("Esta categoria já existe.");
      } else {
        console.error("Erro ao cadastrar categoria:", error);
        toast.error("Erro ao cadastrar categoria!");
      }
    }
  }

  return (
    <>
      <Head>
        <title>CoddeWave - Categorias</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Digite a categoria"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button type="submit">Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});