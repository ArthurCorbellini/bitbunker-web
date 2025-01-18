"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import Form from 'next/form';
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { PrimaryButton, RoundedButton } from "@/components/my-ui/button";
import { InputText } from "@/components/my-ui/form";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/my-ui/modal";
import { createToken } from "@/lib/actions";

export default function CreateToken() {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const { pending } = useFormStatus();
  const [state, formAction] = useActionState(createToken, { message: null })

  return (
    <>
      <RoundedButton onClick={openDialog}>
        <PlusIcon className="h-5 w-5" />
      </RoundedButton>
      <Modal open={open} closeHandler={closeDialog}>
        <Form action={formAction}>
          <ModalHeader
            title="Create new Token"
            description="Form to create token" />

          {state.message && <p>{state.message}</p>}

          <ModalBody>
            <InputText
              label="UCID"
              name="ucid"
              disabled={pending}
              addClassName="w-2/4" />
            <InputText
              label="Symbol"
              name="symbol"
              disabled={pending}
              addClassName="w-2/4" />
            <InputText
              label="Name"
              name="name"
              disabled={pending} />
            <InputText
              label="Classification"
              name="classification"
              disabled={pending} />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton
              type="submit"
              disabled={pending}>
              {pending ? "Saving..." : "Save"}
            </PrimaryButton>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}