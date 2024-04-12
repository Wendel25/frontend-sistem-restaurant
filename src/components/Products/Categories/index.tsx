import React, { useState, useEffect } from "react";
import { setupAPIClient } from "@/services/api";
import styles from "./styles.module.scss";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

export function ListCategories({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  async function getAllCategories() {
    try {
      const apiClient = setupAPIClient();
      const response = await apiClient.get("/categories");
      setCategories(response.data);
    } catch (err) {
      console.log("Error when returning categories", err);
    }
  }

  const handleCheckboxChange = (id) => {
    setSelectedCategory(id);
    onCategoryChange(id);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <h1 className="text-white pb-5 text-2xl font-bold">Categorias</h1>

      {[
        { id: "all", label: "Todos Produtos" },
        { id: "active", label: "Produtos Ativos" },
        { id: "inactive", label: "Produtos Desativados" },
        ...categories.map((category) => ({
          id: category.id,
          label: category.name,
        })),
      ].map((category) => (
        <React.Fragment key={category.id}>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: '#248EA6',
                  "&.Mui-checked": {
                    color: '#248EA6'
                  },
                }}
                checked={selectedCategory === category.id}
                onChange={() => handleCheckboxChange(category.id)}
              />
            }
            label={category.label}
            style={{
              color: "#fff",
              marginBottom: "0.4rem",
              marginTop: "0.4rem",
            }}
          />
          <Divider style={{ backgroundColor: "#343741" }} />
        </React.Fragment>
      ))}
    </>
  );
}
