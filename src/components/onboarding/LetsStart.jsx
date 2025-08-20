import React, { useState, forwardRef, useImperativeHandle } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import SelectableCard from "@/components/onboarding/SelectableCard";
import SelectableButton from "@/components/onboarding/SelectableButton";

const LetsStart = forwardRef(({ onDataChange }, ref) => {
  const cardOptions = [
    {
      id: 1,
      value: "founder-entrepreneur",
      icon: "/onboarding/paintbucket.svg",
      title: "Founder/Entrepreneur",
      description: "Who wanna learn for school",
    },
    {
      id: 2,
      value: "creative-designer",
      icon: "/onboarding/pen-tool.svg",
      title: "Creative or Designer",
      description: "Who wanna do some work",
    },
    {
      id: 3,
      value: "marketer-agency",
      icon: "/onboarding/bezier.svg",
      title: "Marketer or Agency",
      description: "Who wanna do some work",
    },
    {
      id: 4,
      value: "coach-consultant",
      icon: "/onboarding/mask.svg",
      title: "Coach or Consultant",
      description: "Who wanna do some business",
    },
    {
      id: 5,
      value: "small-business-brand-owner",
      icon: "/onboarding/color-swatch.svg",
      title: "Small Business/Brand Owner",
      description: "Who wanna do some project",
    },
    {
      id: 6,
      value: "other",
      icon: "/onboarding/designtools.svg",
      title: "Other",
      description: "Who wanna do some project",
    },
  ];

  const creationOptions = [
    {
      id: 1,
      value: "exploring-creative-direction",
      icon: "🎨",
      label: "Just exploring creative direction",
    },
    {
      id: 2,
      value: "website-ui-digital-product",
      icon: "️🖥️",
      label: "Website / UI / Digital product",
    },
    {
      id: 3,
      value: "brand-identity",
      icon: "🖌️",
      label: "Brand identity",
    },
    {
      id: 4,
      value: "business-strategy",
      icon: "📊",
      label: "Business strategy",
    },
    {
      id: 5,
      value: "content-posts-ads-blogs",
      icon: "🚀",
      label: "Content (posts, ads, blogs)",
    },
  ];

  // State for selected user types (multiple selection)
  const [selectedCards, setSelectedCards] = useState([]);
  
  // State for selected creation goals (multiple selection)
  const [selectedCreation, setSelectedCreation] = useState([]);

    // Notify parent of selection changes
    React.useEffect(() => {
      if (onDataChange) {
        onDataChange({
          userTypeCount: selectedCards.length,
          creationGoalsCount: selectedCreation.length,
          userType: getSelectedUserTypes(),
          creationGoals: getSelectedCreationGoals()
        });
      }
    }, [selectedCards, selectedCreation]);

  // Function to get values from selected IDs
  const getSelectedUserTypes = () => {
    return selectedCards.map(id => 
      cardOptions.find(card => card.id === id)?.value
    ).filter(Boolean);
  };

  const getSelectedCreationGoals = () => {
    return selectedCreation.map(id => 
      creationOptions.find(option => option.id === id)?.value
    ).filter(Boolean);
  };

  // Function to save tab 1 data
  const saveTab1Data = async () => {
    const userTypes = getSelectedUserTypes();
    const creationGoals = getSelectedCreationGoals();

    // Validation: At least two selections required from both
    if (userTypes.length < 2 || creationGoals.length < 2) {
      toast.error("Please select at least two options from both sections before proceeding.");
      return false;
    }

    const tab1Data = {
      userType: userTypes,
      creationGoals: creationGoals,
      currentStep: 0
    };

    // Call parent function to handle data change
    if (onDataChange) {
      onDataChange(tab1Data);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(tab1Data)
      });

      const data = await response.json();
      if (data.type === 'success') {
        console.log('Tab 1 data saved successfully');
        return true;
      } else {
        console.error('Error saving tab 1 data:', data.message);
        return false;
      }
    } catch (error) {
      console.error('Error saving tab 1 data:', error);
      return false;
    }
  };

  // Properly expose functions to parent component
  useImperativeHandle(ref, () => ({
    saveData: saveTab1Data,
    getData: () => ({
      userType: getSelectedUserTypes(),
      creationGoals: getSelectedCreationGoals()
    })
  }));

  return (
    <div>
      <p className="text-[24px] font-semibold text-[#1B1F3B] mt-10">
        Let's start with who you are
      </p>

      <p className="text-[18px] text-[#1B1F3B] mb-6 mt-8 font-medium">
        What best describes you today?
      </p>
      <div className="flex gap-[8px] flex-wrap">
        {cardOptions.map((card) => (
          <SelectableCard
            key={card.id}
            id={card.id}
            icon={card.icon}
            title={card.title}
            description={card.description}
            isSelected={selectedCards.includes(card.id)}
            onSelect={() => {
              setSelectedCards((prev) =>
                prev.includes(card.id)
                  ? prev.filter((id) => id !== card.id)
                  : [...prev, card.id]
              );
            }}
          />
        ))}
      </div>

      <p className="text-[18px] text-[#1B1F3B] mb-6 mt-8 font-medium">
        What are you hoping to create first?{" "}
      </p>
      <div className="flex gap-[8px] transition-all mb-4 ease-in-out duration-300 flex-wrap">
        {creationOptions.map((card) => (
          <SelectableButton
            key={card.id}
            id={card.id}
            icon={card.icon}
            title={card.label}
            isSelected={selectedCreation.includes(card.id)}
            onSelect={() => {
              setSelectedCreation((prev) =>
                prev.includes(card.id)
                  ? prev.filter((id) => id !== card.id)
                  : [...prev, card.id]
              );
            }}
          />
        ))}
      </div>

      {/* Debug info - remove in production */}
      {/* {(selectedCards.length > 0 || selectedCreation.length > 0) && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold mb-2">Selected Data:</h4>
          <p><strong>User Types:</strong> {getSelectedUserTypes().join(', ')}</p>
          <p><strong>Creation Goals:</strong> {getSelectedCreationGoals().join(', ')}</p>
          <button 
            onClick={saveTab1Data}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Tab 1 Data
          </button>
        </div>
      )} */}
    </div>
  );
});

LetsStart.displayName = 'LetsStart';

export default LetsStart;