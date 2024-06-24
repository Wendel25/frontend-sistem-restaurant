import * as React from "react";
import { useState, useEffect } from "react";
import { setupAPIClient } from "@/services/api";
import styles from "./styles.module.scss";
import { CategoriesTableProps } from "./interface/CategoriesTableProps";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import ReportIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";

import { FaSpinner } from "react-icons/fa";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function TableCategories({ getCategoriesTable }) {
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getCategories();
    setCategories(getCategoriesTable);
  }, [getCategoriesTable]);

  const [categories, setCategories] = useState([]);

  const [errorVisible, setErrorVisible] = useState(false);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);

  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      const apiClient = setupAPIClient();
      const response = await apiClient.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setErrorVisible(true);
      setError(error);
    }
  };

  const handleDelete = async (id: number) => {
    setCategoryIdToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteCategory = async () => {
    try {
      setLoading(true);

      const apiClient = setupAPIClient();
      await apiClient.delete("/category", {
        params: {
          id: categoryIdToDelete,
        },
      });

      await getCategories();
    } catch (error) {
      console.log("Error when deleting category", error);
      setErrorVisible(true);
      setError(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <div className={styles.messageAlert}>
        {errorVisible && error && (
          <Alert
            variant="filled"
            severity="error"
            onClose={() => setErrorVisible(false)}
          >
            Ocorreu um erro: {error.message}
          </Alert>
        )}
      </div>

      <TableContainer className={styles.table} sx={{ maxHeight: 680 }}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead className={styles.fixedHeader}>
            <TableRow className={styles.titleTable}>
              <TableCell className={styles.title}>Categoria</TableCell>
              <TableCell className={styles.title}>Quantidade</TableCell>
              <TableCell className={styles.title}>
                <div className={styles.alingTitle}>
                  Excluir
                  <Tooltip
                    title="Para deletar uma categoria, é necessário que não haja produtos cadastrados nela."
                    style={{ cursor: "pointer" }}
                  >
                    <HelpOutlineIcon />
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.contentData}>
            {categories.map((category: CategoriesTableProps) => (
              <TableRow key={category?.id} className={styles.rowHover}>
                <TableCell className={styles.data}>{category?.name}</TableCell>
                <TableCell className={styles.data}>
                  {category?.amountProducts}
                </TableCell>
                <TableCell className={styles.buttonDelete}>
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(category?.id)}
                    type="submit"
                    color="error"
                    disabled={parseFloat(category?.amountProducts) > 0 || loading}
                  >
                    {loading ? (
                      <div className={styles.loadingIcon}>
                        <FaSpinner size={22} />
                      </div>
                    ) : (
                      <DeleteIcon />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle className={styles.titleModalConfirmation}>
          <ReportIcon style={{ color: "#d32f2f", fontSize: 35 }} />
          Deseja apagar essa categoria?
          <ReportIcon style={{ color: "#d32f2f", fontSize: 35 }} />
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button onClick={deleteCategory} variant="contained" color="success">
            Seguir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
