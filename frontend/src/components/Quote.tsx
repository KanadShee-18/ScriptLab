type Props = {
  text: string;
  authorName?: string;
  position?: string;
};

const Quote = ({ text, authorName, position }: Props) => {
  return (
    <div className="flex items-center justify-center min-w-full p-4 md:min-h-screen min-h-[500px] bg-gradient-to-br from-slate-100 to-slate-400">
      <div className="w-full h-full px-8 lg:px-24 xl:px-32">
        <p className="text-4xl font-semibold text-gray-700 break-words text-balance">
          "{text}"
        </p>
        {authorName && (
          <p className="mt-5 text-lg font-bold text-slate-600">{authorName}</p>
        )}
        {authorName && position && (
          <p className="text-sm font-bold text-slate-500">{position}</p>
        )}
      </div>
    </div>
  );
};

export default Quote;
