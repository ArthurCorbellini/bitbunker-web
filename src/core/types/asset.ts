import { CreateAssetFormType } from "@/app/[locale]/assets/_hooks/useSchema";

export interface Asset {
  id: number;
  ucid: number;
  name: string;
  symbol: string;
  type: string;
  tier: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateAsset extends CreateAssetFormType { };

export interface TypeOption {
  id: string,
  label: string,
}

export interface TierOption {
  id: string,
  label: string,
}
