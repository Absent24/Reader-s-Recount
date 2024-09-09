import InputField from "@/components/form/InputField";
import { SubmitBtn } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { createProfile } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function CreateProfile() {
  const user = await currentUser();
  if (user?.privateMetadata?.hasProfile) redirect("/");

  return (
    <div className="flex justify-center items-top mt-8">
      <div className="shadow-xl p-8 rounded-lg w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-6">Create Profile</h1>
        <FormContainer action={createProfile}>
          <div className="grid gap-6 mt-4">
            <InputField
              name="username"
              type="text"
              placeholder="Required"
              required={true}
              label="Username"
            />
            <InputField
              name="firstName"
              type="text"
              placeholder="Optional"
              label="First Name"
            />
            <InputField
              name="lastName"
              type="text"
              placeholder="Optional"
              label="Last Name"
            />
          </div>
          <SubmitBtn
            text="Create Profile"
            size="lg"
            className="mt-8 w-full hover:bg-[#11554a] font-semibold py-3 rounded-md shadow-md transition duration-400"
          />
        </FormContainer>
      </div>
    </div>
  );
}

export default CreateProfile;
