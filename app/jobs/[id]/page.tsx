import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyButton from "./ApplyButton";

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const jobId = (await params).id;
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { postedBy: true },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/jobs"
            className="group inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-8 text-white relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-3 leading-tight">{job.title}</h1>
                  <p className="text-xl text-white/90 mb-4 font-medium">{job.company}</p>
                  
                  {/* Job Details Pills */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                      📍 {job.location}
                    </span>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                      💼 {job.type}
                    </span>
                    {job.salary && (
                      <span className="px-4 py-2 bg-emerald-500/30 backdrop-blur-sm rounded-full text-sm font-semibold border border-emerald-400/30">
                        💰 {job.salary}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Posted Info */}
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold">
                      {job.postedBy?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span>Posted by {job.postedBy.name}</span>
                </div>
                <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                <span>
                  {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Job Description */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Job Description</h2>
                  </div>
                  
                  <div className="prose prose-slate max-w-none">
                    <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">
                      {job.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Apply Section */}
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-6 border border-slate-200/50">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Ready to Apply?</h3>
                    <p className="text-slate-600 text-sm mb-6">
                      Take the next step in your career journey with this exciting opportunity.
                    </p>
                    <ApplyButton jobId={job.id} />
                  </div>

                  {/* Quick Info */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Info</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-slate-600 text-sm">Job Type: <span className="font-medium text-slate-900">{job.type}</span></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-slate-600 text-sm">Location: <span className="font-medium text-slate-900">{job.location}</span></span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-slate-600 text-sm">Salary: <span className="font-medium text-slate-900">{job.salary}</span></span>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-slate-600 text-sm">Posted: <span className="font-medium text-slate-900">{formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">About the Company</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {job.company.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{job.company}</p>
                        <p className="text-sm text-slate-600">Hiring Company</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}