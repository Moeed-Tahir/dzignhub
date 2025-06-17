import Image from 'next/image'

const ToolCard = ({ 
  image, 
  icon, 
  title, 
  description, 
  onClick,
  className = "" 
}) => {
  return (
    <div 
      className={` rounded-xl hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden ${className}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="bg-[#eff1f3] w-full h-55 relative">
        <Image
          src={image}
          alt={title}
          fill
        //   className="object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Icon and Title */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 font-general-sans">
            {title}
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

export default ToolCard;