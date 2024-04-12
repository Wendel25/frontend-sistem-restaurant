import Head from "next/head";
import { Header } from "@/components/ui/Header";
import { canSSRAuth } from "@/utils/casSSRAuth";
import styles from "./styles.module.scss";
import { ListProduct } from "@/components/Products";

export default function Product() {
  return (
    <>
      <Head>
        <title>CoddeWave - Produtos</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.title}>
            <h1 className='text-white text-3xl font-bold'>Produtos</h1>
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
