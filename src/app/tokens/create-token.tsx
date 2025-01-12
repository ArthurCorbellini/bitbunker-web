"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

import { PrimaryButton, RoundedButton } from "@/components/my-ui/button";
import { InputText } from "@/components/my-ui/form";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/my-ui/modal";

export default function CreateToken() {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <>
      <RoundedButton onClick={openDialog}>
        <PlusIcon className="h-5 w-5" />
      </RoundedButton>

      <Modal open={open} closeHandler={closeDialog}>
        <form>
          <ModalHeader title="Create new Token" description="Form to create token" />
          <ModalBody>
            <InputText label="UCID" addClassName="md:w-1/2 lg:w-2/12" />
            <InputText label="Name" addClassName="md:w-1/2 lg:w-6/12" />
            <InputText label="Symbol" addClassName="md:w-1/2 lg:w-2/12" />
            <InputText label="Classification" addClassName="md:w-1/2 lg:w-2/12" />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton addClassName="ml-auto md:w-1/3 lg:w-4/12">Save</PrimaryButton>
          </ModalFooter>
        </form>
      </Modal>
    </>

  );
}