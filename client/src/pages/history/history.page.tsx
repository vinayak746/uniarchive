import { JSX, ReactNode } from "react";
import { useLoaderData } from "react-router-dom";
import historyLoader, { HistoryLoaderData } from "./history.loader";
import { BookInterface } from "../../types/books.types";
import { IssueStatus } from "../../types/issue.types";
import HistoryCard from "../../components/historycard.component";

export default function HistoryPage(): JSX.Element {
  const issues: HistoryLoaderData = useLoaderData<
    typeof historyLoader
  >() as HistoryLoaderData;

  return (
    <div className={`flex flex-col grow gap-4`}>
      <h1 className={`text-2xl font-medium`}>History</h1>
      <div className={`flex flex-wrap gap-4 sm:gap-8`}>
        {issues
          .sort(
            (
              issue1: {
                issueDate: Date;
              },
              issue2: {
                issueDate: Date;
              }
            ): number => {
              return (
                new Date(issue2.issueDate).getTime() -
                new Date(issue1.issueDate).getTime()
              );
            }
          )
          .map(
            (issue: {
              _id: string;
              book: BookInterface;
              issueDate: Date;
              dueDate: Date;
              returnDate: Date;
              fineAmount: number;
              status: IssueStatus;
            }): ReactNode => {
              return <HistoryCard key={issue._id} issue={issue} />;
            }
          )}
      </div>
    </div>
  );
}
