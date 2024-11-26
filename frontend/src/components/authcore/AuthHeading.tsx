type Props = {
  authHeading: string;
};

const AuthHeading = ({ authHeading }: Props) => {
  return (
    <div className="w-full text-center">
      <h1 className="text-2xl font-semibold md:text-4xl">{authHeading}</h1>
    </div>
  );
};

export default AuthHeading;
