import { JSX } from "react";
import Form from "../../components/form.component";
import Input from "../../components/input.component";
import { Navigate, useRouteLoaderData } from "react-router-dom";
import RootLayoutLoader, {
  SessionData,
} from "../../components/layout.component/layout.loader";
import Select from "../../components/select.component";
export default function SettingsPage(): JSX.Element {
  const session: SessionData = useRouteLoaderData<typeof RootLayoutLoader>(
    "layout"
  ) as SessionData;

  if (!session.loggedIn) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <div className="flex flex-col items-center justify-center grow">
      <Form className={`mx-auto max-w-md`} title={"Account Settings"}>
        <Input
          type={"text"}
          value={session.user.uid}
          readOnly
          labelText={"User ID"}
        />
        <Input
          type={"text"}
          value={session.user.name}
          readOnly
          labelText={"Name"}
        />
        <Select
          labelText={`Role`}
          options={[
            { value: "UGSTUDENT", label: "UG Student", disabled: true },
            { value: "PGSTUDENT", label: "PG Student", disabled: true },
            {
              value: "RESEARCHSCHOLAR",
              label: "Research Scholar",
              disabled: true,
            },
            { value: "FACULTY", label: "Faculty", disabled: true },
            {
              value: "NONACADEMICSTAFF",
              label: "Non Academic Staff",
              disabled: true,
            },
            { value: "ALUMNI", label: "Alumni", disabled: true },
            {
              value: "VISITINGFACULTY",
              label: "Visiting Faculty",
              disabled: true,
            },
          ]}
          value={session.user.role}
        />
      </Form>
    </div>
  );
}
