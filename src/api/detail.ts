import { DrugInfo } from "../types/Detail";
import { API } from "../utils/constants/BaseApi";

export const fetchDrugInfo = async (
  itemSeq: string
): Promise<DrugInfo | null> => {
  try {
    const response = await API.get<{ drug: DrugInfo }>(`/drugs/${itemSeq}`);
    console.log("response:", response);
    return response.data.drug;
  } catch (error) {
    console.error("에러 발생:", error);
    return null;
  }
};