import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { ListCategories } from "./Categories/index";
import { ListProducts } from "./Products";

export function ListProduct() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const handleCategoryChange = (id) => {
    setSelectedCategoryId(id);
  };

  return (
    <div className="flex justify-between">
      <Card className="w-1/6 bg-dark900">
        <CardContent>
          <ListCategories onCategoryChange={handleCategoryChange} />
        </CardContent>
      </Card>
      <Card className="w-4/5 bg-dark900">
        <CardContent>
          <ListProducts categoryId={selectedCategoryId} />
        </CardContent>
      </Card>
    </div>
  );
}
