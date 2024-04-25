export const Profile = ({ profile, color, onClick }) => {
  return (
    <>
      <div
        className="rounded-full  px-[3dvw] py-[0.85dvh] mx-[1dvw] my-[2dvh] md:py-[2dvh] md:px-[1.8dvw] uppercase cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={onClick}
      >
        {profile}
      </div>
    </>
  );
};
