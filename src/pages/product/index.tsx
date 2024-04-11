import Head from "next/head";
import { Header } from "@/components/ui/Header";
import { canSSRAuth } from "@/utils/casSSRAuth";
import styles from "./styles.module.scss";
import { ListProduct } from "@/components/Products/ListProduct";

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
            <h1>Produtos</h1>
          </div>

          <div className={styles.content}>
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
