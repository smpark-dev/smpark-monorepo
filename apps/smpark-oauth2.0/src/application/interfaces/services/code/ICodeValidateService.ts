import { CodeDTO } from '@dtos/CodeDTO';
import { TokenRequestDTO } from '@dtos/OAuthDTO';

export interface ICodeValidateService {
  validateCode(tokenRequest: TokenRequestDTO): Promise<CodeDTO>;
}
