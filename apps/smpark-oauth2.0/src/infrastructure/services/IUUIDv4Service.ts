import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';

import type { IUUIDv4Service } from '@domain/shared/interfaces/services/IUUIDv4Service';

@injectable()
class UUIDv4Service implements IUUIDv4Service {
  generate(): string {
    return uuidv4();
  }
}

export default UUIDv4Service;
