export interface Drug {
  id: number;
  item_name: string;
  item_seq: string;
  efcy_qesitm: string;
  use_method_qesitm?: string;
  atpn_warn_qesitm?: string | null;
  intrc_qesitm?: string | null;
  se_qesitm?: string | null;
  deposit_method_qesitm?: string;
  item_image?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DrugsResponse {
  drugs: {
    data: Drug[];
    current_page: number;
    last_page: number;
    total_page: number;
  };
}
