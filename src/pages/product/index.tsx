import { useState, FormEvent, ChangeEvent } from "react";
import Head from "next/head";
import { Header } from "@/components/ui/Header";
import { canSSRAuth } from "@/utils/casSSRAuth";
import { toast } from "react-toastify";

import styles from "./styles.module.scss";

import { setupAPIClient } from "@/services/api";

import { Input, TextArea } from "@/components/ui/InputField/index";
import { FiUpload } from "react-icons/fi";

import { CategoryProps } from "@/interface/CategoryProduct";

export default function Product({ categoryList }: CategoryProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleChangeCategory(e) {
    setCategorySelected(e.target.value);
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    try {
      const data = new FormData();

      if (name === "" || price === "") {
        toast.error("Preecha os campos obrigatórios");
        return;
      }

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", categories[categorySelected].id);
      data.append("file", imageAvatar);

      const apiClient = setupAPIClient();

      await apiClient.post("/new-product", data);

      toast.success("Produto cadastrado com sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao cadastrar");
    }

    setName("");
    setPrice("");
    setDescription("");
    setImageAvatar(null);
    setAvatarUrl("");
  }

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.replace(/[^\d]/g, "");
    const numericValue = parseFloat(newValue) / 100;
    const formattedValue = numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setPrice(formattedValue);
  }

  return (
    <>
      <Head>
        <title>CoddeWave - Produtos</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <label>
              <span>
                <FiUpload size={30} color="#fff" />
              </span>

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={50}
                />
              )}
            </label>

            <select value={categorySelected} onChange={handleChangeCategory}>
              <option value="" disabled selected hidden>
                Selecione uma categoria
              </option>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <Input
              type="text"
              placeholder="Digite o nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Digite o valor"
              value={price}
              onChange={handlePriceChange}
            />

            <TextArea
              placeholder="Descreva seu produto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className={styles.button} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apliClient = setupAPIClient(ctx);

  const response = await apliClient.get("/categories");

  return {
    props: {
      categoryList: response.data,
    },
  };
});
