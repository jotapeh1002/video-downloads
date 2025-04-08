interface HeaderHomeProps {
    title: string;
  }
  
  export const HeaderHome = ({ title }: HeaderHomeProps) => {
    return (
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-6 px-8 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl"></div>
        <h1 className="md:text-4xl text-3xl font-extrabold text-center text-white relative z-10">
          {title}
        </h1>
        <div className="flex justify-center mt-2">
          <div className="h-1 w-20 bg-pink-400 rounded-full"></div>
        </div>
      </div>
    );
  };
  