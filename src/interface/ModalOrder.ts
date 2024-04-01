import { OrderItensProps } from "./OrderItens";

export interface ModalOrder {
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItensProps[];
    handleFinishItem: (id: string) => void;
}