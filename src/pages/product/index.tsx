import Head from "next/head";
import { Header } from "@/components/ui/Header";
import { canSSRAuth } from "@/utils/casSSRAuth";
import styles from "./styles.module.scss";

import { ListProduct } from "@/components/Products";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

export default function Product() {
  return (
    <>
      <Head>
        <title>CoddeWave - Produtos</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <div className='flex justify-between'>
            <h1 className='text-white text-3xl font-bold'>Produtos</h1>

            <Button color="success" variant="contained" className='flex items-center gap-2'>
              <AddIcon />
              Produto
            </Button>
          </div>

          <div className='mt-6 '>
            <ListProduct />
          </div>
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
