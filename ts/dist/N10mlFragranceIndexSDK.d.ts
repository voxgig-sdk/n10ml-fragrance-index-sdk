import { N10MlFragranceIndexEntity } from './entity/N10MlFragranceIndexEntity';
export type * from './N10mlFragranceIndexTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { N10mlFragranceIndexEntityBase } from './N10mlFragranceIndexEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class N10mlFragranceIndexSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    N10MlFragranceIndex(entopts?: Record<string, any>): N10MlFragranceIndexEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): N10mlFragranceIndexSDK;
    tester(testopts?: any, sdkopts?: any): N10mlFragranceIndexSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof N10mlFragranceIndexSDK;
export { stdutil, config, BaseFeature, N10mlFragranceIndexEntityBase, N10mlFragranceIndexSDK, SDK, };
export type { DirectResult };
