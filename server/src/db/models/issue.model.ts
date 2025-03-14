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

enum IssueStatus {
  ISSUED = "Issued",
  RETURNED = "Returned",
  OVERDUE = "Overdue",
}

export interface BookIssue extends Document {
  book: ObjectId;
  user: ObjectId;
  issueDate: Date;
  dueDate: Date;
  returnDate: Date;
  getStatus: () => IssueStatus;
  getFineAmount: () => number;
}

const BookIssueSchema: Schema<BookIssue> = new Schema<BookIssue>({
  book: { type: Schema.Types.ObjectId, ref: "Book" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
  returnDate: { type: Date },
});

BookIssueSchema.pre(
  "save",
  function (next: CallbackWithoutResultAndOptionalError): void {
    const issue: BookIssue = this;
    const userId: ObjectId = issue.user;
    User.findById(userId)
      .then((user: UserInterface | null): void => {
        if (user) {
          issue.dueDate.setDate(
            issue.issueDate.getDate() + getLoanPeriod(user.role)
          );
        }
      })
      .catch(next);
    next();
  }
);

BookIssueSchema.methods.getStatus = function (): IssueStatus {
  const issue = this as BookIssue;
  if (issue.returnDate) {
    return IssueStatus.RETURNED;
  }
  if (issue.dueDate < new Date()) {
    return IssueStatus.OVERDUE;
  }
  return IssueStatus.ISSUED;
};

BookIssueSchema.methods.getFineAmount = function (): number {
  const issue = this as BookIssue;
  if (issue.getStatus() === IssueStatus.OVERDUE) {
    const days: number = Math.floor(
      (new Date().getTime() - issue.dueDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return days * 10;
  }
  return 0;
};

const BookIssue: Model<BookIssue> = model<BookIssue>(
  "BookIssue",
  BookIssueSchema
);
export default BookIssue;
