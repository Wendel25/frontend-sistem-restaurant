import { useState } from "react";
import Head from "next/head";
import { Header } from "@/components/ui/Header";
import { canSSRAuth } from "@/utils/casSSRAuth";

import Modal from "react-modal";
import { FiRefreshCcw } from "react-icons/fi";

import styles from "./styles.module.scss";
import { setupAPIClient } from "@/services/api";

import { OrderItensProps } from "@/interface/OrderItens";
import { HomeProps } from "@/interface/OrderItens";

import { ModalOrder } from "@/components/Modal";

import { toast } from "react-toastify";

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || []);

  const [modalItem, setModalItem] = useState<OrderItensProps[]>();
  const [modalIsOpen, setIsOpen] = useState(false);

  function handleCloseModal() {
    setIsOpen(false);
  }

  async function handleOpenModal(id: string) {
    const apiCliente = setupAPIClient();

    const response = await apiCliente.get("/order/detail", {
      params: {
        order_id: id,
      },
    });

    setModalItem(response.data);
    setIsOpen(true);
  }

  async function handleFinishItem(id: string) {
    const apiCliente = setupAPIClient();

    await apiCliente.put("/order/finish", {
      order_id: id,
    });

    const response = await apiCliente.get("/orders");

    setOrderList(response.data);
    setIsOpen(false);
  }

  async function handleRefresh() {
    const apiCliente = setupAPIClient();
    const response = await apiCliente.get("/orders");

    toast.info("Pedidos atualizados!")
    setOrderList(response.data);
  }

  Modal.setAppElement("#__next");

  return (
    <>
      <Head>
        <title>CoddeWave - Pedidos</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>

            <button onClick={handleRefresh}>
              <FiRefreshCcw color="#248EA6" size={25} />
            </button>
          </div>

          <article className={styles.listOrders}>
            {orderList.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum pedido encontrado...
              </span>
            )}

            {orderList.map((item) => (
              <section key={item.id} onClick={() => handleOpenModal(item.id)}>
                <button>
                  <div className={styles.tags}></div>
                  <span>Mesa {item.table}</span>
                </button>
              </section>
            ))}
          </article>
        </main>

        {modalIsOpen && (
          <ModalOrder
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishItem={handleFinishItem}
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiCliente = setupAPIClient(ctx);

  const response = await apiCliente.get("/orders");

  return {
    props: {
      orders: response.data,
    },
  };
});
