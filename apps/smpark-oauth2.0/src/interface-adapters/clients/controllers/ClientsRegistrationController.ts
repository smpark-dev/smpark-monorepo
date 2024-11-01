import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { ClientsRegistrationRequestDTO } from '@adapters/clients/dtos/ClientsRegistrationRequestDTO';

import type { IClientsRegistrationController } from '@adapters/clients/interfaces/controllers/IClientsRegistrationController';
import type { IClientsDetailsLoaderUseCase } from '@application/clients/interfaces/usecases/IClientsDetailsLoaderUseCase';
import type { IClientsDetailsRegistrationUseCase } from '@application/clients/interfaces/usecases/IClientsDetailsRegistrationUseCase';

@injectable()
class ClientsRegistrationController implements IClientsRegistrationController {
  constructor(
    @inject('IClientsDetailsLoaderUseCase')
    private clientsDetailsLoaderUseCase: IClientsDetailsLoaderUseCase,
    @inject('IClientsDetailsRegistrationUseCase')
    private clientsDetailsRegistrationUseCase: IClientsDetailsRegistrationUseCase,
  ) {}

  renderClientRegisterPage = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const clients = await this.clientsDetailsLoaderUseCase.execute(req.userId);

      return res.render('oauth/register', {
        client: clients,
      });
    } catch (error) {
      next(error);
    }
  };

  registerClientsDetail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const clientRegisterDTO = new ClientsRegistrationRequestDTO({
        id: req.userId,
        ...req.body,
      });
      await this.clientsDetailsRegistrationUseCase.execute(clientRegisterDTO);

      return res.status(200).send({ message: 'OAuth 등록 완료' });
    } catch (error) {
      next(error);
    }
  };
}

export default ClientsRegistrationController;
