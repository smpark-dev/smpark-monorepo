import { Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import ClientsMapper from '@mapper/ClientsMapper';

import type { IClientsController } from '@adapters-interfaces/controllers/IClientsController';
import type {
  IClientDetailsLoaderUseCase,
  IClientGenerationUseCase,
  IClientDetailsRegistrationUseCase,
} from '@application-interfaces/usecases/IClientsUseCase';
import type { IOauthRequest } from '@infra-interfaces/IOauthRequest';

@injectable()
class ClientsController implements IClientsController {
  constructor(
    @inject(ClientsMapper) private clientMapper: ClientsMapper,
    @inject('IClientDetailsLoaderUseCase')
    private clientDetailsLoaderUseCase: IClientDetailsLoaderUseCase,
    @inject('IClientGenerationUseCase') private clientGenerationUseCase: IClientGenerationUseCase,
    @inject('IClientDetailsRegistrationUseCase')
    private clientDetailsRegistrationUseCase: IClientDetailsRegistrationUseCase,
  ) {}

  async renderClientRegistrationPage(
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const id = req.session.user?.id;
    try {
      const clients = await this.clientDetailsLoaderUseCase.execute(id);

      return res.render('oauth/register', {
        client: clients,
      });
    } catch (error) {
      next(error);
    }
  }

  async registerClientsDetail(
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    const id = req.session.user?.id;
    try {
      const clientsRequestDTO = this.clientMapper.toClientsRequestDTO({ id, ...req.body });
      await this.clientDetailsRegistrationUseCase.execute(clientsRequestDTO);

      return res.status(200).send({ message: 'OAuth 등록 완료' });
    } catch (error) {
      next(error);
    }
  }

  async generateCredentials(
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    const id = req.session.user?.id;

    try {
      const credentialRequestDTO = this.clientMapper.toCredentialRequestDTO({ id, ...req.body });
      const clients = await this.clientGenerationUseCase.execute(credentialRequestDTO);

      return res.status(200).send({ client: clients });
    } catch (error) {
      next(error);
    }
  }
}

export default ClientsController;
