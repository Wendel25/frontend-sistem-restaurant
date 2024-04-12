import React, { useState, useEffect } from "react";
import { setupAPIClient } from "@/services/api";
import styles from "./styles.module.scss";

import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export function ListProducts({ categoryId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductsList();
  }, [categoryId]);

  async function ProductsList() {
    const apiClient = setupAPIClient();
    try {
      const response = await apiClient.get("/category/product", {
        params: {
          category_id: categoryId,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  return (
    <>
      <h1 className="text-white pb-5 text-2xl font-bold">Produtos</h1>

      <section className="flex grid grid-cols-3 gap-10">
        {products.map((product) => (
          <Card className="rounded-2xl ">
            <div key={product.id}>
              <img
                className="rounded-2xl max-h-64 object-cover w-full"
                src={`http://localhost:5000/files/${product.banner}`}
                alt="image banner"
              />

              <div className="m-4">
                <div className="flex justify-between ">
                  <div className="bg-lime-200 p-1 w-20 flex justify-center rounded-3xl">
                    <span className="text-sm font-bold text-green-800">
                      R${" "}
                      {product?.price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="bg-yellow-200 p-1 w-20 flex justify-center rounded-3xl">
                    <span className="text-sm font-bold text-yellow-800">
                      {product?.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </div>

                <div className="my-4">
                  <span className="font-bold text-2xl text-slate-700">{product?.name}</span>
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
          </Card>
        ))}
      </section>
    </>
  );
}
