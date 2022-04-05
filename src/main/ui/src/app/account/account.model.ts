
export class AccountModel{
  public accountId?: string;
  public firstName: string;
  public lastName: string;
  public gender: string;
  public oid?: string;
  public addressLine1: string;
  public addressLine2: string;
  public addressLine3: string;
  public state: string;
  public country: string;
  public phone: string;
  public email: string;
  public taxType?: string;
  public taxId?: string;

  constructor() {
  }
}
