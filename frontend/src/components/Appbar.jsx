import { Profile } from "./Profile";

export const Appbar = ({ user, profile }) => {
  return (
    <div className="w-full h-[13dvh] flex justify-between border-b-2 border-gray-100 px-[2%] py-[2%] ">
      <div className="flex justify-center items-center text-lg font-bold">
        PayTm App
      </div>
      <div className="w-[20%] flex justify-center items-center py-[2%] h-full">
        <div className="text-center text-[90%] bold w-full md:pl-[20%]">
          Hii, {user}
        </div>
        <Profile profile={profile} color={"#cbd5e1"} />
      </div>
    </div>
  );
};
