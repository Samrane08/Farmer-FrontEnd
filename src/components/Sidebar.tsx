import React from 'react';

const Sidebar: React.FC = () => {
    return (
       <aside className="bg-[#574b8b] w-20 md:w-52 flex flex-col text-white relative select-none">
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center md:justify-start h-20 border-b border-[#6B5FC9] px-4 md:px-6">
        <div className="text-white text-3xl opacity-90">
        
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true" role="img" >
            <path strokeLinecap="round" d="M12 6l6-3v12l-6 3m0-12L6 3v12l6 3z" />
          </svg>
        </div>
        <span className="hidden md:block text-lg font-semibold ml-3 select-text">Smart School</span>
      </div>
      <nav className="flex flex-col mt-7 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
        <a href="#" className="nav-link-active flex items-center rounded-full px-3 py-2 cursor-pointer text-sm md:text-base font-medium">
          <span className="hidden md:flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true" role="img">
              <path strokeLinecap="round" d="M3 12l2-2m0 0l7-7 7 7m-9 8v-8h4v8m5-2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
            </svg>
            <span>Dashboard</span>
          </span>
          <span className="md:hidden">D</span>
        </a>
        <a href="#" className="nav-link flex items-center rounded-full px-3 py-2 cursor-pointer text-sm md:text-base font-medium hover:bg-[#6f63b1c4] transition-colors duration-200">
          <span className="hidden md:flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true" role="img">
              <path strokeLinecap="round" d="M17 20h5v-2a4 4 0 0 0-3-3.87M12 12m-6 0a6 6 0 0 1 12 0M3 6h18M7 6v12m10-12v12" />
            </svg>
            <span>Students</span>
          </span>
          <span className="md:hidden">S</span>
        </a>
        <a href="#" className="nav-link flex items-center rounded-full px-3 py-2 cursor-pointer text-sm md:text-base font-medium hover:bg-[#6f63b1c4] transition-colors duration-200">
          <span className="hidden md:flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true" role="img">
              <path strokeLinecap="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" d="M12 14l6.16-3.422A12.083 12.083 0 0 1 21 19.5M21 19.5v1.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.5M21 19.5L12 14" />
            </svg>
            <span>Teachers</span>
          </span>
          <span className="md:hidden">T</span>
        </a>
        <a href="#" className="nav-link flex items-center rounded-full px-3 py-2 cursor-pointer text-sm md:text-base font-medium hover:bg-[#6f63b1c4] transition-colors duration-200">
          <span className="hidden md:flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true" role="img">
              <path strokeLinecap="round" d="M16 7a4 4 0 0 1 0 8 4 4 0 0 1 0-8zm-8 8H7a4 4 0 0 1 0-8h1" />
              <path strokeLinecap="round" d="M12 12v6m0 0h4m-4 0H8" />
            </svg>
            <span>Parents</span>
          </span>
          <span className="md:hidden">P</span>
        </a>
        <a href="#" className="nav-link flex items-center rounded-full px-3 py-2 cursor-pointer text-sm md:text-base font-medium hover:bg-[#6f63b1c4] transition-colors duration-200">Library</a>
        <a href="#" className="nav-link flex items-center rounded-full px-3 py-2 cursor-pointer text-sm md:text-base font-medium hover:bg-[#6f63b1c4] transition-colors duration-200">Attendance</a>
        <a href="#" className="nav-link flex items-center rounded-full px-3 py-2 cursor-pointer text-sm md:text-base font-medium hover:bg-[#6f63b1c4] transition-colors duration-200">Exam</a>
        <a href="#" className="nav-link flex items-center rounded-full px-3 py-2 cursor-pointer text-sm md:text-base font-medium hover:bg-[#6f63b1c4] transition-colors duration-200">Hostel</a>
        <a href="#" className="nav-link flex items-center rounded-full px-3 py-2 cursor-pointer text-sm md:text-base font-medium hover:bg-[#6f63b1c4] transition-colors duration-200">Account</a>
        <a href="#" className="nav-link flex items-center rounded-full px-3 py-2 cursor-pointer text-sm md:text-base font-medium hover:bg-[#6f63b1c4] transition-colors duration-200">Settings</a>
      </nav>
     
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#4f439a] to-transparent pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 200 50" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.15}}>
          <path d="M12 48c10-20 40-26 60-14 20 12 36 18 52 9 10-5 18-14 20-23-29-10-70-8-82 28-4-8-16-14-30-10z" fill="#D6D0EF" />
          <path d="M50 40c6-11 30-15 45-9 8 3 14 6 20 1-22-7-54-6-62 19-3-6-9-10-13-11z" fill="#9B90C9" />
          <path d="M40 48c12-17 36-21 50-13 8 5 14 9 20 4-26-12-60-12-74 18-6-8-14-15-16-20z" fill="#B9AFE0" />
        </svg>
      </div>
    </div>
  </aside>
    );
}

export default Sidebar;
