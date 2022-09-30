import type { IApiService } from "./api-service-interface";
import { mockService } from "./mock/mock.service";
import { restService } from "./rest/rest.service";

// Change to true to use SnodeC backend instead of mock service
export const useSnodeC = false

export const apiService: IApiService = useSnodeC ? restService : mockService
