"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const templates = [
  {
    id: 1,
    title: "Business Analytics Dashboard",
    slug: "pearl",
    category: "Business",
    theme: "Dark",
    popularity: 95,
    image: "/slides/1.png",
    description:
      "A professional dashboard template designed for analyzing key business metrics and presenting data insights effectively.",
    tags: ["Business", "Analytics", "Data", "Dashboard"],
  },
  {
    id: 2,
    title: "Zonex Brand Identity",
    category: "Branding",
    slug: "vortex",
    theme: "Green",
    popularity: 88,
    image: "/slides/2.png",
    description:
      "A clean and modern brand identity presentation template, perfect for showcasing brand guidelines and visual strategy.",
    tags: ["Branding", "Design", "Marketing", "Identity"],
  },
  {
    id: 3,
    title: "Finmetrics Presentation",
    category: "Business",
    slug: "chisel",
    theme: "Orange",
    popularity: 92,
    image: "/slides/3.png",
    description:
      "A financial presentation template with bold design, great for pitching financial strategies and investment reports.",
    tags: ["Finance", "Business", "Presentation", "Reports"],
  },
  {
    id: 4,
    title: "Personal Portfolio",
    category: "Portfolio",
    slug: "stardust",
    theme: "Light",
    popularity: 85,
    image: "/slides/4.png",
    description:
      "A stylish portfolio template for professionals and creatives to highlight their skills, projects, and achievements.",
    tags: ["Portfolio", "Creative", "Resume", "Showcase"],
  },
  {
    id: 5,
    title: "Creative Agency",
    category: "Agency",
    slug: "seafoam",
    theme: "Orange",
    popularity: 90,
    image: "/slides/1.png",
    description:
      "An engaging presentation template tailored for agencies to pitch services, showcase case studies, and attract clients.",
    tags: ["Agency", "Creative", "Marketing", "Pitch"],
  },
  {
    id: 6,
    title: "Who We Are",
    category: "About",
    slug: "nebulae",
    theme: "Dark",
    popularity: 87,
    image: "/slides/2.png",
    description:
      "A corporate introduction template ideal for company overviews, team presentations, and mission statements.",
    tags: ["About", "Company", "Team", "Introduction"],
  },
  {
    id: 7,
    title: "Finmetrics Presentation",
    category: "Business",
    slug: "creme",
    theme: "Orange",
    popularity: 92,
    image: "/slides/3.png",
    description:
      "A bold business presentation focusing on financial strategies, market insights, and growth opportunities.",
    tags: ["Finance", "Growth", "Market", "Business"],
  },
  {
    id: 8,
    title: "Personal Portfolio",
    category: "Portfolio",
    slug: "lux",
    theme: "Light",
    popularity: 85,
    image: "/slides/4.png",
    description:
      "A modern personal portfolio template to showcase creative work, skills, and personal branding.",
    tags: ["Portfolio", "Design", "Personal", "Work"],
  },
];

export default function Template({
  setSelectedTemplateName,
  onTemplateSelect,
}) {
  const scrollRef = useRef(null);

  const handleScrollToEnd = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth, // scroll to the end
        behavior: "smooth",
      });
    }
  };
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [filters, setFilters] = useState({
    style: "all",
    theme: "all",
    sort: "popularity",
  });

  const filteredTemplates = templates
    .filter((template) => {
      if (
        filters.style !== "all" &&
        template.category.toLowerCase() !== filters.style
      )
        return false;
      if (
        filters.theme !== "all" &&
        template.theme.toLowerCase() !== filters.theme
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "popularity") return b.popularity - a.popularity;
      return a.title.localeCompare(b.title);
    });

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 pl-[70px] bg-transparent  h-[300px]">
        <div className="h-full flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("explore")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "explore"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setActiveTab("my-templates")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "my-templates"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              My Templates
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 p-4 border-b border-border">
            <Select
              value={filters.style}
              className=""
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, style: value }))
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Styles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Styles</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="branding">Branding</SelectItem>
                <SelectItem value="portfolio">Portfolio</SelectItem>
                <SelectItem value="agency">Agency</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.theme}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, theme: value }))
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Themes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Themes</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.sort}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, sort: value }))
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by: Popularity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Sort by: Popularity</SelectItem>
                <SelectItem value="name">Sort by: Name</SelectItem>
              </SelectContent>
            </Select>

            <span className="bg-white text-black text-xs px-3 cursor-pointer py-2 border border-[#CCCCCC] rounded-full">
              My Language only
            </span>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "explore" && (
              <div className="flex flex-wrap  gap-2">
                <Card className="group w-[252px] h-[144px] bg-transparent rounded-[12px]  cursor-pointer border-2 hover:shadow-md border-muted-foreground/25 border-dashed transition-shadow">
                  <CardContent className="p-4 flex flex-col items-center justify-center h-32   ">
                    <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-[#393E44] font-medium text-[16px">
                      Create Blank Slides
                    </span>
                  </CardContent>
                </Card>

                {filteredTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="group cursor-pointer w-[252px] h-[144px] rounded-[12px]  hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <CardContent className="p-0 relative">
                      <div className="relative overflow-hidden">
                        <Image
                          src={template.image || "/placeholder.svg"}
                          alt={template.title}
                          width={252}
                          height={144}
                          className="w-[252px] h-[144px] rounded-[12px] object-cover transition-transform group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            size="sm"
                            onClick={() => setSelectedTemplate(template)}
                            className="bg-[#BDFF00] hover:bg-[#BDFF00] py-[12px] px-[16px] !cursor-pointer rounded-full text-black text-[16px] "
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "my-templates" && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">
                  You have no templates yet.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Template Modal */}
      <Dialog
        open={!!selectedTemplate}
        onOpenChange={() => setSelectedTemplate(null)}
      >
        <DialogContent className="max-w-[1200px] py-6 px-8 !rounded-[20px] h-[620px]">
          <DialogHeader>
            <DialogTitle>Template Details</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className=" flex">
              <div className="!w-[740px] flex flex-col gap-2">
                <Image
                  src={selectedTemplate.image || "/placeholder.svg"}
                  alt={selectedTemplate.title}
                  width={740}
                  height={220}
                />

                <div className="relative">
                  {/* Scrollable Thumbnails */}
                  <div
                    ref={scrollRef}
                    className="flex w-[740px] scrollbar-hide overflow-x-scroll gap-4 scroll-smooth"
                  >
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Image
                        key={i}
                        src={selectedTemplate.image || "/placeholder.svg"}
                        alt={selectedTemplate.title}
                        width={199}
                        height={120}
                        className="w-[200px] h-[120px] rounded-[8px] object-cover"
                      />
                    ))}
                  </div>

                  {/* Navigate Button */}
                  <button
                    onClick={handleScrollToEnd}
                    className="absolute -right-4 top-1/2 border border-[#CCCCCC80] text-[#393E44] -translate-y-1/2 bg-white  p-2 px-3 rounded-full"
                  >
                    →
                  </button>
                </div>
              </div>
              <div className="p-4 flex flex-1 flex-col justify-between">
                <div>
                  <h2 className="text-[20px] font-semibold">
                    {selectedTemplate.title}
                  </h2>
                  <p className="text-sm mt-4 mb-6 font-normal">
                    {selectedTemplate.description}
                  </p>

                  {selectedTemplate.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedTemplate.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs rounded-full py-2 px-3"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    if (onTemplateSelect) {
                      onTemplateSelect(selectedTemplate.image);
                      setSelectedTemplateName(selectedTemplate.slug);
                    }
                    setSelectedTemplate(null);
                  }}
                  className="bg-[#BDFF00] hover:bg-[#BDFF00] py-[20px] px-[14px] !cursor-pointer rounded-full text-black text-[16px] "
                >
                  Use This Template
                </Button>{" "}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
