import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Input({ ...rest }: InputProps) {
  return <input className={styles.input} {...rest} />;
}

export function TextArea({ ...rest }: TextAreaProps) {
  return (
    <div className={styles.containerTextarea}>
      <textarea className={styles.textarea} {...rest}></textarea>;
    </div>
  );
}
