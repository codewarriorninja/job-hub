"use client"

import { login, loginwithFacebook, loginwithGoogle } from '@/lib/auth'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SignIn = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return 
    if (session) {
      router.push('/')
    }
  }, [session, status, router])

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto'></div>
          <p className='mt-4 text-slate-600'>Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render the sign-in form if user is already authenticated
  if (session) {
    return null
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center'>
      <div className='max-w-md w-full mx-4'>
        {/* Main Sign In Card */}
        <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden'>
          {/* Header Section */}
          <div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-8 text-center relative'>
            <div className='absolute inset-0 bg-black/10'></div>
            <div className='relative z-10'>
              <div className='w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6' />
                </svg>
              </div>
              <h1 className='text-3xl font-bold text-white mb-2'>Welcome Back</h1>
              <p className='text-white/90 text-lg'>
                Sign in to access JobList
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className='absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full blur-lg'></div>
            <div className='absolute bottom-4 left-4 w-8 h-8 bg-yellow-300/20 rounded-full blur-md'></div>
          </div>

          {/* Content Section */}
          <div className='p-8 space-y-6'>
            <div className='text-center'>
              <p className='text-slate-600 text-lg'>
                Post jobs or apply for opportunities with ease
              </p>
            </div>

            {/* Sign In Button */}
            <div className='space-y-4'>
              <button
                onClick={login}
                className='group w-full flex items-center justify-center gap-4 px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl font-semibold text-lg hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              >
                <svg
                  className="w-6 h-6 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Continue with GitHub</span>
                <svg className='w-5 h-5 transition-transform group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
              </button>

              {/* Alternative Sign In Options */}
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-slate-200'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-4 bg-white text-slate-500 font-medium'>Or continue with</span>
                </div>
              </div>

              {/* Social Login Options */}
              <div className='grid grid-cols-2 gap-3'>
                <button className='flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 font-medium'
                onClick={loginwithGoogle}
                >
                  <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' fill='#4285F4'/>
                    <path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' fill='#34A853'/>
                    <path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' fill='#FBBC05'/>
                    <path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' fill='#EA4335'/>
                  </svg>
                  <span className='text-sm'>Google</span>
                </button>
                
                <button
                onClick={loginwithFacebook}
                 className='flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 font-medium'>
                  <svg className='w-5 h-5 text-[#1877F2]' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/>
                  </svg>
                  <span className='text-sm'>Facebook</span>
                </button>
              </div>
            </div>

            {/* Features List */}
            <div className='bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-2xl p-6 border border-slate-200/50'>
              <h3 className='font-semibold text-slate-900 mb-4 text-center'>What you'll get access to:</h3>
              <div className='space-y-3'>
                {[
                  { icon: '🚀', text: 'Apply to thousands of jobs instantly' },
                  { icon: '💼', text: 'Post unlimited job listings' },
                  { icon: '📊', text: 'Track your applications & hirings' },
                  { icon: '🔔', text: 'Get notified about new opportunities' }
                ].map((feature, index) => (
                  <div key={index} className='flex items-center gap-3'>
                    <span className='text-lg'>{feature.icon}</span>
                    <span className='text-slate-700 text-sm font-medium'>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms and Privacy */}
            <div className='text-center text-sm text-slate-500 leading-relaxed'>
              By signing in, you agree to our{" "}
              <Link href={'#'} className='text-indigo-600 hover:text-indigo-700 font-medium transition-colors'>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href={"#"} className='text-indigo-600 hover:text-indigo-700 font-medium transition-colors'>
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Link */}
        <div className='text-center mt-8'>
          <Link 
            href='/jobs' 
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors'
          >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
            Browse jobs without signing in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn