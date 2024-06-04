
/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';

export type ICredDef = {
    issuerId: string;
    schemaId: string;
    tag: string;
    value: any;
    credentialDefinitionId: string;
    type: string;
  }
  
  export type ISchema = {
    issuerId: string;
    name: string;
    version: string;
    attrNames: string[];
    schemaId: string;
  }

@Info({title: 'ManageIdentity', description: 'Smart contract for managing identity'})
export class ManageIdentityContract extends Contract {

    // CreateAsset issues a new asset to the world state with given details.
    @Transaction()
    public async RegisterSchema(ctx: Context, id: string, schemaResultString: string): Promise<ISchema> {
        const exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`Schema for id : ${id} already exists`);
        }

        const schemaResult: ISchema = JSON.parse(schemaResultString)

        const asset = {
            ID: id,
            Schema: schemaResult,
            DocType: 'schema',
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));

        return schemaResult
    }


    @Transaction()
    public async RegisterCredentialDef(ctx: Context, id: string, credentialDefString: string): Promise<ICredDef> {
        const exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`Credential definition for id: ${id} already exists`);
        }

        const credDef: ICredDef = JSON.parse(credentialDefString)

        const asset = {
            ID: id,
            CredentialDefinition: credDef,
            DocType: 'credentialDefinition',
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));

        console.log("in chaincode:\n", credDef)
        return credDef
    }

    // ReadAsset returns the asset stored in the world state with given id.
    @Transaction(false)
    public async ReadAsset(ctx: Context, id: string): Promise<string> {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }


    // AssetExists returns true when asset with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async AssetExists(ctx: Context, id: string): Promise<boolean> {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // GetAllAssets returns all assets found in the world state.
    @Transaction(false)
    @Returns('string')
    public async GetAllAssets(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

}
