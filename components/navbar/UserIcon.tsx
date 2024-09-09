import { LuUser2 } from "react-icons/lu";
import { getProfileImg } from "@/utils/actions";

async function UserIcon() {
  const profileImg = await getProfileImg();
  if (profileImg) {
    return (
      <img
        src={profileImg}
        alt="Profile Image"
        className="w-6 h-6 rounded-full object-cover"
      />
    );
  }

  return <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />;
}
export default UserIcon;
