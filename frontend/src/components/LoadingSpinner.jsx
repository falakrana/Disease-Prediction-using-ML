const LoadingSpinner = ({ size = "medium" }) => {
    const spinnerSize = size === "small" ? "w-6 h-6" : size === "large" ? "w-12 h-12" : "w-8 h-8"
  
    return (
      <div className="flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  
  export default LoadingSpinner
  
  