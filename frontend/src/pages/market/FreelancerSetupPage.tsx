import React, { useEffect, useState } from "react";
import { categoriesData } from "../../assets/assets";
import { useAuth } from "@/context/userContext";
import { useNavigate } from "react-router-dom";
import { userApi } from "@/lib/api";

type SkillsState = {
  [key: string]: string[];
};

const categories = [
  "Web Development",
  "UI/UX Design",
  "Mobile Apps",
  "Graphic Design",
  "Digital Marketing",
  "DevOps",
  "Data Science",
];

const FreelancerSetupPage = () => {
  const { user, loading, setUser } = useAuth();
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [skills, setSkills] = useState<SkillsState>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expLevel, setExpLevel] = useState<string>("");
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    if (!loading && user) {
      const isComplete =
        user.category?.length > 0 &&
        user.skills?.length > 0;

      if (isComplete) {
        navigate("/freedashboard");
      }
    }
  }, [user, loading, navigate]);

  const clearAll = () => {
    setSkills({});
    setSelectedCategories([]);
    setActiveCategory(null);
    setRate(0);
    setExpLevel("");
  };

  const toggleSkill = (skill: string, category: string) => {
    setSkills((prev) => {
      const currentSkills = prev[category] || [];

      if (currentSkills.includes(skill)) {
        const updated = currentSkills.filter((s) => s !== skill);

        if (updated.length === 0) {
          const copy = { ...prev };
          delete copy[category];
          return copy;
        }

        return {
          ...prev,
          [category]: updated,
        };
      }

      return {
        ...prev,
        [category]: [...currentSkills, skill],
      };
    });
  };

  const toggleCategory = (category: string) => {
    setActiveCategory(category);

    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        const copy = { ...skills };
        delete copy[category];
        setSkills(copy);

        return prev.filter((c) => c !== category);
      }

      return [...prev, category];
    });
  };

  const handleSave = async () => {
    if (!expLevel) {
      return alert("Select experience level");
    }

    if (selectedCategories.length === 0) {
      return alert("Select at least one category");
    }

    if (Object.keys(skills).length === 0) {
      return alert("Select your skills");
    }

    if (!rate || rate <= 0) {
      return alert("Set your hourly rate");
    }

    try {
      const allSkills = Object.values(skills).flat();

      const payload = {
        category: selectedCategories,
        skills: allSkills,
        rate,
        expLevel,
      };

      console.log("payload =>", payload);

      const res = await userApi.setupProfile(payload);
      setUser(res.user)
      console.log("res =>", res);

      navigate("/freedashboard");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#0B1120] text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Complete Your Freelancer Profile
          </h1>

          <p className="text-gray-400 mt-2">
            Choose your categories and skills to start receiving projects.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8 shadow-2xl">

          {/* RATE + EXPERIENCE */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">

            {/* RATE */}
            <div>
              <p className="text-sm text-gray-400 mb-3">
                HOURLY RATE ($)
              </p>

              <input
                type="number"
                placeholder="Ex: 25"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="
                  w-full
                  bg-[#1F2937]
                  border
                  border-gray-700
                  rounded-2xl
                  px-4
                  py-4
                  outline-none
                  focus:border-green-400
                  transition
                "
              />
            </div>

            {/* EXPERIENCE */}
            <div>
              <p className="text-sm text-gray-400 mb-3">
                EXPERIENCE LEVEL
              </p>

              <div className="grid grid-cols-3 gap-3">
                {["Junior", "Mid", "Senior"].map((level) => (
                  <button
                    type="button"
                    key={level}
                    onClick={() =>
                      setExpLevel(
                        expLevel === level ? "" : level
                      )
                    }
                    className={`
                      py-4
                      rounded-2xl
                      border
                      transition-all
                      font-semibold

                      ${
                        expLevel === level
                          ? "bg-green-400 text-black border-green-400"
                          : "bg-[#1F2937] border-gray-700 hover:border-green-400"
                      }
                    `}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Select Categories
              </h2>

              <span className="text-sm text-gray-400">
                {selectedCategories.length} selected
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`
                    px-5
                    py-3
                    rounded-2xl
                    border
                    font-medium
                    transition-all
                    duration-200

                    ${
                      selectedCategories.includes(category)
                        ? "bg-green-400 text-black border-green-400 scale-105"
                        : "bg-[#1F2937] border-gray-700 hover:border-green-400 hover:-translate-y-1"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* SKILLS */}
          {activeCategory && (
            <div className="mb-10">

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Skills for {activeCategory}
                </h2>

                <span className="text-sm text-gray-400">
                  {skills[activeCategory]?.length || 0} selected
                </span>
              </div>

              <div className="flex flex-wrap gap-3">

                {categoriesData[activeCategory]?.map(
                  (skill: string) => (
                    <button
                      type="button"
                      key={skill}
                      onClick={() =>
                        toggleSkill(skill, activeCategory)
                      }
                      className={`
                        px-4
                        py-2
                        rounded-xl
                        text-sm
                        border
                        transition-all

                        ${
                          skills[activeCategory]?.includes(skill)
                            ? "bg-green-400 text-black border-green-400"
                            : "bg-[#1F2937] border-gray-700 hover:border-green-400"
                        }
                      `}
                    >
                      {skill}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* FOOTER */}
          <div className="flex gap-4">

            <button
              type="button"
              onClick={clearAll}
              className="
                flex-1
                py-4
                rounded-2xl
                border
                border-gray-700
                bg-[#1F2937]
                hover:bg-[#293548]
                transition
              "
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="
                flex-1
                py-4
                rounded-2xl
                bg-green-400
                text-black
                font-bold
                hover:bg-green-300
                transition
              "
            >
              Finish Setup
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerSetupPage;