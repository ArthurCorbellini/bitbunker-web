import { ApiResponse } from "../core/api-types";
import { httpClient } from "../core/api-utils";
import { Asset } from "../types/asset-types";

export class AssetService {
  static async create(data: Asset): Promise<ApiResponse<string>> {
    return httpClient.post("/asset", data);
  }

  static async fetchAll(): Promise<ApiResponse<Asset[]>> {
    const response: ApiResponse<Asset[]> = {
      success: true,
      apiPath: "",
      timestamp: "",
      error: null,
      data: [{
        id: 1,
        ucid: 1,
        name: "Bitcoin",
        symbol: "BTC",
        type: "Crypto",
        classification: "Tier S"
      },
      {
        id: 2,
        ucid: 2,
        name: "Real",
        symbol: "BRL",
        type: "Fiat",
        classification: "Caixa"
      },
      ]
    }

    return response
    // to-do
    // return httpClient.get("/asset");
  }
}
