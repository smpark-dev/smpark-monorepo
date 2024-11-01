import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { CredentialRequestDTO } from '@adapters/clients/dtos/ClientsCredentialRequestDTO';

import type { IClientsCredentialsGenerationUseCase } from '@application/clients/interfaces/usecases/IClientsCredentialsGenerationUseCase';

@injectable()
class ClientCredentialsController {
  constructor(
    @inject('IClientsCredentialsGenerationUseCase')
    public clientsCredentialsGenerationUseCase: IClientsCredentialsGenerationUseCase,
  ) {}

  generateCredentials = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const credentialRequestDTO = new CredentialRequestDTO(req.body, req.userId);
      const clients = await this.clientsCredentialsGenerationUseCase.execute(credentialRequestDTO);

      return res.status(200).send({ client: clients });
    } catch (error) {
      next(error);
    }
  };
}

export default ClientCredentialsController;
