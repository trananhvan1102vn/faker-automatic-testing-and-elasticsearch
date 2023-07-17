export class Event {
  title: string;
  description: string;
  type: string;
  state: string;
  schedule_at: string;
  course_id: string;
  section_id: Array<string>;
  created_by: string;
}

export class Conference {
  title: string;
  schedule_at: string;
  description: string;
  course_id: string;
  section_id: Array<string>;
  created_by: string;
  start_at: string;
  end_at: string;
}

export class FakeCommerce {
  ProductId: string;
  Country: string;
  CustomerID: string;
  Description: string;
  InvoiceDate: string;
  InvoiceNo: string;
  Quantity: number;
  StockCode: string;
  UnitPrice: number;
  Location: {
    City: string;
    Longtitude: string;
    Latitude: string;
  };
}
