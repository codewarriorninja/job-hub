"use client"

import { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { requireAuth } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type JobData = {
    title: string | FormDataEntryValue | null;
    company: string | FormDataEntryValue | null;
    location: string | FormDataEntryValue | null;
    type: string | FormDataEntryValue | null;
    description: string | FormDataEntryValue | null;
    salary?: string | FormDataEntryValue | null;
};

const postJob = async (jobData: JobData) => {
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  if (!res.ok) {
    throw new Error("Failed to post job");
  }

  return res.json();
};

const PostJobPage = () => {
  const {data: session, status} = useSession();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: postJob,
    onSuccess: () => {
      window.location.href = '/jobs';
    },
    onError: (error) => {
      console.error("Error posting job:", error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(status === 'loading') return;
    if(status === 'unauthenticated'){
      router.push('/sign-in');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      company: formData.get("company"),
      location: formData.get("location"),
      type: formData.get("type"),
      description: formData.get("description"),
      salary: formData.get("salary"),
    };

    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Post Your Job Opening
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect candidate for your team. Share your opportunity with talented professionals.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8 md:p-12">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Job Title */}
            <div className="group">
              <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                Job Title *
              </label>
              <input 
                type="text" 
                name="title" 
                id="title" 
                required 
                placeholder="e.g., Senior Software Engineer"
                className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200 group-hover:border-indigo-300" 
              />
            </div>

            {/* Company */}
            <div className="group">
              <label htmlFor="company" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2-2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Company *
              </label>
              <input 
                type="text" 
                name="company" 
                id="company" 
                required 
                placeholder="e.g., Tech Innovations Inc."
                className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200 group-hover:border-indigo-300" 
              />
            </div>

            {/* Location and Type Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="group">
                <label htmlFor="location" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location *
                </label>
                <input 
                  type="text" 
                  name="location" 
                  id="location" 
                  required 
                  placeholder="e.g., San Francisco, CA or Remote"
                  className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200 group-hover:border-indigo-300" 
                />
              </div>

              <div className="group">
                <label htmlFor="type" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Job Type *
                </label>
                <select 
                  name="type" 
                  id="type" 
                  required 
                  className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 transition-all duration-200 group-hover:border-indigo-300 appearance-none"
                >
                  <option value="">Select a type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none mt-10">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Salary */}
            <div className="group">
              <label htmlFor="salary" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Salary Range
                <span className="ml-2 text-xs text-gray-500 font-normal">(optional)</span>
              </label>
              <input 
                type="text" 
                name="salary" 
                id="salary" 
                placeholder="e.g., $80,000 - $120,000 or $50/hour"
                className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200 group-hover:border-indigo-300" 
              />
            </div>

            {/* Description */}
            <div className="group">
              <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Job Description *
              </label>
              <div className="relative">
                <textarea 
                  name="description" 
                  id="description" 
                  rows={8} 
                  required 
                  placeholder="Describe the role, responsibilities, requirements, and what makes this opportunity exciting..."
                  className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200 group-hover:border-indigo-300 resize-none" 
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  Be detailed and engaging
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Posting Your Job...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Post Job Opening
                  </span>
                )}
              </button>
            </div>

            {/* Success/Error Messages */}
            {mutation.isError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700 font-medium">Failed to post job. Please try again.</span>
              </div>
            )}
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Tips for a Great Job Post
          </h3>
          <div className="grid gap-4 md:grid-cols-2 text-sm text-gray-600">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Be specific about required skills and experience levels</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Include information about company culture and benefits</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Mention growth opportunities and career development</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Be transparent about salary ranges when possible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;