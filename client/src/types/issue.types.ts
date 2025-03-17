import { BookInterface } from "./books.types";

export enum IssueStatus {
  ISSUED = "Issued",
  RETURNED = "Returned",
  OVERDUE = "Overdue",
}

export interface BookIssueInterface {
  _id: string;
  book: BookInterface;
  issueDate: Date;
  dueDate: Date;
  returnDate: Date;
  fineAmount: number;
  status: IssueStatus;
}
