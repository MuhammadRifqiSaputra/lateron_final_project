import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoLateron from '../assets/logo2.jpg'; // Mengimpor gambar logo dari folder assets kamu

// ==========================================
// COMPONENT POPUP KALENDER KUSTOM (SUDAH FIX & WORK)
// ==========================================
const CustomCalendar = ({ value, onChange, onClose }) => {
  // Parsing date awal dari string form 'YYYY-MM-DD'
  const initialDate = value ? new Date(value) : new Date(2026, 4, 6);
  
  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth()); // 0-11
  const [selectedDay, setSelectedDay] = useState(initialDate.getDate());

  const calendarRef = useRef(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Hitung jumlah hari dalam bulan aktif dan index hari pertamanya
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Efek klik di luar komponen untuk menutup kalender secara otomatis
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  const prevMonth = (e) => {
    e.stopPropagation();
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = (e) => {
    e.stopPropagation();
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleSelectDay = (e, day) => {
    e.stopPropagation();
    setSelectedDay(day);
  };

  const handleApply = (e) => {
    e.stopPropagation();
    // Memformat kembali menjadi string 'YYYY-MM-DD' yang valid
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(selectedDay).padStart(2, '0');
    onChange(`${year}-${formattedMonth}-${formattedDay}`);
  };

  // Render grid tanggal
  const renderDaysGrid = () => {
    const totalSlots = [];
    
    // Slot kosong untuk hari sebelum tanggal 1
    for (let i = 0; i < firstDayIndex; i++) {
      totalSlots.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    // Mengisi tanggal 1 sampai akhir bulan
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentSelected = selectedDay === day;
      totalSlots.push(
        <button
          key={`day-${day}`}
          type="button"
          onClick={(e) => handleSelectDay(e, day)}
          className={`h-8 w-8 flex items-center justify-center text-[13px] font-medium rounded-lg transition-all ${
            isCurrentSelected
              ? 'bg-[#2979BA] text-white font-bold shadow-sm'
              : 'text-gray-700 hover:bg-[#EDF4FF] hover:text-[#2979BA]'
          }`}
        >
          {day}
        </button>
      );
    }
    return totalSlots;
  };

  return (
    <div 
      ref={calendarRef}
      onClick={(e) => e.stopPropagation()} // Mencegah bubbling klik ke wrapper form
      className="absolute left-0 top-[105%] z-50 mt-1 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 w-[280px] animate-in fade-in zoom-in-95 duration-100"
    >
      {/* HEADER BULAN & TAHUN */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button 
          type="button" 
          onClick={prevMonth}
          className="h-7 w-7 flex items-center justify-center border border-gray-100 rounded-lg text-gray-400 hover:bg-slate-50 transition-colors"
        >
          <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
        </button>
        
        <span className="font-bold text-[14px] text-[#1F384C]">
          {monthNames[month]} {year}
        </span>

        <button 
          type="button" 
          onClick={nextMonth}
          className="h-7 w-7 flex items-center justify-center border border-gray-100 rounded-lg text-gray-400 hover:bg-slate-50 transition-colors"
        >
          <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      {/* NAMA HARI */}
      <div className="grid grid-cols-7 text-center text-gray-400 font-semibold text-[11px] mb-1.5">
        {daysOfWeek.map(day => (
          <div key={day} className="h-6 flex items-center justify-center">{day}</div>
        ))}
      </div>

      {/* GRID HARI */}
      <div className="grid grid-cols-7 gap-y-1 justify-items-center mb-4">
        {renderDaysGrid()}
      </div>

      {/* FOOTER ACTION */}
      <div className="border-t border-gray-50 pt-3 flex items-center justify-between">
        <span className="font-bold text-[12px] text-gray-400">
          {selectedDay} {monthNames[month].substring(0, 3)}
        </span>
        <button
          type="button"
          onClick={handleApply}
          className="bg-[#2979BA] text-white text-[12px] font-bold py-1.5 px-4 rounded-xl hover:bg-blue-600 transition-colors shadow-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
};


// ==========================================
// MAIN RECT COMPONENT
// ==========================================
const Generate = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);

  // State untuk melacak popover kalender mana yang sedang terbuka ('start' | 'test' | null)
  const [activePicker, setActivePicker] = useState(null);

  const [formData, setFormData] = useState({
    testType: 'IELTS',
    currentLevel: 'Basic',
    targetScore: '7.0',
    targetPurpose: 'For Education',
    startDate: '2026-05-06',
    testDate: '2026-07-06',
    dailyStudyTime: '1 Jam',
    studyDaysPerWeek: '5 days'
  });

  // Helper untuk mengubah string date format HTML '2026-05-06' menjadi tulisan indah di UI
  const formatReadableDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleNext = () => {
    if (activeStep < 5) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const handleGenerateRoadmap = () => {
    localStorage.setItem("roadmap", JSON.stringify({
      testType: formData.testType,
      currentLevel: formData.currentLevel,
      targetScore: formData.targetScore,
      targetPurpose: formData.targetPurpose,
      startDate: formData.startDate,
      testDate: formData.testDate,
      dailyStudyTime: formData.dailyStudyTime,
      studyDaysPerWeek: formData.studyDaysPerWeek,
    }));
    navigate('/my-roadmap');
  };

  const steps = [
    { id: 1, label: 'Language Test' },
    { id: 2, label: 'Target Score' },
    { id: 3, label: 'Study Timeline' },
    { id: 4, label: 'Study Preferences' },
    { id: 5, label: 'Generate Roadmap' },
  ];

  return (
    <div className="h-screen w-screen bg-white font-sans flex flex-col justify-between overflow-hidden text-[#1F384C]">
      
      {/* NAVBAR (KINI BAGIAN KANAN DIISI UTK BUTTON NAVBAR, TENGAH KOSONG) */}
      <nav className="w-full bg-white border-b border-gray-100 px-16 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <img 
            src={logoLateron} 
            alt="Lateron Logo" 
            className="h-9 object-contain" 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.insertAdjacentHTML('afterend', '<div class="text-[#2979BA] font-bold text-xl flex items-center gap-1"><span class="text-2xl">⌊</span>Lateron</div>');
            }}
          />
        </div>

        {/* Tengah dikosongkan total */}
        <div></div>

        {/* Menu Navigasi ditaruh rapat di kanan menggantikan Login / Get Started */}
        <div className="flex items-center gap-7 text-sm font-medium text-gray-500">
          <Link to="/dashboard" className="hover:text-[#2979BA] transition-colors">Home</Link>
          <span className="text-gray-300">•</span>
          <span className="text-[#2979BA] font-semibold">Generate</span>
          <span className="text-gray-300">•</span>
          <Link to="/my-roadmap" className="hover:text-[#2979BA] transition-colors">My Roadmap</Link>
          <span className="text-gray-300">•</span>
          <Link to="/profile" className="hover:text-[#2979BA] transition-colors">Profile</Link>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl w-full mx-auto px-16 py-6 flex flex-col flex-grow justify-start overflow-hidden">
        <div>
          <h1 className="text-[26px] font-bold text-[#1F384C] tracking-tight">Set Up Your Learning Roadmap</h1>
          <p className="text-gray-400 text-[14px] mt-1">Tell us your goals and schedule so we can create the best study plan for your language test.</p>
        </div>

        {/* WORKSPACE AREA */}
        <div className="flex mt-8 gap-16 items-stretch flex-grow overflow-hidden mb-4">
          
          {/* SIDEBAR NAVIGATION (KIRI) */}
          <div className="w-1/4 flex flex-col gap-1 border-r border-gray-100 pr-8 justify-start pt-2 shrink-0">
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              const isPast = step.id < activeStep;
              return (
                <button
                  key={step.id}
                  disabled={step.id > activeStep}
                  onClick={() => setActiveStep(step.id)}
                  className={`text-left py-3 px-5 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#2979BA] text-white shadow-sm font-semibold' 
                      : isPast 
                        ? 'text-gray-400 hover:bg-slate-50' 
                        : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {step.label}
                </button>
              );
            })}
          </div>

          {/* COMPONENT FORM (KANAN) */}
          <div className="w-3/4 flex flex-col justify-start pl-4 py-2 overflow-hidden">
            
            <div className="space-y-6 flex-grow">
              {/* STEP 1: Language Test */}
              {activeStep === 1 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">Select Test Type</label>
                    <div className="relative">
                      <select 
                        value={formData.testType}
                        onChange={(e) => setFormData({...formData, testType: e.target.value})}
                        className="w-full p-3.5 border border-gray-200 rounded-2xl bg-[#EDF4FF]/40 text-[#1F384C] font-medium appearance-none focus:outline-none focus:border-[#2979BA] text-[15px]"
                      >
                        <option value="IELTS">IELTS</option>
                        <option value="TOEFL ITP">TOEFL</option>
                        <option value="CAE">JLTP</option>
                        <option value="JLPT">HSK</option>
                        <option value="HSK">TOPIK</option>
                        <option value="TOPIK">CAE</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#2979BA]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    <span className="text-[12px] text-gray-400 mt-1.5 block">Choose your language proficiency test</span>
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">Current Skill Level</label>
                    <div className="relative">
                      <select 
                        value={formData.currentLevel}
                        onChange={(e) => setFormData({...formData, currentLevel: e.target.value})}
                        className="w-full p-3.5 border border-[#2979BA]/40 rounded-2xl bg-[#EDF4FF]/50 text-[#1F384C] font-medium appearance-none focus:outline-none focus:border-[#2979BA] text-[15px]"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Expert</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#2979BA]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    <span className="text-[12px] text-gray-400 mt-1.5 block">Tell us your current language level.</span>
                  </div>
                </div>
              )}

              {/* STEP 2: Target Score */}
              {activeStep === 2 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">Target Score</label>
                    <input 
                      type="text" 
                      value={formData.targetScore}
                      onChange={(e) => setFormData({...formData, targetScore: e.target.value})}
                      className="w-full p-3.5 border border-gray-200 rounded-2xl bg-[#EDF4FF]/40 text-[#1F384C] font-medium focus:outline-none focus:border-[#2979BA] text-[15px]"
                      placeholder="e.g. 7.0"
                    />
                    <span className="text-[12px] text-gray-400 mt-1.5 block">Set the score or level you want to achieve</span>
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">Target / Purpose</label>
                    <div className="relative">
                      <select 
                        value={formData.targetPurpose}
                        onChange={(e) => setFormData({...formData, targetPurpose: e.target.value})}
                        className="w-full p-3.5 border border-[#2979BA]/40 rounded-2xl bg-[#EDF4FF]/50 text-[#1F384C] font-medium appearance-none focus:outline-none focus:border-[#2979BA] text-[15px]"
                      >
                        <option value="For Education">For Education</option>
                        <option value="For Work">For Work</option>
                        <option value="Personal Growth">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#2979BA]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    <span className="text-[12px] text-gray-400 mt-1.5 block">Tell us why you need this test</span>
                  </div>
                </div>
              )}

              {/* STEP 3: Study Timeline (CUSTOM CALENDAR POPOVER YANG SUDAH BERFUNGSI) */}
              {activeStep === 3 && (
                <div className="flex flex-col gap-5">
                  
                  {/* INPUT 1: Start Learning Date */}
                  <div className="relative">
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">Start Learning Date</label>
                    <div 
                      onClick={() => setActivePicker(activePicker === 'start' ? null : 'start')}
                      className="w-full p-3.5 border border-gray-200 rounded-2xl bg-[#EDF4FF]/40 text-[#1F384C] font-semibold px-5 text-[15px] flex items-center justify-between cursor-pointer hover:border-[#2979BA]/50 transition-all select-none"
                    >
                      <span>{formatReadableDate(formData.startDate)}</span>
                      <svg className="w-5 h-5 text-[#2979BA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <span className="text-[12px] text-gray-400 mt-1.5 block">Choose when you want to start studying</span>

                    {activePicker === 'start' && (
                      <CustomCalendar 
                        value={formData.startDate}
                        onClose={() => setActivePicker(null)}
                        onChange={(newDate) => {
                          setFormData({ ...formData, startDate: newDate });
                          setActivePicker(null); // Tutup otomatis setelah apply
                        }}
                      />
                    )}
                  </div>

                  {/* INPUT 2: Test Date */}
                  <div className="relative">
                    <label className="block text-[14px] font-bold text-gray-700 mb-2">Test Date</label>
                    <div 
                      onClick={() => setActivePicker(activePicker === 'test' ? null : 'test')}
                      className="w-full p-3.5 border border-[#2979BA]/40 rounded-2xl bg-[#EDF4FF]/50 text-[#1F384C] font-semibold px-5 text-[15px] flex items-center justify-between cursor-pointer hover:border-[#2979BA] transition-all select-none"
                    >
                      <span>{formatReadableDate(formData.testDate)}</span>
                      <svg className="w-5 h-5 text-[#2979BA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <span className="text-[12px] text-gray-400 mt-1.5 block">Choose your official exam date</span>

                    {activePicker === 'test' && (
                      <CustomCalendar 
                        value={formData.testDate}
                        onClose={() => setActivePicker(null)}
                        onChange={(newDate) => {
                          setFormData({ ...formData, testDate: newDate });
                          setActivePicker(null); // Tutup otomatis setelah apply
                        }}
                      />
                    )}
                  </div>

                </div>
              )}

              {/* STEP 4: Study Preferences */}
              {activeStep === 4 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-1">Daily Study Time</label>
                    <p className="text-[12px] text-gray-400 mb-3">How much time can you study each day?</p>
                    <div className="flex gap-4">
                      {['30 Menit', '1 Jam', '2 Jam', '3 Jam'].map((time) => (
                        <button 
                          key={time}
                          type="button"
                          onClick={() => setFormData({...formData, dailyStudyTime: time})}
                          className={`py-2 px-6 rounded-full text-sm font-medium transition-all duration-150 ${
                            formData.dailyStudyTime === time 
                              ? 'bg-[#2979BA] text-white shadow-sm font-semibold' 
                              : 'bg-[#EDF4FF]/60 text-[#2979BA] hover:bg-blue-100/80'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-gray-700 mb-1">Study Days Per Week</label>
                    <p className="text-[12px] text-gray-400 mb-3">How often will you study each week?</p>
                    <div className="flex gap-4">
                      {['3 days', '5 days', 'Everyday'].map((day) => (
                        <button 
                          key={day}
                          type="button"
                          onClick={() => setFormData({...formData, studyDaysPerWeek: day})}
                          className={`py-2 px-6 rounded-full text-sm font-medium transition-all duration-150 ${
                            formData.studyDaysPerWeek === day 
                              ? 'bg-[#2979BA] text-white shadow-sm font-semibold' 
                              : 'bg-[#EDF4FF]/60 text-[#2979BA] hover:bg-blue-100/80'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Summary */}
              {activeStep === 5 && (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap gap-4">
                    <div className="py-2.5 px-6 bg-[#EDF4FF]/60 text-[#2979BA] rounded-full font-semibold text-sm">
                      {formData.testType}
                    </div>
                    <div className="py-2.5 px-6 bg-[#EDF4FF]/60 text-[#2979BA] rounded-full font-semibold text-sm">
                      Band {formData.targetScore}
                    </div>
                    <div className="py-2.5 px-6 bg-[#EDF4FF]/60 text-[#2979BA] rounded-full font-semibold text-sm">
                      3 Months
                    </div>
                    <div className="py-2.5 px-6 bg-[#EDF4FF]/60 text-[#2979BA] rounded-full font-semibold text-sm">
                      {formData.dailyStudyTime}
                    </div>
                  </div>
                  
                  <div className="bg-[#D1E2FF]/70 text-[#1F384C] p-3 px-4 rounded-xl text-[13px] flex items-center gap-2.5 max-w-xl">
                    <span className="text-blue-600 text-base">✦</span> 
                    <p className="font-medium text-slate-600">Sistem akan membuat roadmap personal sesuai target dan waktu belajarmu.</p>
                  </div>
                </div>
              )}
            </div>

            {/* ACTION FOOTER BUTTONS */}
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 shrink-0">
              <button
                type="button"
                onClick={handleBack}
                className={`py-2 px-4 rounded-xl text-[14px] font-bold transition-all ${
                  activeStep > 1 
                    ? 'text-gray-500 hover:text-[#2979BA] hover:bg-slate-50' 
                    : 'text-slate-300 cursor-not-allowed opacity-0'
                }`}
              >
                Back
              </button>

              {activeStep < 5 ? (
                <button 
                  onClick={handleNext}
                  className="bg-[#2979BA] text-white py-2 px-6 rounded-xl font-medium text-[15px] hover:bg-blue-600 transition-all duration-150 shadow-sm"
                >
                  Next
                </button>
              ) : (
                <button 
                  onClick={handleGenerateRoadmap}
                  className="bg-[#2979BA] text-white py-2.5 px-6 rounded-xl font-medium text-[15px] hover:bg-blue-600 transition-all duration-150 shadow-sm"
                >
                  Generate My Roadmap
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-[#EDF4FF]/30 border-t border-gray-100 px-16 pt-6 pb-4 shrink-0">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-12 gap-8 items-start mb-4">
          
          <div className="col-span-5 flex flex-col gap-3">
            <img 
              src={logoLateron} 
              alt="Lateron Logo" 
              className="h-7 object-contain self-start" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.insertAdjacentHTML('afterend', '<div class="text-[#2979BA] font-bold text-lg flex items-center gap-1"><span class="text-xl">⌊</span>Lateron</div>');
              }}
            />
            <p className="text-gray-400 text-[12px] leading-relaxed max-w-xs">
              Helping learners achieve their language goals with personalized roadmaps and smarter preparation.
            </p>
          </div>

          <div className="col-span-3 flex flex-col gap-2">
            <h4 className="font-bold text-[13px] text-gray-700">Quick Links</h4>
            <div className="flex flex-col gap-1 text-[12px] text-gray-400">
              <Link to="/dashboard" className="hover:text-[#2979BA]">Home</Link>
              <a href="#" className="hover:text-[#2979BA]">About Us</a>
              <Link to="/my-roadmap" className="hover:text-[#2979BA]">Roadmap</Link>
              <Link to="/dashboard" className="hover:text-[#2979BA]">Dashboard</Link>
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-2">
            <h4 className="font-bold text-[13px] text-gray-700">Support</h4>
            <div className="flex flex-col gap-1 text-[12px] text-gray-400">
              <a href="#" className="hover:text-[#2979BA]">Language Test</a>
              <a href="#" className="hover:text-[#2979BA]">Progress Tracker</a>
              <a href="#" className="hover:text-[#2979BA]">Contact</a>
              <a href="#" className="hover:text-[#2979BA]">FAQ</a>
            </div>
          </div>
        </div>

        <div className="w-full text-center border-t border-slate-200/60 pt-3 text-[12px] text-gray-400 font-medium">
          © 2026 Lateron. All Rights Reserved. Your Language Learning Partner.
        </div>
      </footer>

    </div>
  );
};

export default Generate;