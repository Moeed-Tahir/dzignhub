'use client'
import { useState } from 'react'
import { X, Check } from 'lucide-react'

const ModalPopup = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('free')

  if (!isOpen) return null

  const plans = [
    {
      id: 'free',
      text: "For Individuals",
      name: 'Free',
      price: 'Free',
      period: '/ month',
      perks: [
        'AI-Powered Image Creation',
        'Basic Video Creation',
        'Limited AI Design Tools',
        'Community Access',
        'Essential Support',
      ]
    },
    {
      id: 'pro',
      text: "For Professionals",
      name: 'Basic',
      price: '$25',
      period: '/ month',
      popular: true,
      perks: [
        'Premium Brand Design Tools',
        'Advanced Content Creation',
        'Full Access to AI Design Suite',
        'Priority Support',
        'Enhanced Collaboration Tools'
      ]
    }
  ]

  return (
    <div className="fixed inset-0 bg-[#000000e8] flex items-center justify-center z-50 p-4">

      {/* Changed max-w from xl to lg, adjusted padding */}
      <div className="bg-white rounded-[20px] p-5 max-w-lg w-full mx-auto relative shadow-lg">
        {/* Close button - no change needed here */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-700"
        >
          <X size={18} />
        </button>

        {/* Welcome text and description - slightly smaller text, adjusted margins */}
        <div className="mb-5 text-center mt-3">
          <h2 className="text-xl font-semibold text-gray-900 mb-1.5">
            Welcome to Allmyai
          </h2>
          <p className="text-gray-500 text-sm">
            Before we begin, let's choose the subscription mode to better assist you.
          </p>
        </div>

        {/* Pricing cards - reduced padding, adjusted font sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3"> {/* Reduced gap */}
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative py-4 px-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                selectedPlan === plan.id
                  ? 'border-[#C209C1] bg-[#C209C11A]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Popular badge - no change needed here */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#FEE7FE] text-[#C209C1] px-4 py-1.5 rounded-full text-xs font-semibold uppercase">
                    Popular
                  </span>
                </div>
              )}

              {/* Check/Uncheck icon - no change needed here */}
              <div className={`absolute top-3 right-3 w-5 h-5 rounded-md flex items-center justify-center border ${ /* Adjusted top/right slightly */
                selectedPlan === plan.id 
                  ? 'bg-[#C209C1] border-[#C209C1]' 
                  : 'bg-white border-gray-300'
              }`}>
                {selectedPlan === plan.id ? (
                  <Check size={12} className="text-white" />
                ) : (
                  <div className="w-2 h-2 rounded-sm"></div>
                )}
              </div>

              {/* Plan text (e.g., For Individuals) - no change needed here */}
              <h3 className="text-xs font-normal text-[#68686B] mb-1">
                {plan.text}
              </h3>
              {/* Plan name - slightly smaller */}
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                {plan.name}
              </h3>

              {/* Price - slightly smaller */}
              <div className="flex items-center mb-4"> {/* Adjusted margin-bottom */}
                <span className="text-2xl font-semibold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-gray-500 ml-1 text-xs"> {/* Smaller text */}
                  {plan.period}
                </span>
              </div>

              {/* Divider - no change needed here */}
              <hr className="border-gray-200 mb-4" />

              {/* Perks - slightly smaller text, reduced spacing */}
              <div>
                <ul className="space-y-1.5"> {/* Reduced space between items */}
                  {plan.perks.map((perk, index) => (
                    <li key={index} className="flex items-center text-gray-700 text-xs"> {/* Smaller text */}
                      <Check size={12} className="text-gray-500 mr-1.5 flex-shrink-0" /> {/* Smaller icon, reduced margin */}
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Action button - slightly adjusted margin and padding */}
        <div className="mt-6"> {/* Adjusted margin-top */}
          <button
            onClick={() => {
              console.log('Selected plan:', selectedPlan)
              onClose()
            }}
            className="w-full px-5 py-2.5 text-[#1B1F3B] bg-[#BDFF00] rounded-full font-semibold text-base hover:bg-opacity-90 transition-colors" /* Adjusted padding, font size */
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalPopup