import { useState } from 'react';
import { canSSRAuth } from "@/utils/casSSRAuth";
import Head from "next/head";

import styles from "./styles.module.scss";
import { Header } from "@/components/ui/Header";
import { TableCategories } from "@/components/Category/TableCategories";
import { ModalCreateNewCategory } from "@/components/Category/CreateNew";

const Category = () => {
  const [categories, setCategories] = useState([]);

  const handleCategoryCreated = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  return (
    <>
      <Head>
        <title>CoddeWave - Categorias</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <div className='flex justify-between'>
            <h1 className='text-white pb-8 text-3xl font-bold'>Categorias</h1>
            <ModalCreateNewCategory onCategoryCreated={handleCategoryCreated}/>
          </div>

          <TableCategories getCategoriesTable={categories} />
        </main>
      </div>
    </>
  );
};

export default Category;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
