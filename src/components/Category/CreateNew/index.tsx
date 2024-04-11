import * as React from "react";
import { useState, FormEvent } from "react";

import { setupAPIClient } from "@/services/api";
import styles from "./styles.module.scss";

import { styled } from "@mui/material/styles";

import Button, { ButtonProps } from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { DialogContent } from "@mui/material";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

import { FaSpinner } from "react-icons/fa";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#288293"),
  backgroundColor: "#288293",
  "&:hover": {
    backgroundColor: "#25afca",
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ModalCreateNewCategory({ onCategoryCreated }) {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [success, setSuccessVisible] = useState(false);

  const [category, setCategory] = useState("");

  const openModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function registerNewCategory(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
  
    try {
      const requestData = {
        name: category,
      };
  
      const apiClient = setupAPIClient();
      const response = await apiClient.post("/new-category", requestData);
  
      onCategoryCreated(response.data);
  
      setCategory("");
      setSuccessVisible(true);
    } catch (error) {
      console.log("Error when creating new category", error);
      setErrorVisible(true);
      setError(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <div className={styles.messageAlert}>
        {errorVisible && (
          <Alert
            variant="filled"
            severity="error"
            onClose={() => setErrorVisible(false)}
          >
            Ocorreu um erro: {error.message}
          </Alert>
        )}

        {success && (
          <Alert
            variant="filled"
            severity="success"
            onClose={() => setSuccessVisible(false)}
          >
            Categoria cadastrada com sucesso!
          </Alert>
        )}
      </div>

      <div>
        <Tooltip title="Cadastrar nova categoria">
          <ColorButton
            variant="contained"
            color="success"
            startIcon={<AddCircleOutlineIcon />}
            onClick={openModal}
          >
            Categoria
          </ColorButton>
        </Tooltip>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth={true}
      >
        <form onSubmit={registerNewCategory}>
          <DialogContent>
            <TextField
              id="outlined-basic"
              label="Nova Categoria"
              variant="outlined"
              style={{ width: "100%", marginTop: "0.5rem" }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              autoFocus={true}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={category === ""}
            >
              {loading ? (
                <div className={styles.loadingIcon}>
                  <FaSpinner size={22} />
                </div>
              ) : (
                "Cadastrar"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
