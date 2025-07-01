import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await requireAuth()

  const [applications, postedJobs] = await Promise.all([
    // Applications query
    prisma.application.findMany({
      where: {
        userId: session.user?.id ?? undefined,
      },
      include: {
        job: {
          include: {
            postedBy: true,
          },
        },
      },
      orderBy: {
        appliedAt: "desc",
      },
    }),

    //Jobs query
    prisma.job.findMany({
      where: {
        postedById: session.user?.id ?? undefined,
      },
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: {
        postedAt: "desc",
      },
    }),
  ]);

  const stats = {
    totalPostedJobs: postedJobs.length,
    totalApplications: applications.length,
    pendingApplications: applications.filter(app => app.status === 'PENDING').length,
    totalJobApplications: postedJobs.reduce((sum, job) => sum + job._count.applications, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative p-8 text-white">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">Welcome back, {session.user?.name}! 👋</h1>
                    <p className="text-white/90 text-lg">Here's what's happening with your jobs and applications</p>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-20 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-20 w-12 h-12 bg-yellow-300/20 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Posted Jobs", value: stats.totalPostedJobs, icon: "💼", color: "from-indigo-500 to-purple-600" },
            { label: "Your Applications", value: stats.totalApplications, icon: "📋", color: "from-emerald-500 to-teal-600" },
            { label: "Pending Applications", value: stats.pendingApplications, icon: "⏳", color: "from-orange-500 to-amber-600" },
            { label: "Total Job Applications", value: stats.totalJobApplications, icon: "👥", color: "from-pink-500 to-rose-600" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                </div>
              </div>
              <p className="text-slate-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Posted Jobs Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Posted Jobs</h2>
                  <p className="text-white/80">Manage your job listings</p>
                </div>
                <Link
                  href="/jobs/post"
                  className="group bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Post New Job
                </Link>
              </div>
            </div>

            <div className="p-6">
              {postedJobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-500 text-lg mb-4">You haven't posted any jobs yet.</p>
                  <Link
                    href="/jobs/post"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Post Your First Job
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {postedJobs.map((job, index) => (
                    <div key={job.id} className="group bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                              index % 3 === 0 ? 'bg-gradient-to-r from-indigo-500 to-purple-600' :
                              index % 3 === 1 ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                              'bg-gradient-to-r from-orange-500 to-pink-600'
                            }`}>
                              {job.company.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                {job.title}
                              </h3>
                              <p className="text-slate-600 font-medium">{job.company}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-600 font-medium border border-slate-200">
                              📍 {job.location}
                            </span>
                            <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-600 font-medium border border-slate-200">
                              💼 {job.type}
                            </span>
                            <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-600 font-medium border border-slate-200">
                              🕒 {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
                            {job._count.applications} applications
                          </span>
                          <Link
                            href={`/jobs/${job.id}`}
                            className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                          >
                            View Job
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Applications Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Your Applications</h2>
                <p className="text-white/80">Track your job applications</p>
              </div>
            </div>

            <div className="p-6">
              {applications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-slate-500 text-lg mb-4">You haven't applied to any jobs yet.</p>
                  <Link
                    href="/jobs"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Browse Jobs
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((application, index) => (
                    <div key={application.id} className="group bg-gradient-to-r from-slate-50 to-emerald-50/50 rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                              index % 3 === 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                              index % 3 === 1 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                              'bg-gradient-to-r from-purple-500 to-pink-600'
                            }`}>
                              {application.job.company.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                {application.job.title}
                              </h3>
                              <p className="text-slate-600 font-medium">{application.job.company}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-600 font-medium border border-slate-200">
                              📍 {application.job.location}
                            </span>
                            <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-600 font-medium border border-slate-200">
                              💼 {application.job.type}
                            </span>
                            <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-600 font-medium border border-slate-200">
                              🕒 Applied {formatDistanceToNow(new Date(application.appliedAt), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${
                              application.status === "PENDING"
                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                : application.status === "ACCEPTED"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                : "bg-red-100 text-red-800 border-red-200"
                            }`}
                          >
                            {application.status === "PENDING" ? "⏳" : application.status === "ACCEPTED" ? "✅" : "❌"} {application.status}
                          </span>
                          <Link
                            href={`/jobs/${application.job.id}`}
                            className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                          >
                            View Job
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}