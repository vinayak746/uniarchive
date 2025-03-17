import { JSX } from "react";
import Form from "../../../../components/form.component";
import Input from "../../../../components/input.component";
import Button from "../../../../components/button.component";

function AddBookPage(): JSX.Element {
  return (
    <div className={`flex grow justify-center items-center`}>
      <Form method={"POST"} title="Add Book">
        <div className={`flex flex-col sm:flex-row gap-4 sm:gap-8`}>
          <div className={`flex flex-col gap-4`}>
            <Input
              name={"isbn"}
              min={10}
              max={13}
              labelText={"ISBN"}
              placeholder={"ISBN"}
            />
            {/* <Input
              min={1}
              max={100}
              labelText={"Title"}
              placeholder={"Title"}
            />
            <TextArea
              minLength={1}
              maxLength={1000}
              rows={4}
              labelText={"Summary"}
              placeholder={"Summary"}
            />
            <Input
              min={1}
              labelText={"Pages"}
              placeholder={"Pages"}
              type={"number"}
            />*/}
          </div>
          {/* 
          <div className={`flex flex-col gap-4`}>
            <Input
              min={1}
              max={5}
              type={"number"}
              labelText={"Rating"}
              placeholder={"Rating"}
            />
            <Input labelText={"Author"} placeholder={"Author"} />
            <FileInput
              labelText={"Cover Image"}
              placeholder={"Cover Image URL"}
              className={`h-28`}
              type={"file"}
            />
            <Input labelText={"Copies"} placeholder={"Copies Available"} />
          </div> */}
        </div>
        <Button>
          <div>Add Book</div>
        </Button>
      </Form>
    </div>
  );
}

export default AddBookPage;
