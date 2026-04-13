import React from 'react'

const PostJob = () => {

 
  return (
    <div className="flex flex-col gap-8 w-full bg-black text-white px-10 py-10 min-h-screen">
  {/* Header */}
  <div className="flex flex-col gap-4">
    <h1 className="text-4xl font-bold">Post a New Job</h1>
    <p className="text-xl text-gray-400 max-w-3xl">
      Fill in the details below to find the perfect freelancer for your next big project.
      Get responses from top experts in minutes.
    </p>
  </div>

  {/* Form Container */}
  <div className="flex flex-col gap-6 w-full max-w-5xl border border-gray-800 rounded-lg bg-black p-6">
    
    {/* Job Title */}
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-medium">Job Title</h3>
      <input 
        className="bg-[#333333] border border-gray-700 rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" 
        placeholder="e.g. Senior React Developer for Fintech Platform"
      />
    </div>

    {/* Category & Budget */}
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-xl font-medium">Category</h3>
        <select className="bg-[#333333] border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option>Web Development</option>
          <option>UI/UX Design</option>
          <option>Mobile Apps</option>
          <option>Graphic Design</option>
          <option>Digital Marketing</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-xl font-medium">Estimated Budget (USD)</h3>
        <input type='numberQZ'
          className="bg-[#333333] border border-gray-700 rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" 
          placeholder="$ 0.00"
        />
      </div>
    </div>

    {/* Job Description */}
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-medium">Job Description</h3>
      <textarea 
        className="bg-[#333333] border border-gray-700 rounded-lg p-4 min-h-[150px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Describe the project requirements goals , and key delevrables...."
      />
    </div>

    {/* Skills */}
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-medium">Required Skills</h3>
      <input 
        className="bg-[#333333] border border-gray-700 rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Add new Skills"
      />
      <p className="text-sm text-gray-400">Press Enter or comma to add skills</p>
    </div>

    {/* Button */}
    <button className="w-60 mt-4 py-3 px-6 bg-green-600 rounded-lg font-semibold hover:bg-green-500 transition">
       <span className="text-lg"> + </span>
          Post Job Now
    </button>
  </div>
</div>
  )
}

export default PostJob