import wtf from "../error.util/wtf.error.util";
import { UserRoles } from "../../db/models/user.model";

export function getLoanPeriod(role: UserRoles): number {
  switch (role) {
    case UserRoles.UGSTUDENT:
      return 21;
    case UserRoles.PGSTUDENT:
      return 30;
    case UserRoles.RESEARCHSCHOLAR:
      return 30;
    case UserRoles.FACULTY:
      return 180;
    case UserRoles.NONACADEMICSTAFF:
      return 60;
    case UserRoles.ALUMNI:
      return 5;
    case UserRoles.VISITINGFACULTY:
      return 14;
    default:
      throw wtf();
  }
}
