import React, { useContext, useEffect, useMemo, useState } from "react";
import { Search, Sliders, X } from "lucide-react";
import { freelencer } from "../../assets/assets";

import FreelancerCard from "@/components/market/FreelancerCard";
import NumberCarousel from "@/components/market/NumberCarousel";
import FilterModal from "@/components/market/Filters";
import { context } from "../../context/context";

/* ---------------- TYPES ---------------- */

type SkillsState = Record<string, string[]>;

type Freelancer = {
  id: string | number;
  name: string;
  title: string;
  price: number;
  avatar: string;
  skills: string[];
};

/* ---------------- COMPONENT ---------------- */

const Freelencers: React.FC = () => {
  const [numberPages, setNumberPages] = useState<number>(0);
  const [currentPages, setcurrentPages] = useState<number>(1);
  const [showFilter, setShowFilter] = useState<boolean>(false);

const ctx = useContext(context);

if (!ctx) {
  throw new Error("Context must be used inside Provider");
}

const {
  allSkills,
  skills,
  setSkills,
  freelancers,
  setFreelancers,
} = ctx;

  /* REMOVE SKILL */
  const removeSkill = (skill: string) => {
    Object.entries(skills).forEach(([key, value]) => {
      setSkills((prev: SkillsState) => ({
        ...prev,
        [key]: value.filter((item: string) => item !== skill),
      }));
    });
  };

  /* PAGINATION */
  const freelancerRange = useMemo(() => {
    const start = (currentPages - 1) * 6;
    const end = start + 6;

    const pages = Math.ceil(freelancers.length / 6);
    setNumberPages(pages);

    return freelancers.slice(start, end);
  }, [currentPages, freelancers]);

  /* INIT DATA */
  useEffect(() => {
    setFreelancers(freelencer);
  }, [setFreelancers]);

  return (
    <div className="bg-black text-white w-full min-h-screen px-10 py-10 flex flex-col gap-8">

      {/* TITLE */}
      <h1 className="text-4xl font-semibold">
        Find Top Talent
      </h1>

      {/* SEARCH + FILTER */}
      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3 bg-[#111] px-4 py-3 rounded-xl flex-1">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search skills, keywords, or roles..."
            className="bg-transparent outline-none w-full text-gray-300 placeholder-gray-500"
          />
        </div>

        <button
          className="flex items-center gap-2 cursor-pointer bg-[#111] px-4 py-3 rounded-xl hover:bg-[#1b1b1b]"
          onClick={() => setShowFilter(true)}
        >
          <Sliders size={18} className="text-[#69B34C]" />
          <span>Filter</span>
        </button>

      </div>

      {/* SKILLS TAGS */}
      <div className="flex items-center gap-3 flex-wrap">

        {allSkills?.map((item: string, index: number) => (
          <div
            key={index}
            className="flex items-center gap-2 px-4 py-1 rounded-full text-sm"
            style={{
              backgroundColor: "#132112",
              color: "#69B34C",
              border: "1px solid #69B34C",
            }}
          >
            {item}

            <X
              size={14}
              className="cursor-pointer"
              onClick={() => removeSkill(item)}
            />
          </div>
        ))}

        {Object.keys(skills).length > 0 && (
          <p
            className="text-sm text-gray-400 cursor-pointer hover:text-white"
            onClick={() => setSkills({})}
          >
            Clear all
          </p>
        )}

      </div>

      {/* FREELANCERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {freelancerRange.map((item: Freelancer) => (
          <FreelancerCard
            key={item.id}
            freelancer={item}
          />
        ))}

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-6">
        <NumberCarousel
          currentPages={currentPages}
          setcurrentPages={setcurrentPages}
          numberPages={numberPages}
        />
      </div>

      {/* FILTER MODAL */}
      {showFilter && (
        <FilterModal
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />
      )}

    </div>
  );
};

export default Freelencers;