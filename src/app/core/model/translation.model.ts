export interface TranslationModel {
  translation_id?: number;
  lang_id?: number;
  key: string;
  value: string;
  status: 'active' | 'deleted';
  lang_code?: string;
  lang_name?: string;
}
