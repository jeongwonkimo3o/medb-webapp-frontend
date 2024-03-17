import { DrugsResponse } from '../types/Drug';
import { API } from '../utils/constants/BaseApi';

export async function fetchDrugs(page: number = 1, searchTerm: string = ''): Promise<DrugsResponse> {
  const url = searchTerm ? `/drugs?search=${encodeURIComponent(searchTerm)}&page=${page}` : `/drugs?page=${page}`;
  const response = await API.get(url);
  console.log('GET request URL:', `${API}${url}`);

  return response.data;
}

export async function fetchAllDrugs(): Promise<DrugsResponse[]> {
  const allDrugs: DrugsResponse[] = [];
  let currentPage = 1;

  try {
    // 첫 번째 페이지부터 마지막 페이지까지 순차적으로 가져오기
    while (true) {
      const response = await fetchDrugs(currentPage);
      allDrugs.push(response);
      currentPage++;

      // 마지막 페이지에 도달하면 반복 종료
      if (currentPage > response.drugs.last_page) {
        break;
      }
    }
  } catch (error) {
    console.error(`Error fetching drugs from page ${currentPage}:`, error);
  }

  return allDrugs;
}
