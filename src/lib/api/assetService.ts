import { Asset } from "../types/asset-type";
import { ApiResponse, httpClient } from "../util/api-util";

export const assetService = {
  create: async (data: Asset): Promise<ApiResponse<string>> => {
    return httpClient.post("/asset", data);
  },

  fetchAll: async (): Promise<ApiResponse<Asset[]>> => {

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