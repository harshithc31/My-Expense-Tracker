import React from 'react'

function Hero() {
  return (
    <div>
      <section className="bg-white-900 text-black">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex ">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
            >
              Manage Your Expense

              <span className="sm:block"> Control Your Money </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Start creating your budget and save tons of money!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded-sm border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black focus:ring-3 focus:outline-hidden sm:w-auto"
                href='/sign-in'
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero