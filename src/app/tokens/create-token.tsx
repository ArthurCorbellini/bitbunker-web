"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

import { PrimaryButton, RoundedButton } from "@/components/my-ui/button";
import { InputNumber, InputText } from "@/components/my-ui/form";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/my-ui/modal";
import { Token } from "@/interfaces/token.interface";

export default function CreateToken() {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const [ucid, setUcid] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [classification, setClassification] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const token: Token = {
      ucid: Number(ucid),
      name,
      symbol,
      classification
    }

    // > falta fazer as validações dos campos
    // > trocar componente <form> para o <Form> do Next
    // > consumir api para salvar o token
    // > criar alertas para mostrar possíveis erros de validação/salvamento

    console.log(token)
  };

  return (
    <>
      <RoundedButton onClick={openDialog}>
        <PlusIcon className="h-5 w-5" />
      </RoundedButton>

      <Modal open={open} closeHandler={closeDialog}>
        <form onSubmit={handleSubmit}>
          <ModalHeader title="Create new Token" description="Form to create token" />
          <ModalBody>
            <InputNumber label="UCID" value={ucid} onChange={setUcid} addClassName="md:w-1/2 lg:w-2/12" />
            <InputText label="Name" value={name} onChange={setName} addClassName="md:w-1/2 lg:w-6/12" />
            <InputText label="Symbol" value={symbol} onChange={setSymbol} addClassName="md:w-1/2 lg:w-2/12" />
            <InputText label="Classification" value={classification} onChange={setClassification} addClassName="md:w-1/2 lg:w-2/12" />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton onClick={handleSubmit} addClassName="ml-auto md:w-1/3 lg:w-4/12">Save</PrimaryButton>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}