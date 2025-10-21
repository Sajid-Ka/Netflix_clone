const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-red-600 border-solid"></div>
      </div>
      <p className="mt-6 text-lg font-semibold">Loading Netflix...</p>
    </div>
  );
};

export default LoadingScreen;
