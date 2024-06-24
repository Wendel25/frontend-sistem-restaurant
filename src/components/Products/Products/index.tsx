import React, { useState, useEffect, FormEvent } from "react";
import { setupAPIClient } from "@/services/api";
import { ProductsProps } from "../interface/ProductsProps";

import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Checkbox from "@mui/material/Checkbox";

import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ListProducts({ categoryId }) {
  const [productsList, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productActive, setProductActive] = useState(null);
  const [productBanner, setProductBanner] = useState("");
  const [productDescription, setProductDescription] = useState("");

  useEffect(() => {
    ProductsList();
  }, [categoryId]);

  async function ProductsList() {
    const apiClient = setupAPIClient();
    let endpoint = "/products";

    if (categoryId === "active") {
      endpoint = "/products/active";
    } else if (categoryId === "inactive") {
      endpoint = "/products/disabled";
    } else if (categoryId !== "all") {
      endpoint = "/category/product";
    }

    let params = {};
    if (
      categoryId !== "all" &&
      categoryId !== "active" &&
      categoryId !== "inactive"
    ) {
      params = { category_id: categoryId };
    }

    try {
      const response = await apiClient.get(endpoint, { params });
      const data = response.data;
      const allProducts = Object.values(data).flat();
      setProducts(allProducts);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }

  const handleEdit = (product: ProductsProps) => {
    setOpenModal(true);
    setProductName(product.name);
    setProductPrice(product.price);
    setProductActive(product.active);
    setProductBanner(product.banner);
    setProductDescription(product.description);

    console.log(product);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleActive = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {productsList.map((product: ProductsProps) => (
          <Card
            className="rounded-2xl flex flex-col mx-2 my-4"
            key={product?.id}
          >
            <div className="flex-grow">
              {product.banner ? (
                <img
                  className="rounded-2xl max-h-64 object-cover w-full min-h-56"
                  src={`http://localhost:5000/files/${product.banner}`}
                  alt="image banner"
                />
              ) : (
                <div className="flex justify-center items-center rounded-2xl max-h-64 min-h-56 bg-gray">
                  <ImageNotSupportedIcon
                    sx={{ color: "#929292", fontSize: 150 }}
                  />
                </div>
              )}

              <div className="m-4">
                <div className="flex justify-between">
                  <div className="bg-lime-200 p-1 w-20 flex justify-center rounded-3xl">
                    <span className="text-sm font-bold text-green-800">
                      R$ {product?.price.toLocaleString()}
                    </span>
                  </div>
                  <div
                    className={`p-1 w-20 flex justify-center rounded-3xl ${
                      product?.active ? "bg-yellow-200" : "bg-red-200"
                    }`}
                  >
                    <span
                      className={`text-sm font-bold ${
                        product?.active ? "text-yellow-800" : "text-red-800"
                      }`}
                    >
                      {product?.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </div>

                <div className="my-4">
                  <span className="font-bold text-2xl text-slate-700">
                    {product?.name && product.name.length > 25
                      ? product.name.substring(0, 25) + "..."
                      : product.name}
                  </span>
                </div>

                <div>
                  <span className="text-slate-600">
                    {product?.description && product.description.length > 100
                      ? product.description.substring(0, 100) + "..."
                      : product.description}
                  </span>
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-auto"
              variant="contained"
              onClick={() => handleEdit(product)}
            >
              Editar
            </Button>
          </Card>
        ))}
      </section>

      <div className="modal">
        <Dialog
          open={openModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          fullWidth={true}
        >
          <div className="bg-dark700">
            <DialogTitle className="text-white flex justify-between">
              Editar Produto
              <button
                className={`p-2 rounded-lg font-semibold ${
                  productActive
                    ? "bg-red-200 text-textRedPrice"
                    : "bg-backgroundGreenPrice text-textGreenPrice"
                }`}
                onClick={handleActive}
              >
                {productActive ? "Desativar" : "Ativar"}
              </button>
            </DialogTitle>

            <form onSubmit={handleActive}>
              <DialogContent>
                {productBanner ? (
                  <img
                    className="rounded-2xl max-h-64 object-cover w-full mb-5"
                    src={`http://localhost:5000/files/${productBanner}`}
                    alt="image banner"
                  />
                ) : (
                  <div className="flex justify-center items-center rounded-2xl max-h-64 min-h-56 bg-gray mb-5">
                    <ImageNotSupportedIcon
                      sx={{ color: "#929292", fontSize: 150 }}
                    />
                  </div>
                )}

                <div className="flex flex-wrap w-full justify-between">
                  <input
                    className="w-9/12 p-4 mb-5 bg-dark900 text-zinc-50 rounded-lg"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />

                  <input
                    className="w-1/5 p-4 bg-dark900 text-zinc-50 rounded-lg mb-5"
                    value={`R$ ${productPrice}`}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <textarea
                  className="w-full p-4 mb-5 bg-dark900 text-zinc-50 rounded-lg max-h-40 min-h-32"
                  value={productDescription}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="error">
                  Fechar
                </Button>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  className="bg-darkGreen"
                >
                  Salvar
                </Button>
              </DialogActions>
            </form>
          </div>
        </Dialog>
      </div>
    </>
  );
}
