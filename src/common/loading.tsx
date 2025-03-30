const Loading = ( { width } : { width: string } ) => {
    return (
      <div className="flex items-center justify-center">
        <div className={`${width} border-4 border-gray-600 border-t-white rounded-full animate-spin`}></div>
      </div>
    );
  };
  
  export default Loading;
