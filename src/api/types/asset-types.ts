export interface Asset {
  id: number;
  ucid: number;
  name: string;
  symbol: string;
  type: string;
  classification: string;
}

export interface CreateAsset {
  ucid: number;
  name: string;
  symbol: string;
  type: string;
  classification: string;
}

export interface CreateAssetParams {
  typeOptions: {
    key: string,
    value: string,
  }[],
  classificationOptions: {
    key: string,
    value: string,
  }[],
}