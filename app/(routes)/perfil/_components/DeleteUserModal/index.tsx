import { XMarkIcon } from "@heroicons/react/24/solid";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./DeleteUserModal.module.css";
import React from "react";
import { Text } from "@/app/_components/Text";
import { Button } from "@/app/_components/Button";

type DeleteUserModalProps = {
  handleDeleteAccount: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
};

export const DeleteUserModal = ({ children, handleDeleteAccount }: DeleteUserModalProps) => {
  return (
    <Dialog.Root modal>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay}>
          <Dialog.Content className={styles.dialogContent}>
            <Dialog.Title asChild>
              <Text size="md" asChild>
                <h3>Deletar Conta</h3>
              </Text>
            </Dialog.Title>
            <Dialog.Description asChild>
              <Text size="default" weight="light" align="center">
                Você tem certeza de que deseja deletar a sua conta?
              </Text>
            </Dialog.Description>
            <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end", gap: "8px" }}>
              <Dialog.Close asChild>
                <Button type="button" color="secondary">Cancelar</Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button onClick={handleDeleteAccount} type="button" color="primary">Deletar</Button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button className={styles.iconButton} aria-label="Close">
                <XMarkIcon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};