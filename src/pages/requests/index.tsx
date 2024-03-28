import { casSSRAuth } from "../../utils/casSSRAuth";

import Head from "next/head";

import { Header } from "@/components/ui/Header";

export default function Dashboard() {
  return (
    <>
      <Head>
      <title>CoddeWave - Pedidos</title>
      </Head>

      <div>
        <Header />
      </div>
    </>
  );
}

export const getServerSideProps = casSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
