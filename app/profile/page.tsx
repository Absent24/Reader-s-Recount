import { SubmitBtn } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import ImgContainer from "@/components/form/ImgContainer";
import InputField from "@/components/form/InputField";
import { getProfile, updateProfile, updateProfileImg } from "@/utils/actions";

async function Profile() {
  const profile = await getProfile();

  return (
    <section className="flex justify-center items-top mt-8">
      <div className="shadow-xl p-8 rounded-lg w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
        <ImgContainer
          image={profile.profileImage}
          alt="Profile Image"
          btnText="Update Image"
          action={updateProfileImg}></ImgContainer>
        <FormContainer action={updateProfile}>
          <div className="grid mt-4 gap-6">
            <InputField
              type="text"
              label="Username:"
              name="username"
              defaultValue={profile.username}></InputField>
            <InputField
              type="text"
              label="First Name:"
              name="firstName"
              defaultValue={profile.firstName || ""}></InputField>
            <InputField
              type="text"
              label="Last Name:"
              name="lastName"
              defaultValue={profile.lastName || ""}></InputField>
          </div>
          <SubmitBtn
            text="Update Profile"
            size="lg"
            className="mt-8 w-full hover:bg-[#11554a] font-semibold py-3 rounded-md shadow-md transition duration-400"></SubmitBtn>
        </FormContainer>
      </div>
    </section>
  );
}

export default Profile;
