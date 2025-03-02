import { type JSX } from "react";
import { LogIn } from "lucide-react";
import Form from "../../components/form";
import Input from "../../components/input";
import Navbar from "../../components/navbar";
import Button from "../../components/button";

function Login(): JSX.Element {
  return (
    <div className={`flex flex-col grow`}>
      <Navbar onlyMain />
      <div className={`flex justify-center items-center grow`}>
        <Form formHeading={"Login"} method="post">
          <Input
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
          <Button icon={<LogIn size={20} />}>Login</Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
