export interface ICodeService {
  calculateExpiryTime(minutes: number): number;
  validateCodeExpiresAt(expiresAt: number): boolean;
}
