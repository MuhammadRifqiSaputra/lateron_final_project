import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Sesuaikan path logo kamu
import l2 from "../assets/logo2.jpg";  // Sesuaikan path logo footer kamu

export default function Profile() {
  const navigate = useNavigate();

  // 1. STATE UNTUK KONTROL SUB-MENU (Dashboard vs Setting Profile)
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard" atau "setting"

  // 2. Ambil data user dari localStorage
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const savedProfile = JSON.parse(localStorage.getItem("profile") || "{}");
  const savedRoadmap = JSON.parse(localStorage.getItem("roadmap") || "{}");

  // 3. STATE DATA INPUT FORM (Untuk Setting Profile)
  const [formData, setFormData] = useState({
    fullName: savedProfile.fullName || "",
    username: savedProfile.username || "",
    email: savedUser.email || "",
    phone: savedProfile.phone || "",
    gender: savedProfile.gender || "",
    birthDate: savedProfile.birthDate || "",
    status: savedProfile.status || "",
    testDate: savedRoadmap.testDate || savedProfile.testDate || "",
    targetScore: savedRoadmap.targetScore || savedProfile.targetScore || ""
  });

  const [reminder, setReminder] = useState(false);

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(formData));
    alert("Profil berhasil disimpan!");
  };
  const [streakNotif, setStreakNotif] = useState(false);

  return (
    <div className="min-h-screen bg-white antialiased flex flex-col justify-between font-sans">
      
      {/* ================= NAVBAR GLOBAL (LOGOUT DIHAPUS) ================= */}
      <nav className="bg-[#2471A3] flex items-center justify-between px-16 py-4 sticky top-0 z-50 shadow-xs text-white">
        {/* Sisi Kiri: Logo */}
        <div className="shrink-0 cursor-pointer" onClick={() => navigate("/dashboard")}>
          <img src={logo} alt="Lateron" className="w-[100px] h-auto object-contain brightness-0 invert" />
        </div>
        
        {/* Sisi Kanan: Menu Navigasi */}
        <div className="flex items-center gap-8 text-[15px] opacity-90">
          <Link to="/dashboard" className="hover:underline">Home</Link>
          <Link to="/generate" className="hover:underline">Generate</Link>
          <Link to="/my-roadmap" className="hover:underline">My Roadmap</Link>
          <button className="font-bold border-b-2 border-white pb-1 bg-transparent text-white cursor-pointer">Profile</button>
        </div>
      </nav>

      {/* ================= LAYOUT UTAMA PROFILE ================= */}
      <main className="max-w-7xl w-full mx-auto px-16 py-10 flex-grow flex gap-16">
        
        {/* SIDEBAR NAVIGATION (KIRI) */}
        <div className="w-[22%] shrink-0 flex flex-col justify-between border-r border-gray-100 pr-8 min-h-[500px]">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full text-left px-6 py-3.5 rounded-2xl font-semibold text-[14px] transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-[#2471A3] text-white shadow-xs"
                  : "bg-transparent text-gray-400 hover:bg-gray-50"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("setting")}
              className={`w-full text-left px-6 py-3.5 rounded-2xl font-semibold text-[14px] transition-all cursor-pointer ${
                activeTab === "setting"
                  ? "bg-[#2471A3] text-white shadow-xs"
                  : "bg-transparent text-gray-400 hover:bg-gray-50"
              }`}
            >
              Setting Profile
            </button>
          </div>

          {/* Tombol Log Out Bawah Kiri Oval Sesuai Gambar */}
          <button 
            onClick={() => { localStorage.removeItem("isLoggedIn"); navigate("/"); }}
            className="w-full border border-gray-300 text-gray-400 hover:text-red-500 hover:border-red-500 text-[14px] py-2.5 rounded-full bg-transparent transition-all cursor-pointer text-center"
          >
            Log Out
          </button>
        </div>

        {/* AREA KONTEN UTAMA (KANAN) */}
        <div className="flex-1 pl-4">
          
          {/* USER PROFILE HEADER CARD */}
          <div className="flex items-center gap-5 mb-8">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" 
              alt="Avatar" 
              className="w-20 h-20 rounded-full object-cover border border-gray-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[26px] font-bold text-[#143F5E]">{formData.fullName || formData.email || "User"}</h2>
                <span className="text-gray-400 cursor-pointer text-lg hover:text-[#2471A3]">📝</span>
              </div>
              <p className="text-[14px] text-gray-400 font-medium">Mahasiswa &bull; IELTS</p>
            </div>
          </div>

          {/* KONDISIONAL VIEW TABS */}
          {activeTab === "dashboard" ? (
            /* ================= VIEW 1: DASHBOARD ================= */
            <div>
              <h3 className="text-[20px] font-bold text-[#143F5E] mb-1">Progress Review</h3>
              <p className="text-[13px] text-gray-400 mb-6">
                Track your study progress, monitor your performance, and stay on the right path toward your target language test score.
              </p>

              {/* Grid 4 Progress Cards */}
              <div className="grid grid-cols-4 gap-4 mb-10">
                <div className="bg-[#E8F8F5] p-5 rounded-3xl">
                  <p className="text-[13px] text-emerald-800 font-semibold mb-3">Current Progress</p>
                  <p className="text-[36px] font-bold text-[#2ECC71]">42%</p>
                </div>
                <div className="bg-[#FADBD8] p-5 rounded-3xl">
                  <p className="text-[13px] text-red-800 font-semibold mb-3">Study Streak</p>
                  <p className="text-[36px] font-bold text-[#E74C3C]">7 <span className="text-[16px] font-semibold">Hari</span></p>
                </div>
                <div className="bg-[#EBF5FB] p-5 rounded-3xl">
                  <p className="text-[13px] text-blue-800 font-semibold mb-3">Sesi Selesai</p>
                  <p className="text-[36px] font-bold text-[#3498DB]">12 <span className="text-[16px] font-semibold">Sesi</span></p>
                </div>
                <div className="bg-[#FDEBD0] p-5 rounded-3xl">
                  <p className="text-[13px] text-amber-800 font-semibold mb-3">Hari Menuju Test</p>
                  <p className="text-[36px] font-bold text-[#E67E22]">18 <span className="text-[16px] font-semibold">Hari</span></p>
                </div>
              </div>

              {/* Section Detail Progress Skill Mingguan */}
              <h4 className="text-[16px] font-bold text-[#143F5E] mb-1">This Week's Progress</h4>
              <p className="text-[13px] text-gray-400 mb-6">See how much you've completed this week.</p>

              <div className="space-y-4 max-w-3xl mb-10">
                {[
                  { skill: "Listening Practice", val: 80, color: "bg-[#2ECC71]" },
                  { skill: "Reading Practice", val: 65, color: "bg-[#E67E22]" },
                  { skill: "Writing Practice", val: 70, color: "bg-[#F1C40F]" },
                  { skill: "Speaking Practice", val: 60, color: "bg-[#E74C3C]" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="w-32 text-[13px] font-medium text-gray-500">{item.skill}</span>
                    <span className="text-[13px] font-bold text-gray-400 w-8">{item.val}%</span>
                    <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <button className="bg-[#2471A3] text-white text-[14px] font-semibold px-8 py-3 rounded-full hover:bg-[#1C5D86] transition-colors shadow-md cursor-pointer">
                Continue Learning
              </button>
            </div>
          ) : (
            /* ================= VIEW 2: SETTING PROFILE ================= */
            <div>
              <h3 className="text-[18px] font-bold text-[#143F5E] border-b border-gray-100 pb-3 mb-6">Informasi pribadi</h3>
              
              {/* Grid Input Fields dengan rounded-2xl & placeholder abu-abu */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-5 max-w-4xl mb-8">
                <div>
                  <label className="block text-[13px] font-bold text-[#143F5E] mb-2">Nama Lengkap</label>
                  <input 
                    type="text" value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-[14px] focus:outline-none focus:border-[#2471A3] text-gray-700 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#143F5E] mb-2">Username</label>
                  <div className="relative">
                    <input 
                      type="text" value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-[14px] bg-white text-gray-700 pr-24 focus:outline-none focus:border-[#2471A3] font-medium"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-500 text-[13px] font-medium">Tersedia</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#143F5E] mb-2">Email</label>
                  <input type="email" value={formData.email} disabled className="w-full border border-gray-100 rounded-2xl px-5 py-3 text-[14px] bg-gray-50 text-gray-400 font-medium" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#143F5E] mb-2">Nomor Handphone</label>
                  <input type="text" placeholder="081x - xxxx - xxxx" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-[14px] focus:outline-none focus:border-[#2471A3] text-gray-700 font-medium placeholder-gray-300" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#143F5E] mb-2">Jenis Kelamin</label>
                  <input type="text" placeholder="081x - xxxx - xxxx" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-[14px] focus:outline-none focus:border-[#2471A3] text-gray-700 font-medium placeholder-gray-300" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#143F5E] mb-2">Tanggal Lahir</label>
                  <input type="text" placeholder="081x - xxxx - xxxx" value={formData.birthDate} onChange={(e) => setFormData({...formData, birthDate: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-[14px] focus:outline-none focus:border-[#2471A3] text-gray-700 font-medium placeholder-gray-300" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[13px] font-bold text-[#143F5E] mb-2">Pekerjaan / Status</label>
                  <input type="text" placeholder="081x - xxxx - xxxx" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-[14px] focus:outline-none focus:border-[#2471A3] text-gray-700 font-medium placeholder-gray-300" />
                </div>
              </div>

              {/* Target Belajar Section */}
              <h3 className="text-[18px] font-bold text-[#143F5E] border-b border-gray-100 pb-3 mb-4">Target Belajar</h3>
              <p className="text-[14px] font-bold text-[#76D7C4] mb-4">{savedRoadmap.testType || "-"}</p>
              
              <div className="grid grid-cols-2 gap-8 max-w-4xl mb-8">
                <div>
                  <label className="block text-[13px] font-bold text-gray-400 mb-2">Tanggal tes</label>
                  <input type="text" value={formData.testDate} onChange={(e) => setFormData({...formData, testDate: e.target.value})} className="w-full bg-[#EBF5FB] border-none rounded-2xl px-5 py-3.5 text-[14px] font-semibold text-[#143F5E] text-center focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-400 mb-2">Target score</label>
                  <input type="text" value={formData.targetScore} onChange={(e) => setFormData({...formData, targetScore: e.target.value})} className="w-full bg-[#EBF5FB] border-none rounded-2xl px-5 py-3.5 text-[14px] font-semibold text-[#143F5E] text-center focus:outline-none" />
                </div>
              </div>

              {/* Toggle Switch Preferences - Kustomisasi mirip asli */}
              <div className="max-w-4xl space-y-5 mb-10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[14px] font-bold text-[#143F5E]">Reminder belajar</p>
                    <p className="text-[12px] text-gray-400">Setiap hari 19.00 WIB</p>
                  </div>
                  {/* Toggle Switch Button */}
                  <button 
                    onClick={() => setReminder(!reminder)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${reminder ? "bg-[#143F5E]" : "bg-black"}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${reminder ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[14px] font-bold text-[#143F5E]">Notifikasi streak</p>
                    <p className="text-[12px] text-gray-400">Ingatkan jika streak akan putus</p>
                  </div>
                  {/* Toggle Switch Button */}
                  <button 
                    onClick={() => setStreakNotif(!streakNotif)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${streakNotif ? "bg-[#143F5E]" : "bg-black"}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${streakNotif ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                </div>
              </div>

              {/* Keamanan Akun */}
              <h3 className="text-[18px] font-bold text-[#143F5E] border-b border-gray-100 pb-3 mb-6">Keamanan akun</h3>
              <div className="max-w-4xl space-y-5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[14px] font-bold text-[#143F5E]">Ganti password</p>
                    <p className="text-[12px] text-gray-400">Terakhir 15 hari yang lalu</p>
                  </div>
                  {/* Icon Warning Bulat */}
                  <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-400 text-[12px] font-bold cursor-pointer hover:border-gray-600 hover:text-gray-600">!</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[14px] font-bold text-[#143F5E]">Verifikasi email</p>
                    <p className="text-[12px] text-emerald-500 font-medium">Email sudah terverifikasi</p>
                  </div>
                  {/* Checkmark Hijau */}
                  <span className="text-emerald-500 font-bold text-xl mr-1">✓</span>
                </div>
              </div>

              {/* Tombol Save */}
              <div className="mt-8">
                <button
                  onClick={handleSave}
                  className="bg-[#2471A3] text-white text-[14px] font-semibold px-10 py-3 rounded-full hover:bg-[#1C5D86] transition-colors shadow-md cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* ================= GLOBAL FOOTER ================= */}
      <footer className="px-16 pt-14 pb-8 bg-[#EBF2F7] w-full">
        <div className="flex justify-between mb-10 max-w-6xl mx-auto">
          <div className="w-[30%]">
            <img src={l2} alt="Lateron" className="w-[90px] h-auto object-contain mb-4" />
            <p className="text-[13px] text-[#5A92B5] leading-relaxed">
              Helping learners achieve their language goals with personalized roadmaps and smarter preparation.
            </p>
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#143F5E] mb-4">Quick Links</p>
            {["Home", "About Us", "Roadmap", "Dashboard"].map((l) => (
              <button key={l} onClick={() => navigate("/my-roadmap")} className="block text-[13px] text-[#5A92B5] mb-2.5 hover:text-[#2471A3] bg-transparent p-0 border-none transition-colors cursor-pointer">{l}</button>
            ))}
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#143F5E] mb-4">Support</p>
            {["Language Test", "Progress Tracker", "Contact", "FAQ"].map((l) => (
              <Link key={l} to="/dashboard" className="block text-[13px] text-[#5A92B5] mb-2.5 hover:text-[#2471A3] transition-colors">{l}</Link>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-300/40 pt-6">
          <p className="text-center text-[12px] text-[#5A92B5]">
            © 2026 Lateron. All Rights Reserved. Your Language Learning Partner.
          </p>
        </div>
      </footer>

    </div>
  );
}