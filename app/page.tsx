import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const recentJobs = await prisma.job.findMany({
    take: 3,
    orderBy: {
      postedAt: "desc",
    },
    include: {
      postedBy: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl shadow-2xl">
            <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl"></div>
            
            <div className="relative z-10 text-center py-24 px-8">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Find Your{" "}
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Dream Job
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
                  Discover thousands of opportunities with top companies and take the next step in your career journey
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/jobs"
                    className="group bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
                  >
                    Browse Jobs
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  
                  <Link
                    href="/post"
                    className="group bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
                  >
                    Post a Job
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300/20 rounded-full blur-xl"></div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Active Jobs", value: "1,200+", icon: "💼" },
            { label: "Companies", value: "500+", icon: "🏢" },
            { label: "Job Seekers", value: "10K+", icon: "👥" },
            { label: "Success Rate", value: "95%", icon: "🎯" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Recent Jobs Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Latest Opportunities
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Fresh job postings from top companies looking for talented professionals like you
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentJobs.map((job, index) => (
              <div
                key={job.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Card Header */}
                <div className={`h-2 bg-gradient-to-r ${
                  index % 3 === 0 ? 'from-indigo-500 to-purple-600' :
                  index % 3 === 1 ? 'from-emerald-500 to-teal-600' :
                  'from-orange-500 to-pink-600'
                }`}></div>
                
                <div className="p-6">
                  {/* Company Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                      index % 3 === 0 ? 'bg-gradient-to-r from-indigo-500 to-purple-600' :
                      index % 3 === 1 ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                      'bg-gradient-to-r from-orange-500 to-pink-600'
                    }`}>
                      {job.company.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{job.company}</p>
                      <p className="text-sm text-slate-500">Hiring now</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {job.title}
                  </h3>
                  
                  {/* Job Details */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-600 font-medium">
                      📍 {job.location}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-600 font-medium">
                      💼 {job.type}
                    </span>
                  </div>

                  <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold">
                          {job.postedBy?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span>by {job.postedBy.name}</span>
                    </div>
                    
                    <Link
                      href={`/jobs/${job.id}`}
                      className="group/link inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                    >
                      View Details
                      <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Jobs CTA */}
          <div className="text-center mt-12">
            <Link
              href="/jobs"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Jobs
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative z-10 text-center py-16 px-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Whether you're looking for your next career move or seeking top talent, we've got you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/jobs"
                className="bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Find Jobs
              </Link>
              <Link
                href="/post-job"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300"
              >
                Post a Job
              </Link>
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20"></div>
          </div>
        </section>
      </div>
    </div>
  );
}