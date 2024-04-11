import { useState, useEffect } from "react";
import { setupAPIClient } from "@/services/api";
import styles from "./styles.module.scss";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export function ListProduct() {
  const [products, setProducts] = useState([]);

  async function getAllProducts() {
    try {
      const apiClient = setupAPIClient();
      const response = await apiClient.get("/products");
      setProducts(Object.keys(response.data));
    } catch (err) {
      console.log("Error when returning products", err);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Card className={styles.categories}>
          <CardContent>teste</CardContent>
        </Card>

        <Card className={styles.products}>
          <CardContent>teste</CardContent>
        </Card>
      </div>
    </>
  );
}
