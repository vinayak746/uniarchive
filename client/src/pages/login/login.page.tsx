import { type JSX } from "react";
import { LogIn } from "lucide-react";
import Form from "../../components/form";
import Input from "../../components/input";
import Navbar from "../../components/navbar";
import Button from "../../components/button";
import { Link } from "react-router-dom";

function LoginPage(): JSX.Element {
  return (
    <div className={`flex flex-col grow`}>
      <Navbar onlyMain />
      <div className={`flex justify-center items-center grow`}>
        <Form formHeading={"Login"} method="post">
          <Input
            autoFocus
            name={"uid"}
            required
            labelText={`UID`}
            type={`text`}
            placeholder={`UID`}
          />
          <Input
            required
            name={"password"}
            labelText={`Password`}
            type={`password`}
            placeholder={`Password`}
          />
          <Button className={`mt-2`} icon={<LogIn size={20} />}>
            Login
          </Button>
          <div className={`flex w-full justify-end`}>
            <Link className={`text-sm text-blue-500`} to="/register">
              Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
