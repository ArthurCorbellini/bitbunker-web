"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";
import Form from 'next/form';
import { useActionState, useEffect, useState } from "react";

import { PrimaryButton, RoundedButton } from "@/components/legacy/button";
import { InputNumber, InputText } from "@/components/legacy/form";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/legacy/modal";
import { useToast } from "@/lib/store/toast-context";
import { createAsset } from "../_actions/create-asset-action";

export default function CreateAsset() {
  const t1 = useTranslations("shared");
  const t2 = useTranslations("CreateAsset");

  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const [state, action, pending] = useActionState(createAsset, null);
  const { setToast } = useToast();

  useEffect(() => {
    if (state?.toast) {
      setToast(state.toast)
    }
  }, [state])

  return (
    <>
      <RoundedButton onClick={openDialog}>
        <PlusIcon className="h-5 w-5" />
      </RoundedButton>
      <Modal open={open} closeHandler={closeDialog}>
        <Form action={action}>
          <ModalHeader
            title={t2("title")}
            description={t2("description")} />
          <ModalBody>
            <InputNumber
              label={t1("ucid")}
              name="ucid"
              disabled={pending}
              state={state}
              addClassName="w-1/2" />
            <InputText
              label={t1("symbol")}
              name="symbol"
              disabled={pending}
              state={state}
              addClassName="w-1/2" />
            <InputText
              label={t1("name")}
              name="name"
              state={state}
              disabled={pending}
              addClassName="w-full" />
            <InputText
              label={t1("classification")}
              name="classification"
              state={state}
              disabled={pending}
              addClassName="w-full" />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton
              type="submit"
              disabled={pending}>
              {pending ? `${t1("saving")}...` : t1("save")}
            </PrimaryButton>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}