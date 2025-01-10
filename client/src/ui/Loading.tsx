const Loading = () => {
  return (
    <div className="flex items-center space-x-2">
      <span className="sr-only">Loading...</span>
      <div className="size-3 bg-zinc-200 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="size-3 bg-zinc-200 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="size-3 bg-zinc-200 rounded-full animate-bounce" />
    </div>
  );
};

export default Loading;
