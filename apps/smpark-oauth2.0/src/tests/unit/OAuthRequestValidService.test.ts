import { ERROR_MESSAGES } from '@constants/errorMessages';
import { RequestValidDTO } from '@dtos/ClientsDTO';
import { AuthorizeRequestDTO, TokenRequestDTO } from '@dtos/OAuthDTO';
import { GrantType } from '@enums/oauth';
import OAuthRequestValidService from '@services/OAuthRequestValidService';

class TestableService extends OAuthRequestValidService {
  public testValidateField(
    missingErrorMsg: string,
    mismatchErrorMsg: string,
    requestValue?: string,
    clientValue?: string,
  ): string {
    return this.validateField(missingErrorMsg, mismatchErrorMsg, requestValue, clientValue);
  }

  public testValidateReferer(refererUri?: string, addressUri?: string): string {
    return this.validateReferer(refererUri, addressUri);
  }

  public testValidateResponseType(responseType?: string): string {
    return this.validateResponseType(responseType);
  }

  public testValidateGrantType(grantType?: string): GrantType {
    return this.validateGrantType(grantType);
  }

  public testNormalizeUri(uri: string): string {
    return this.normalizeUri(uri);
  }
}

describe('TestableService', () => {
  let service: TestableService;

  beforeEach(() => {
    service = new TestableService();
  });

  describe('validateAuthorizationRequest', () => {
    it('client_id 누락 시 에러 발생(400, 메시지)', () => {
      const request: AuthorizeRequestDTO = {
        client_id: undefined,
        redirect_uri: 'http://localhost:3000/callback',
        referer_uri: 'http://localhost:3000',
        response_type: 'code',
      };
      const clients: RequestValidDTO = {
        client_id: 'client123',
        redirect_uri: 'http://localhost:3000/callback',
        address_uri: 'http://localhost:3000',
      };

      expect(() => service.validateAuthorizationRequest(request, clients)).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_ID,
          statusCode: 400,
        }),
      );
    });

    it('redirect_uri 누락 시 에러 발생(400, 메시지)', () => {
      const request: AuthorizeRequestDTO = {
        client_id: 'client123',
        redirect_uri: undefined,
        referer_uri: 'http://localhost:3000',
        response_type: 'code',
      };
      const clients: RequestValidDTO = {
        client_id: 'client123',
        redirect_uri: 'http://localhost:3000/callback',
        address_uri: 'http://localhost:3000',
      };

      expect(() => service.validateAuthorizationRequest(request, clients)).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.MISSING.REDIRECT_URI,
          statusCode: 400,
        }),
      );
    });

    it('referer_uri 누락 시 에러 발생(400, 메시지)', () => {
      const request: AuthorizeRequestDTO = {
        client_id: 'client123',
        redirect_uri: 'http://localhost:3000/callback',
        referer_uri: undefined,
        response_type: 'code',
      };
      const clients: RequestValidDTO = {
        client_id: 'client123',
        redirect_uri: 'http://localhost:3000/callback',
        address_uri: 'http://localhost:3000',
      };

      expect(() => service.validateAuthorizationRequest(request, clients)).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.MISSING.REFERER_URI,
          statusCode: 400,
        }),
      );
    });

    it('response_type 비 지원 종류일 시 에러 발생(401, 메시지)', () => {
      const request: AuthorizeRequestDTO = {
        client_id: 'client123',
        redirect_uri: 'http://localhost:3000/callback',
        referer_uri: 'http://localhost:3000',
        response_type: 'token',
      };
      const clients: RequestValidDTO = {
        client_id: 'client123',
        redirect_uri: 'http://localhost:3000/callback',
        address_uri: 'http://localhost:3000',
      };

      expect(() => service.validateAuthorizationRequest(request, clients)).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.UNSUPPORTED.RESPONSE_TYPE,
          statusCode: 401,
        }),
      );
    });

    it('response_type 누락 시 에러 발생(400, 메시지)', () => {
      const request: AuthorizeRequestDTO = {
        client_id: 'client123',
        redirect_uri: 'http://localhost:3000/callback',
        referer_uri: 'http://localhost:3000',
        response_type: undefined,
      };
      const clients: RequestValidDTO = {
        client_id: 'client123',
        redirect_uri: 'http://localhost:3000/callback',
        address_uri: 'http://localhost:3000',
      };

      expect(() => service.validateAuthorizationRequest(request, clients)).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.MISSING.RESPONSE_TYPE,
          statusCode: 400,
        }),
      );
    });

    it('모든 파라미터 조건 충족 시 에러 미발생', () => {
      const request: AuthorizeRequestDTO = {
        client_id: 'client123',
        redirect_uri: 'http://localhost:3000/callback',
        referer_uri: 'http://localhost:3000',
        response_type: 'code',
      };
      const clients: RequestValidDTO = {
        client_id: 'client123',
        redirect_uri: 'http://localhost:3000/callback',
        address_uri: 'http://localhost:3000',
      };

      expect(() => service.validateAuthorizationRequest(request, clients)).not.toThrow();
    });
  });

  describe('validateTokenRequest', () => {
    it('client_id 누락 시 에러 발생(400, 메시지)', () => {
      const request: TokenRequestDTO = {
        client_id: undefined,
        client_secret: 'secret',
        redirect_uri: 'http://localhost:3000/callback',
        code: 'code123',
        grant_type: 'authorization_code',
      };
      const oauth: TokenRequestDTO = {
        client_id: 'client123',
        client_secret: 'secret',
        redirect_uri: 'http://localhost:3000/callback',
        code: 'code123',
        grant_type: 'authorization_code',
      };

      expect(() => service.validateTokenRequest(request, oauth)).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_ID,
          statusCode: 400,
        }),
      );
    });

    it('client_secret 누락 시 에러 발생(400, 메시지)', () => {
      const request: TokenRequestDTO = {
        client_id: 'client123',
        client_secret: undefined,
        redirect_uri: 'http://localhost:3000/callback',
        code: 'code123',
        grant_type: 'authorization_code',
      };
      const oauth: TokenRequestDTO = {
        client_id: 'client123',
        client_secret: 'secret',
        redirect_uri: 'http://localhost:3000/callback',
        code: 'code123',
        grant_type: 'authorization_code',
      };

      expect(() => service.validateTokenRequest(request, oauth)).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_SECRET,
          statusCode: 400,
        }),
      );
    });

    it('redirect_uri 누락 시 에러 발생(400, 메시지)', () => {
      const request: TokenRequestDTO = {
        client_id: 'client123',
        client_secret: 'secret',
        redirect_uri: undefined,
        code: 'code123',
        grant_type: 'authorization_code',
      };
      const oauth: TokenRequestDTO = {
        client_id: 'client123',
        client_secret: 'secret',
        redirect_uri: 'http://localhost:3000/callback',
        code: 'code123',
        grant_type: 'authorization_code',
      };

      expect(() => service.validateTokenRequest(request, oauth)).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.MISSING.REDIRECT_URI,
          statusCode: 400,
        }),
      );
    });

    it('code 누락 시 에러 발생(400, 메시지)', () => {
      const request: TokenRequestDTO = {
        client_id: 'client123',
        client_secret: 'secret',
        redirect_uri: 'http://localhost:3000/callback',
        code: undefined,
        grant_type: 'authorization_code',
      };
      const oauth: TokenRequestDTO = {
        client_id: 'client123',
        client_secret: 'secret',
        redirect_uri: 'http://localhost:3000/callback',
        code: 'code123',
        grant_type: 'authorization_code',
      };

      expect(() => service.validateTokenRequest(request, oauth)).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.MISSING.CODE,
          statusCode: 400,
        }),
      );
    });

    it('grant_type 비 지원 종류일 시 에러 발생(401, 메시지)', () => {
      const request: TokenRequestDTO = {
        client_id: 'client123',
        client_secret: 'secret',
        redirect_uri: 'http://localhost:3000/callback',
        code: 'code123',
        grant_type: 'token' as GrantType,
      };
      const oauth: TokenRequestDTO = {
        client_id: 'client123',
        client_secret: 'secret',
        redirect_uri: 'http://localhost:3000/callback',
        code: 'code123',
        grant_type: 'authorization_code',
      };

      expect(() => service.validateTokenRequest(request, oauth)).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.UNSUPPORTED.GRANT_TYPE,
          statusCode: 401,
        }),
      );
    });

    it('모든 파라미터 조건 충족 시 에러 미발생', () => {
      const request: TokenRequestDTO = {
        client_id: 'client123',
        client_secret: 'secret',
        redirect_uri: 'http://localhost:3000/callback',
        code: 'code123',
        grant_type: 'authorization_code',
      };
      const oauth: TokenRequestDTO = {
        client_id: 'client123',
        client_secret: 'secret',
        redirect_uri: 'http://localhost:3000/callback',
        code: 'code123',
        grant_type: 'authorization_code',
      };

      expect(() => service.validateTokenRequest(request, oauth)).not.toThrow();
    });
  });

  describe('validateField', () => {
    it('requestValue 누락 시 에러 발생(400, 메시지)', () => {
      expect(() =>
        service.testValidateField('missingError', 'mismatchError', undefined, 'clientValue'),
      ).toThrow(expect.objectContaining({ message: 'missingError', statusCode: 400 }));
    });

    it('requestValue, clientValue 불일치 시 에러발생(401, 메시지)', () => {
      expect(() =>
        service.testValidateField('missingError', 'mismatchError', 'requestValue', 'clientValue'),
      ).toThrow(expect.objectContaining({ message: 'mismatchError', statusCode: 401 }));
    });

    it('requestValue, clientValue 일치 시 에러 미발생', () => {
      expect(() =>
        service.testValidateField('missingError', 'mismatchError', 'value', 'value'),
      ).not.toThrow();
    });

    it('clientValue가 undefined 시 에러 미발생', () => {
      expect(() =>
        service.testValidateField('missingError', 'mismatchError', 'value', undefined),
      ).not.toThrow();
    });
  });

  describe('validateReferer', () => {
    it('referer_uri 누락 시 에러발생(400, 메시지)', () => {
      expect(() => service.testValidateReferer(undefined, 'addressUri')).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.MISSING.REFERER_URI,
          statusCode: 400,
        }),
      );
    });

    it('refererUri, addressUri 불일치 시 에러발생(401, 메시지)', () => {
      expect(() =>
        service.testValidateReferer('http://localhost:3000', 'http://localhost:9999'),
      ).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.MISMATCH.ADDRESS_URI,
          statusCode: 401,
        }),
      );
    });

    it('refererUri, addressUri 일치 시 에러 미발생', () => {
      expect(() =>
        service.testValidateReferer('http://localhost:3000', 'http://localhost:3000'),
      ).not.toThrow();
    });

    it('addressUri가 undefined 시 에러 미발생', () => {
      expect(() => service.testValidateReferer('http://localhost:3000', undefined)).not.toThrow();
    });
  });

  describe('validateResponseType', () => {
    it('responseType이 "code"가 아닐 시 에러발생(401, 메시지)', () => {
      expect(() => service.testValidateResponseType('token')).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.UNSUPPORTED.RESPONSE_TYPE,
          statusCode: 401,
        }),
      );
    });

    it('responseType 누락 시 에러발생(400, 메시지)', () => {
      expect(() => service.testValidateResponseType(undefined)).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.MISSING.RESPONSE_TYPE,
          statusCode: 400,
        }),
      );
    });

    it('responseType이 "code"일 시 에러 미발생', () => {
      expect(() => service.testValidateResponseType('code')).not.toThrow();
    });
  });

  describe('validateGrantType', () => {
    it('grantType이 누락 시 에러발생(400, 메시지)', () => {
      expect(() => service.testValidateGrantType(undefined)).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.MISSING.GRANT_TYPE,
          statusCode: 400,
        }),
      );
    });

    it('grantType이 "authorization_code" 또는 "refresh_token"이 아닐 시 에러발생(401, 메시지)', () => {
      expect(() => service.testValidateGrantType('invalid_grant_type')).toThrow(
        expect.objectContaining({
          message: ERROR_MESSAGES.VALIDATION.UNSUPPORTED.GRANT_TYPE,
          statusCode: 401,
        }),
      );
    });

    it('grantType이 "authorization_code" 또는 "refresh_token"일 시 에러 미발생', () => {
      expect(() => service.testValidateGrantType('authorization_code')).not.toThrow();
      expect(() => service.testValidateGrantType('refresh_token')).not.toThrow();
    });
  });

  describe('normalizeUri', () => {
    it('URI의 끝 슬래시 제거 함', () => {
      expect(service.testNormalizeUri('http://example.com/')).toBe('http://example.com');
    });

    it('URI에 끝 슬래시 없을 시 반환', () => {
      expect(service.testNormalizeUri('http://example.com')).toBe('http://example.com');
    });
  });
});
