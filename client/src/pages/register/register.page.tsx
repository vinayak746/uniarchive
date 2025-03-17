import { type JSX } from "react";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import Form from "../../components/form.component";
import Input from "../../components/input.component";
import Navbar from "../../components/navbar.comoponent/navbar.component";
import Button from "../../components/button.component";
import Select from "../../components/select.component";

function RegisterPage(): JSX.Element {
  return (
    <div className={`flex flex-col grow`}>
      <Navbar onlyMain />
      <div className={`flex justify-center items-center grow`}>
        <Form title={"Register"} method="post">
          <Input
            autoFocus
            name={"name"}
            required
            labelText={`Name`}
            type={`text`}
            minLength={3}
            maxLength={50}
            placeholder={`Name`}
          />
          <Input
            name={"uid"}
            required
            labelText={`UID`}
            type={`text`}
            minLength={10}
            maxLength={10}
            placeholder={`UID`}
          />
          <Input
            required
            name={"password"}
            labelText={`Password`}
            type={`password`}
            minLength={8}
            maxLength={50}
            placeholder={`Password`}
          />
          <div className={` w-full`}>
            <Select
              labelText={`Role`}
              options={[
                { value: "UGSTUDENT", label: "UG Student" },
                { value: "PGSTUDENT", label: "PG Student" },
                { value: "RESEARCHSCHOLAR", label: "Research Scholar" },
                { value: "FACULTY", label: "Faculty" },
                { value: "NONACADEMICSTAFF", label: "Non Academic Staff" },
                { value: "ALUMNI", label: "Alumni" },
                { value: "VISITINGFACULTY", label: "Visiting Faculty" },
              ]}
              defaultValue={`UGSTUDENT`}
              required
              name={"role"}
            />
          </div>
          <Button className={`mt-2`} icon={<LogIn size={20} />}>
            Register
          </Button>
          <div className={`flex w-full justify-end`}>
            <Link className={`text-sm text-blue-500`} to="/login">
              Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
