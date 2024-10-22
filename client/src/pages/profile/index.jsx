import { useAppStore } from "@/store/store";

const Profile = () => {
  const { user } = useAppStore();
  console.log(user);

  return (
    <div>
      <p>{user?._id}</p>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
