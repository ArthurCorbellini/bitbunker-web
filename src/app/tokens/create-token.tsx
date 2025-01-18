"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import Form from 'next/form';
import { useState } from "react";
import { useFormStatus } from "react-dom";

import { PrimaryButton, RoundedButton } from "@/components/my-ui/button";
import { InputNumber, InputText } from "@/components/my-ui/form";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/my-ui/modal";
import { createToken } from "@/lib/actions";

export default function CreateToken() {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const { pending } = useFormStatus();

  return (
    <>
      <RoundedButton onClick={openDialog}>
        <PlusIcon className="h-5 w-5" />
      </RoundedButton>
      <Modal open={open} closeHandler={closeDialog}>
        <Form action={createToken}>
          <ModalHeader
            title="Create new Token"
            description="Form to create token" />
          <ModalBody>
            <InputNumber
              label="UCID"
              name="ucid"
              disabled={pending}
              addClassName="md:w-1/2 lg:w-2/12" />
            <InputText
              label="Name"
              name="name"
              disabled={pending}
              addClassName="md:w-1/2 lg:w-6/12" />
            <InputText
              label="Symbol"
              name="symbol"
              disabled={pending}
              addClassName="md:w-1/2 lg:w-2/12" />
            <InputText
              label="Classification"
              name="classification"
              disabled={pending}
              addClassName="md:w-1/2 lg:w-2/12" />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton
              type="submit"
              disabled={pending}
              addClassName="ml-auto md:w-1/3 lg:w-4/12">
              {pending ? "Saving..." : "Save"}
            </PrimaryButton>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}