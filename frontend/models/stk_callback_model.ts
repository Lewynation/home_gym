export class MpesaStkCallbackResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: number;
  ResultDesc: string;
  Amount?: number | null;
  MpesaReceiptNumber?: string | null;
  PhoneNumber?: string | null;
  TransactionDate?: string | null;
  reference?: string;

  constructor(
    MerchantRequestID: string,
    CheckoutRequestID: string,
    ResultCode: number,
    ResultDesc: string,
    Amount?: number | null,
    MpesaReceiptNumber?: string | null,
    PhoneNumber?: string | null,
    TransactionDate?: string | null
  ) {
    this.MerchantRequestID = MerchantRequestID;
    this.CheckoutRequestID = CheckoutRequestID;
    this.ResultCode = ResultCode;
    this.ResultDesc = ResultDesc;
    this.Amount = Amount;
    this.MpesaReceiptNumber = MpesaReceiptNumber;
    this.PhoneNumber = PhoneNumber;
    this.TransactionDate = TransactionDate;
  }

  static fromJSON(json: any): MpesaStkCallbackResponse {
    const stkCallback = json.Body.stkCallback.CallbackMetadata || null;
    return new MpesaStkCallbackResponse(
      json.Body.stkCallback.MerchantRequestID,
      json.Body.stkCallback.CheckoutRequestID,
      json.Body.stkCallback.ResultCode,
      json.Body.stkCallback.ResultDesc,
      stkCallback === null
        ? null
        : stkCallback?.Item.find((item: any) => item.Name === "Amount")
            ?.Value || null,
      stkCallback === null
        ? null
        : stkCallback.Item.find(
            (item: any) => item.Name === "MpesaReceiptNumber"
          )?.Value || null,
      stkCallback === null
        ? null
        : stkCallback.Item.find((item: any) => item.Name === "PhoneNumber")
            ?.Value || null,
      stkCallback === null
        ? null
        : stkCallback.Item.find((item: any) => item.Name === "TransactionDate")
            ?.Value || null
    );
  }
  public addReference(reference: string) {
    this.reference = reference;
    return this;
  }
}
