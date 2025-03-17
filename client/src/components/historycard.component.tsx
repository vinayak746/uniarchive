import { JSX } from "react";
import { BookIssueInterface, IssueStatus } from "../types/issue.types";
import { Link } from "react-router-dom";

interface HistoryPageProps {
  issue: BookIssueInterface;
}

export default function HistoryCard({ issue }: HistoryPageProps): JSX.Element {
  return (
    <Link to={`/books/isbn/${issue.book.isbn}`} className={`flex grow`}>
      <div
        className={`flex shadow-md rounded-lg px-4 py-2 gap-4 grow bg-primary`}>
        <div className={`flex flex-col gap-2 justify-center items-center`}>
          <div>
            <img
              src={issue.book.coverImageUrl}
              alt={issue.book.title}
              className={`h-60 aspect-[3/4] object-cover rounded-lg`}
            />
          </div>
          <p className={`text-sm sm:text-base max-w-40 line-clamp-2`}>
            {issue.book.authors.join(", ")}
          </p>
        </div>
        <div className={`flex flex-col gap-2`}>
          <h1 className={`text-lg sm:text-2xl font-medium max-w-[16rem]`}>
            {issue.book.title}
          </h1>
          <table className={`flex flex-col gap-2 text-sm sm:text-base`}>
            <tbody>
              <tr>
                <td
                  className={`font-medium ${
                    issue.status === IssueStatus.OVERDUE
                      ? "text-red-500"
                      : "text-green-500"
                  }`}>
                  {issue.status}
                </td>
              </tr>
              <tr>
                <th className={`text-left font-medium px-1`}>Issued: </th>
                <td>{new Date(issue.issueDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th className={`text-left font-medium px-1`}>Due: </th>
                <td>{new Date(issue.dueDate).toLocaleDateString()}</td>
              </tr>
              {issue.returnDate && (
                <tr>
                  <th className={`text-left font-medium px-1`}>Returned: </th>
                  <td>
                    {issue.returnDate
                      ? new Date(issue.returnDate).toLocaleDateString()
                      : "Not Returned"}
                  </td>
                </tr>
              )}
              {(issue.fineAmount && (
                <tr>
                  <th className={`text-left font-medium px-1`}>Fine: </th>
                  <td>₹{issue.fineAmount}</td>
                </tr>
              )) ||
                null}
            </tbody>
          </table>
        </div>
      </div>
    </Link>
  );
}
