export interface Asset {
  id: number;
  ucid: number;
  name: string;
  symbol: string;
  type: string;
  classification: string;
}

export interface CreateAsset {
  ucid: string;
  name: string;
  symbol: string;
  type: string;
  classification: string;
}

export interface TypeOption {
  id: string,
  label: string,
}

export interface ClassificationOption {
  id: string,
  label: string,
}
