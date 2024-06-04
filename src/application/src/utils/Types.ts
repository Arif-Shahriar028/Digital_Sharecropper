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