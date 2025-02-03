"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import Form from 'next/form';
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { PrimaryButton, RoundedButton } from "@/components/my-ui/button";
import { InputNumber, InputText } from "@/components/my-ui/form";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/my-ui/modal";
import { createToken } from "@/lib/actions";
import { useToast } from "@/lib/store/toast.context";

export default function CreateToken() {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const { pending } = useFormStatus();
  const [formState, formAction] = useActionState(createToken, null);

  const { setToast } = useToast();

  useEffect(() => {
    if (formState?.serverResponse) {
      setToast(formState.serverResponse)
    }
  }, [formState])

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
          <ModalBody>
            <InputNumber
              label="UCID"
              name="ucid"
              disabled={pending}
              formState={formState}
              addClassName="w-1/2" />
            <InputText
              label="Symbol"
              name="symbol"
              disabled={pending}
              formState={formState}
              addClassName="w-1/2" />
            <InputText
              label="Name"
              name="name"
              formState={formState}
              disabled={pending}
              addClassName="w-full" />
            <InputText
              label="Classification"
              name="classification"
              formState={formState}
              disabled={pending}
              addClassName="w-full" />
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