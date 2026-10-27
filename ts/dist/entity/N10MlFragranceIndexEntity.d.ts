import { N10mlFragranceIndexEntityBase } from '../N10mlFragranceIndexEntityBase';
import type { N10mlFragranceIndexSDK } from '../N10mlFragranceIndexSDK';
import type { Control } from '../types';
import type { N10MlFragranceIndex, N10MlFragranceIndexLoadMatch, N10MlFragranceIndexListMatch } from '../N10mlFragranceIndexTypes';
declare class N10MlFragranceIndexEntity extends N10mlFragranceIndexEntityBase<N10MlFragranceIndex> {
    constructor(client: N10mlFragranceIndexSDK, entopts: any);
    make(this: N10MlFragranceIndexEntity): N10MlFragranceIndexEntity;
    load(this: any, reqmatch?: N10MlFragranceIndexLoadMatch, ctrl?: Control): Promise<N10MlFragranceIndexEntity>;
    list(this: any, reqmatch?: N10MlFragranceIndexListMatch, ctrl?: Control): Promise<N10MlFragranceIndexEntity[]>;
}
export { N10MlFragranceIndexEntity };
