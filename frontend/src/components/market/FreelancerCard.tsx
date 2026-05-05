import React, { useEffect, useState } from "react";
import { DollarSign, Star } from "lucide-react";

type Freelancer = {
  name: string;
  title: string;
  price: number;
  avatar: string;
  skills: string[];
};

type Props = {
  freelancer: Freelancer;
};

const FreelancerCard: React.FC<Props> = ({ freelancer }) => {
  const [more, setMore] = useState<number>(0);
  const [skills, setSkills] = useState<string[]>([]);

  const len = freelancer.skills.length - skills.length;

  useEffect(() => {
    const start = more * 3;
    const arr = freelancer.skills.slice(start, start + 3);
    setSkills((prev) => [...prev, ...arr]);
  }, [more, freelancer.skills]);

  return (
    <div className="bg-[#111] rounded-xl p-6 hover:bg-[#151515] transition-all">

     
      <div className="flex justify-between mb-4">

        <div className="flex gap-3">
          <img
            src={freelancer.avatar}
            alt={freelancer.name}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h2 className="font-semibold text-white">
              {freelancer.name}
            </h2>

            <p className="text-sm text-[#CBD5E1]">
              {freelancer.title}
            </p>
          </div>
        </div>

        
        <div className="text-right">
          <div className="flex items-center gap-1 text-[#69B34C] font-bold">
            <DollarSign size={18} />
            <span className="text-lg">{freelancer.price}</span>
          </div>

          <p className="text-xs text-gray-500">PER HOUR</p>
        </div>
      </div>

      
      <div className="flex items-center gap-1 mb-3">
        {new Array(5).fill(0).map((_, index) => (
          <Star
            key={index}
            size={14}
            className="text-[#69B34C]"
          />
        ))}

        <span className="text-xs text-gray-400 ml-2">
          5.0 (128 reviews)
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((item, index) => (
          <span
            key={index}
            className="text-xs bg-[#1A1A1A] text-gray-400 px-2 py-1 rounded"
          >
            {item}
          </span>
        ))}

        {freelancer.skills.length !== skills.length && (
          <span
            className="text-xs cursor-pointer text-gray-500"
            onClick={() => setMore((prev) => prev + 1)}
          >
            +{len} more
          </span>
        )}
      </div>

   
      <button className="w-full bg-[#1A1A1A] py-2 rounded-lg text-sm hover:bg-[#222] transition">
        View Profile
      </button>
    </div>
  );
};

export default FreelancerCard;