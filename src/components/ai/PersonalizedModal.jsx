import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

const PersonalizationModals = ({ showFirstModal, setShowFirstModal }) => {
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [formData, setFormData] = useState({
    nickname: "",
    occupation: "",
    profile: "",
    traits: "",
    customInstructions: "",
  });
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [linkedinData, setLinkedinData] = useState("");

  const traitOptions = [
    "Chatty",
    "Chatty", // Duplicate as shown in image
    "Straight Shooting",
    "Encouraging",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTraitToggle = (trait) => {
    setSelectedTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  const handleSave = () => {
    setShowFirstModal(false);
    setShowSecondModal(true);
  };

  const handleCancel = () => {
    setShowFirstModal(false);
  };

  const handleManualInput = () => {
    setShowSecondModal(false);
    setShowFirstModal(true);
  };

  const handleAutoResearch = () => {
    setShowSecondModal(false);
    console.log("Auto research selected");
  };

  return (
    <>
      <Dialog open={showFirstModal} onOpenChange={setShowFirstModal}>
        <DialogContent className="w-full max-h-[90vh]  p-8 rounded-3xl">
          <DialogHeader className="flex flex-row items-center gap-4 space-y-0 mb-8">
            <DialogTitle className="text-2xl font-bold text-black">
              Personalization
            </DialogTitle>
            <button className="bg-[#BDFF00] rounded-lg hover:bg-[#BDFF00] text-black font-medium px-4 py-2">
              AutoResearch
            </button>
          </DialogHeader>

          <div className="space-y-6 overflow-y-scroll max-h-[70vh] pr-2">
            <div>
              <h3 className="text-lg font-semibold text-black mb-3">
                What Should Allmyai call you?
              </h3>
              <input
                placeholder="Nickname"
                value={formData.nickname}
                onChange={(e) => handleInputChange("nickname", e.target.value)}
                className="p-4 border rounded-2xl flex-1 w-full border-gray-200 focus:border-[#BDFF00] text-gray-600"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-3">
                What do you do ?
              </h3>
              <input
                placeholder="Occupation"
                value={formData.occupation}
                onChange={(e) =>
                  handleInputChange("occupation", e.target.value)
                }
                className="p-4 rounded-2xl border w-full  border-gray-200 focus:border-[#BDFF00] text-gray-600"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-3">
                Your Profile
              </h3>
              <textarea
                placeholder="Describe your profile in a few words ?"
                value={formData.profile}
                onChange={(e) => handleInputChange("profile", e.target.value)}
                className="p-4 border w-full rounded-2xl border-gray-200 focus:border-[#BDFF00] text-gray-600 h-32 resize-none"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-3">
                What traits should Allmyai have ?
              </h3>
              <textarea
                placeholder="Describe traits"
                value={formData.traits}
                onChange={(e) => handleInputChange("traits", e.target.value)}
                className="p-4 border w-full rounded-2xl border-gray-200 focus:border-[#BDFF00] text-gray-600 h-32 resize-none mb-4"
              />

              {/* Trait Buttons */}
              <div className="flex flex-wrap gap-3">
                {traitOptions.map((trait, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleTraitToggle(trait)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedTraits.includes(trait)
                        ? "bg-[#BDFF00] hover:bg-[#a8e600] text-black border-[#BDFF00]"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-200"
                    }`}
                  >
                    + {trait}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-black">
                  Custom instructions for Allmyai
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-600 hover:bg-purple-100"
                >
                  Upgrade
                </Badge>
              </div>
              <textarea
                placeholder="Custom Instruction for Allmyai"
                value={formData.customInstructions}
                onChange={(e) =>
                  handleInputChange("customInstructions", e.target.value)
                }
                className="p-4 border w-full rounded-2xl border-gray-200 focus:border-[#BDFF00] text-gray-600 h-32 resize-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 py-4 bg-[#BDFF00] hover:bg-[#a8e600] text-black rounded-2xl font-medium"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSecondModal} onOpenChange={setShowSecondModal}>
        <DialogContent className="max-w-4xl p-8 rounded-3xl">
          <div className="text-center mb-8">
            <DialogTitle className="text-4xl font-bold text-black mb-4">
              Let Allmyai Know you
            </DialogTitle>
            <p className="text-xl text-gray-600">More personalized response</p>
          </div>

          <div className="mb-8">
            <textarea
              placeholder="Paste your LinkedIn account , your own website ..."
              value={linkedinData}
              onChange={(e) => setLinkedinData(e.target.value)}
              className="w-full p-6 rounded-2xl border-gray-200 focus:border-[#BDFF00] text-gray-600 h-48 resize-none"
            />
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleManualInput}
              className="flex-1 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
            >
              Manual input
            </Button>
            <Button
              onClick={handleAutoResearch}
              className="flex-1 py-4 bg-[#BDFF00] hover:bg-[#a8e600] text-black rounded-2xl font-medium"
            >
              Auto Research
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PersonalizationModals;
