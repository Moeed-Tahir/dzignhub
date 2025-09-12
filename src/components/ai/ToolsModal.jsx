"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

const toolsData = [
  {
    id: "google-suite",
    name: "Google Suite",
    description:
      "Access your Google Workspace Suite, including Gmail, Calendar, Drive, and more.",
    icons: [
      "/superAiImage/mail.svg",
      "/superAiImage/google_drive.svg",
      "/superAiImage/calender.svg",
    ], // Gmail, Drive, Sheets icons
    bgColor: "bg-white",
  },
  {
    id: "gmail",
    name: "Gmail",
    description:
      "Access your Gmail inbox, read and send emails, and search through your messages.",
    icons: ["/superAiImage/mail.svg"],
    bgColor: "bg-red-50",
  },
  {
    id: "calendar",
    name: "Calendar",
    description:
      "Manage your Google Calendar events, set up appointments, and check your schedule.",
    icons: ["/superAiImage/calender.svg"],
    bgColor: "bg-blue-50",
  },
  {
    id: "drive",
    name: "Drive",
    description:
      "Access files stored in your Google Drive, upload documents, and share content.",
    icons: ["/superAiImage/google_drive.svg"],
    bgColor: "bg-yellow-50",
  },
  {
    id: "notion",
    name: "Notion",
    description:
      "Access your Notion pages, create and edit content, and manage your workspace.",
    icons: ["/superAiImage/Notion.svg"],
    bgColor: "bg-gray-50",
  },
  {
    id: "microsoft-365",
    name: "Microsoft 365",
    description:
      "Access your Microsoft 365 inbox, read and send outlook emails, read and create events in outlook.",
    icons: ["/superAiImage/micro.svg"],
    bgColor: "bg-blue-50",
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    description:
      "Full access to Microsoft Teams with admin permissions! Search all messages, channels, and",
    icons: ["/superAiImage/team.svg"],
    bgColor: "bg-purple-50",
  },
  {
    id: "slack",
    name: "Slack",
    description:
      "Access your Slack, read and send messages, and search through your messages.",
    icons: ["/superAiImage/slack.svg"],
    bgColor: "bg-green-50",
  },
];

const ToolCard = ({ tool, onInstall }) => {
  return (
    <div className="flex flex-col gap-3 items-start w-full justify-between p-6 bg-[#F8F8F8] rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-start w-full  flex-1">
        <div className={`flex items-center justify-between w-full`}>
          <div className="flex space-x-1">
            {tool.icons.map((icon, index) => (
              <span key={index} className="w-8 h-8">
                <Image src={icon} alt="" width={24} height={24} />
              </span>
            ))}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {tool.name}
            </h3>
          </div>
          <div>
            <Button
              onClick={() => onInstall(tool.id)}
              className=" bg-[#BDFF00] hover:bg-lime-500 text-black font-medium px-6 py-2 rounded-full transition-colors"
            >
              Install
            </Button>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 border-t pt-2 mt-2 leading-relaxed">
        {tool.description}
      </p>
    </div>
  );
};

export default function ToolsModal({ isOpen, setIsOpen }) {
  const handleInstall = (toolId) => {
    console.log(`Installing tool: ${toolId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Open Tools</Button>
      </DialogTrigger> */}
      <DialogContent className="max-w-4xl  max-h-[90vh]  p-0">
        <DialogHeader className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Tools
            </DialogTitle>
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button> */}
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[70vh]  pb-4 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {toolsData.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onInstall={handleInstall} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
