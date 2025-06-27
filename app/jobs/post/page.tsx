"use client"

import { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";

type JobData = {
    title: string | FormDataEntryValue | null;
    company: string | FormDataEntryValue | null;
    location: string | FormDataEntryValue | null;
    type: string | FormDataEntryValue | null;
    description: string | FormDataEntryValue | null;
    salary?: string | FormDataEntryValue | null;
  };

const postJob = async (jobData:JobData) => {
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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a Job</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Input Fields */}
        {/* title, company, location, type, description, salary (same as you had) */}
        
        {/* TITLE */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
          <input type="text" name="title" id="title" required className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900" />
        </div>

        {/* COMPANY */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
          <input type="text" name="company" id="company" required className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900" />
        </div>

        {/* LOCATION */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" name="location" id="location" required className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900" />
        </div>

        {/* TYPE */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Job Type</label>
          <select name="type" id="type" required className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900">
            <option value="">Select a type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" id="description" rows={6} required className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900" />
        </div>

        {/* SALARY */}
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary (optional)</label>
          <input type="text" name="salary" id="salary" placeholder="e.g., $80,000 - $100,000" className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900" />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default PostJobPage;
