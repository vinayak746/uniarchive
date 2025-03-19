import {
  CallbackWithoutResultAndOptionalError,
  Document,
  Model,
  model,
  ObjectId,
  Schema,
} from "mongoose";
import User, { type UserInterface } from "./user.model";
import { getLoanPeriod } from "../../utils/calc.util/issue.calc.util";
import logger from "../../utils/logger.util/index.logger.util";

export enum IssueStatus {
  ISSUED = "Issued",
  RETURNED = "Returned",
  OVERDUE = "Overdue",
}

export interface BookIssueInterface extends Document {
  book: ObjectId;
  user: ObjectId;
  issueDate: Date;
  dueDate: Date;
  returnDate: Date;
  fineAmount: number;
  status: IssueStatus;
  returnBook: () => void;
  getStatus: () => IssueStatus;
  getFineAmount: () => number;
}

const BookIssueSchema: Schema<BookIssueInterface> =
  new Schema<BookIssueInterface>({
    book: { type: Schema.Types.ObjectId, ref: "Book" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date },
    returnDate: { type: Date },
  });

BookIssueSchema.pre(
  "save",
  function (next: CallbackWithoutResultAndOptionalError): void {
    const issue: BookIssueInterface = this;
    const userId: ObjectId = issue.user;
    User.findById(userId)
      .then((user: UserInterface | null): void => {
        if (user) {
          issue.dueDate = new Date(issue.issueDate);
          issue.dueDate.setDate(
            issue.issueDate.getDate() + getLoanPeriod(user.role)
          );
          next();
        }
      })
      .catch(next);
  }
);

BookIssueSchema.methods.getStatus = function (): IssueStatus {
  const issue = this as BookIssueInterface;
  if (issue.returnDate) {
    return IssueStatus.RETURNED;
  }
  if (issue.dueDate < new Date()) {
    return IssueStatus.OVERDUE;
  }
  return IssueStatus.ISSUED;
};

BookIssueSchema.methods.getFineAmount = function (): number {
  const issue = this as BookIssueInterface;
  if (issue.getStatus() === IssueStatus.OVERDUE) {
    const days: number = Math.floor(
      (new Date().getTime() - issue.dueDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return days * 5; // 5 rupees per day fine
  }
  return 0;
};

BookIssueSchema.methods.returnBook = function (this: BookIssueInterface): void {
  this.returnDate = new Date();
};

BookIssueSchema.virtual("fineAmount").get(function (): number {
  return this.getFineAmount();
});

BookIssueSchema.virtual("status").get(function (): IssueStatus {
  return this.getStatus();
});

const BookIssue: Model<BookIssueInterface> = model<BookIssueInterface>(
  "BookIssue",
  BookIssueSchema
);
export default BookIssue;
