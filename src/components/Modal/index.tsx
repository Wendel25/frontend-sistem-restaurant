import Modal from "react-modal";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import { ModalOrder } from "@/interface/ModalOrder";

export function ModalOrder({
  isOpen,
  onRequestClose,
  order,
  handleFinishItem,
}: ModalOrder) {
  const customStyles = {
    content: {
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1F222B",
    },
  };

  let total = 0;

  order.forEach((item) => {
    total += parseFloat(item.product.price.replace(",", "."));
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className={styles.header}>
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
          style={{ background: "transparent", border: 0 }}
        >
          <FiX size={45} color="#f34748" />
        </button>

        <span className={styles.table}>
          Mesa: <strong>{order[0].Order.table}</strong>
        </span>
      </div>

      <div className={styles.container}>
        <h2>Detalhes do pedido</h2>

        {order.map((item) => (
          <section key={item.id} className={styles.containerItem}>
            <div className={styles.containerItemDescription}>
              <span>
                <b>{item.amount}</b> - <strong>{item.product.name}</strong>
              </span>
              <span className={styles.description}>
                {item.product.description}
              </span>
            </div>

            <span className={styles.descriptionValue}>
              {parseFloat(item.product.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              <div className={styles.tags}></div>
            </span>
          </section>
        ))}

        <div className={styles.containerValue}>
          <span className={styles.total}>Total:</span>
          <span className={styles.value}>R$ {total.toFixed(2)}</span>
        </div>

        <button
          onClick={() => handleFinishItem(order[0].order_id)}
          className={styles.buttonOrder}
        >
          Concluir Pedido
        </button>
      </div>
    </Modal>
  );
}
