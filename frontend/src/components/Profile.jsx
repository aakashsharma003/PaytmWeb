export const Profile = ({ profile, color }) => {
  return (
    <div
      className="rounded-full  px-[3dvw] py-[0.85dvh] mx-[1dvw] my-[2dvh] md:py-[2dvh] md:px-[1.8dvw] uppercase"
      style={{ backgroundColor: color }}
    >
      {profile}
    </div>
  );
};
