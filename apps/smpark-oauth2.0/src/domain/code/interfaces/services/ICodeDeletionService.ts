export interface ICodeDeletionService {
  deleteCode(id?: string): Promise<void>;
}
