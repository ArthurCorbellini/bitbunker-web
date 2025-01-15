"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import Form from 'next/form';
import { useState } from "react";

import { PrimaryButton, RoundedButton } from "@/components/my-ui/button";
import { InputNumber, InputText } from "@/components/my-ui/form";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/my-ui/modal";
import { Token } from "@/interfaces/token.interface";

const createToken = async (token: Token) => {
  const response = await fetch("http://localhost:9000/token", { // TODO pensar numa forma de gerenciar a url
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(token),
  });

  if (!response.ok)
    throw new Error('Failed to create Token.');

  return await response.json();
}

export default function CreateToken() {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const submitForm = async (formData: FormData) => {

    // TODO falta fazer as validações dos campos
    //    > criar alertas para mostrar possíveis erros de validação/salvamento

    const token: Token = {
      ucid: Number(formData.get("ucid")),
      name: formData.get("name") as string,
      symbol: formData.get("symbol") as string,
      classification: formData.get("classification") as string
    }
    createToken(token);
  }
  return (
    <>
      <RoundedButton onClick={openDialog}>
        <PlusIcon className="h-5 w-5" />
      </RoundedButton>
      <Modal open={open} closeHandler={closeDialog}>
        <Form action={submitForm}>
          <ModalHeader
            title="Create new Token"
            description="Form to create token" />
          <ModalBody>
            <InputNumber
              label="UCID"
              name="ucid"
              addClassName="md:w-1/2 lg:w-2/12" />
            <InputText
              label="Name"
              name="name"
              addClassName="md:w-1/2 lg:w-6/12" />
            <InputText
              label="Symbol"
              name="symbol"
              addClassName="md:w-1/2 lg:w-2/12" />
            <InputText
              label="Classification"
              name="classification"
              addClassName="md:w-1/2 lg:w-2/12" />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton
              type="submit"
              addClassName="ml-auto md:w-1/3 lg:w-4/12">
              Save
            </PrimaryButton>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}