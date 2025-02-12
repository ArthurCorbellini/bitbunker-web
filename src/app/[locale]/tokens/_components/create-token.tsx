"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import Form from 'next/form';
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { PrimaryButton, RoundedButton } from "@/components/button";
import { InputNumber, InputText } from "@/components/form";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/modal";
import { useToast } from "@/lib/store/toast-context";
import { useTranslations } from "next-intl";
import { createToken } from "../_actions/create-token-action";

export default function CreateToken() {
  const t1 = useTranslations("shared");
  const t2 = useTranslations("CreateToken");

  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const { pending } = useFormStatus();
  const [formState, formAction] = useActionState(createToken, null);
  const { setToast } = useToast();

  useEffect(() => {
    if (formState?.toast) {
      setToast(formState.toast)
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
            title={t2("title")}
            description={t2("description")} />
          <ModalBody>
            <InputNumber
              label={t1("UCID")}
              name="ucid"
              disabled={pending}
              formState={formState}
              addClassName="w-1/2" />
            <InputText
              label={t1("Symbol")}
              name="symbol"
              disabled={pending}
              formState={formState}
              addClassName="w-1/2" />
            <InputText
              label={t1("Name")}
              name="name"
              formState={formState}
              disabled={pending}
              addClassName="w-full" />
            <InputText
              label={t1("Classification")}
              name="classification"
              formState={formState}
              disabled={pending}
              addClassName="w-full" />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton
              type="submit"
              disabled={pending}>
              {pending ? `${t1("Saving")}...` : t1("Save")}
            </PrimaryButton>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}