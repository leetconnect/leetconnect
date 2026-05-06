import React, { useEffect, useState } from "react";
import { categoriesData } from "../../assets/assets";
import { useAuth } from "@/context/userContext";
import { useNavigate } from "react-router-dom";

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
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [skills, setSkills] = useState<SkillsState>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expLevel, setExpLevel] = useState<string>("");

  const [bio, setBio] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    if (!loading && user) {
      const isComplete =
        user.category?.length > 0 &&
        user.skills?.length > 0 &&
        user.bio &&
        user.avatar;

      if (isComplete) {
        navigate("/freedashboard");
      }
    }
  }, [user, loading]);

  const ClearFilter = () => {
    setSkills({});
    setActiveCategory(null);
    setSelectedCategories([]);
    setPreview(null);
    setImage(null);
    setBio("");
    setRate(0);
    setExpLevel("");
  };

  const handleImageChange = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const addOrRemoveSkill = (skill: string | null, categorie: string) => {
    setSkills((prev) => {
      if (Object.keys(prev).includes(categorie) && !skill) {
        const update = { ...prev };
        delete update[categorie];
        return update;
      }

      if (skill && prev[categorie]) {
        if (prev[categorie].includes(skill)) {
          const update = {
            ...prev,
            [categorie]: prev[categorie].filter((item) => item !== skill),
          };

          if (update[categorie]?.length === 0) {
            delete update[categorie];
          }

          return update;
        }

        return {
          ...prev,
          [categorie]: [...prev[categorie], skill],
        };
      }

      if (!skill) {
        return { ...prev, [categorie]: [] };
      }

      return {
        ...prev,
        [categorie]: [skill],
      };
    });
  };

  const removeCaterorie = (item: string) => {
    setActiveCategory(item);

    setSelectedCategories((prev) => {
      if (prev.includes(item) && item === activeCategory) {
        addOrRemoveSkill(null as any, item);
        return prev.filter((elem) => elem !== item);
      }

      if (prev.includes(item)) {
        return prev;
      }

      return [...prev, item];
    });
  };

  const handleSave = async () => {
    if (!image) return alert("Upload your photo");
    if (!bio) return alert("Add your bio");
    if (!expLevel) return alert("Select experience level");
    if (selectedCategories.length === 0) return alert("Select category");
    if (Object.keys(skills).length === 0) return alert("Select skills");
    if (!rate || rate <= 0) return alert("Set a valid hourly rate");

    try {
      const formData = new FormData();

      formData.append("photo", image);
      formData.append("bio", bio);
      formData.append("categorie", JSON.stringify(selectedCategories));
      formData.append("skills", JSON.stringify(skills));
      formData.append("rate", rate.toString());
      formData.append("expLevel", expLevel);

      await fetch("/api/freelancer/setup", {
        method: "POST",
        body: formData,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Complete Your Profile</h1>

        <div>
          <p className="text-gray-400 mb-2">PROFILE PHOTO</p>

          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              e.target.files && handleImageChange(e.target.files?[0])
            }
          />

          <label htmlFor="photo-upload" className="mt-4 cursor-pointer block">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold">
                {user?.username?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </label>
        </div>

        <div>
          <p className="text-gray-400 mb-2">HOURLY RATE ($)</p>

          <input
            type="number"
            placeholder="Ex: 20"
            className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-700"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </div>

        <div>
          <p className="text-gray-400 text-sm mb-3">EXPERIENCE LEVEL</p>

          <div className="flex gap-2">
            {["Junior", "Mid", "Senior"].map((level) => (
              <button
                key={level}
                className={`flex-1 border rounded-lg py-2 ${
                  expLevel === level
                    ? "border-[#69B34C] text-[#69B34C]"
                    : "border-gray-600"
                }`}
                onClick={() =>
                  setExpLevel(expLevel === level ? "" : level)
                }
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-gray-400 mb-2">BIO</p>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell clients about yourself..."
            className="w-full bg-[#1a1a1a] p-3 rounded-lg border border-gray-700"
            rows={4}
          />
        </div>

        <div>
          <p className="text-gray-400 mb-2">CATEGORIES</p>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => removeCaterorie(cat)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategories.includes(cat)
                    ? "bg-green-400 text-black"
                    : "border border-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {activeCategory && (
          <div>
            <p className="text-gray-400 mb-2">SKILLS ({activeCategory})</p>

            <div className="flex flex-wrap gap-2">
              {categoriesData[activeCategory]?.map((skill: string) => (
                <button
                  key={skill}
                  onClick={() => addOrRemoveSkill(skill, activeCategory)}
                  className={`px-3 py-1 rounded-full ${
                    skills[activeCategory]?.includes(skill)
                      ? "bg-green-400 text-black"
                      : "border border-gray-600"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            className="flex-1 border border-gray-600 rounded-lg py-2 hover:bg-gray-800 transition"
            onClick={ClearFilter}
          >
            Clear
          </button>

          <button
            onClick={handleSave}
            className="flex-1 bg-green-400 text-black rounded-lg py-2 font-bold hover:bg-green-300 transition"
          >
            Finish Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelancerSetupPage;