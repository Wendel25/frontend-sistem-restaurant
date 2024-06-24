import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from './styles.module.scss'

import { ListCategories } from "./Categories/index";
import { ListProducts } from "./Products";

export function ListProduct() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const handleCategoryChange = (id) => {
    setSelectedCategoryId(id);
  };

  return (
    <div className={`flex justify-between ${styles.sectionProductsResponsive}`}>
      <Card className={`w-1/6 bg-dark900 mb-4 mb-0 ${styles.cardOneResponsive}`}>
        <CardContent>
          <ListCategories onCategoryChange={handleCategoryChange} />
        </CardContent>
      </Card>
      <Card className={`w-4/5 bg-dark900 ${styles.cardTwoResponsive}`}>
        <CardContent>
          <ListProducts categoryId={selectedCategoryId} />
        </CardContent>
      </Card>
    </div>
  );
}
