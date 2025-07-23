"use client"

import { useToast } from "@/components/generic/hooks/useToast";
import { ApiResponseError } from "@/core/types/api";
import { useEffect } from "react";

export const ApiErrorToast = ({ error }: {
  error?: ApiResponseError
}) => {
  const { handleApiErrorToast } = useToast();

  useEffect(() => {
    if (error) {
      handleApiErrorToast(error);
    }
  }, [error, handleApiErrorToast])

  return null;
}