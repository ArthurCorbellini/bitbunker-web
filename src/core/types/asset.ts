import { FormType } from "@/app/[locale]/assets/_hooks/useSchema";

export interface Asset {
  id: number;
  ucid: number;
  name: string;
  symbol: string;
  type: string;
  tier: string;
}

export interface CreateAsset extends FormType { };

export interface TypeOption {
  id: string,
  label: string,
}

export interface TierOption {
  id: string,
  label: string,
}
