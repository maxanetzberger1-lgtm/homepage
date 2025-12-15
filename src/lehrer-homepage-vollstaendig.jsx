import React, { useState, useEffect } from 'react';
import { Calendar, Upload, Book, Users, Lock, Plus, X, Download, Eye, EyeOff, Trash2, Edit2, Check, AlertCircle, LogOut, FileText, Link as LinkIcon, Save, Clock, Sun, Moon, Image, Bell, Grid, BarChart3, User, CheckCircle, XCircle, Loader, Send } from 'lucide-react';

// Hauptkomponente
function LoginScreen({ onAdminLogin, onClassLogin, classes, adminPassword, setAdminPassword, classPassword, setClassPassword, showPassword, setShowPassword, darkMode, toggleDarkMode, studentName, setStudentName }) {
  const [selectedClassForLogin, setSelectedClassForLogin] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <button
        onClick={toggleDarkMode}
        className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all z-10"
      >
        {darkMode ? <Sun className="w-6 h-6 text-yellow-300" /> : <Moon className="w-6 h-6 text-white" />}
      </button>

      <div className="max-w-4xl w-full relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <Book className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Willkommen
          </h1>
          <p className="text-xl text-blue-200">Lehrer-Portal & Klassenverwaltung</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin-Login */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Lock className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Lehrer-Login</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Admin-Passwort
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && onAdminLogin()}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="Passwort eingeben"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <button
                onClick={onAdminLogin}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Als Lehrer anmelden
              </button>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Standard-Passwort:</strong> Lehrer2024!<br/>
                  <span className="text-blue-600">Bitte nach dem ersten Login ändern!</span>
                </p>
              </div>
            </div>
          </div>

          {/* Klassen-Login */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Schüler-Login</h2>
            </div>

            {classes.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Noch keine Klassen angelegt</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Klasse auswählen
                  </label>
                  <select
                    value={selectedClassForLogin?.id || ''}
                    onChange={(e) => {
                      const cls = classes.find(c => c.id === e.target.value);
                      setSelectedClassForLogin(cls);
                      setClassPassword('');
                    }}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  >
                    <option value="">-- Klasse wählen --</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name} {cls.year && `(${cls.year})`}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedClassForLogin && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Klassen-Passwort
                      </label>
                      <input
                        type="password"
                        value={classPassword}
                        onChange={(e) => setClassPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && onClassLogin(selectedClassForLogin)}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        placeholder="Passwort eingeben"
                      />
                    </div>

                    <button
                      onClick={() => onClassLogin(selectedClassForLogin)}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Zum Klassenbereich
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-blue-200 text-sm">
          <p>Entwickelt für digitalen Unterricht • Sicher & Privat</p>
        </div>
      </div>
    </div>
  );
}

// Vollständiges Admin-Panel

// ==================== LOGIN SCREEN ====================
function LoginScreen({ onAdminLogin, onClassLogin, classes, adminPassword, setAdminPassword, classPassword, setClassPassword, showPassword, setShowPassword, darkMode, toggleDarkMode, studentName, setStudentName }) {
  const [selectedClassForLogin, setSelectedClassForLogin] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <button onClick={toggleDarkMode} className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all z-10">
        {darkMode ? <Sun className="w-6 h-6 text-yellow-300" /> : <Moon className="w-6 h-6 text-white" />}
      </button>

      <div className="max-w-4xl w-full relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <Book className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>Willkommen</h1>
          <p className="text-xl text-blue-200">Lehrer-Portal • BayernCloud Edition</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg"><Lock className="w-6 h-6 text-indigo-600" /></div>
              <h2 className="text-2xl font-bold text-slate-800">Lehrer-Login</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Admin-Passwort</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && onAdminLogin()} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="Passwort eingeben" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <button onClick={onAdminLogin} className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Als Lehrer anmelden
              </button>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 rounded-lg"><Users className="w-6 h-6 text-emerald-600" /></div>
              <h2 className="text-2xl font-bold text-slate-800">Schüler-Login</h2>
            </div>

            {classes.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Noch keine Klassen angelegt</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Dein Name</label>
                  <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" placeholder="z.B. Max Mustermann" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Klasse auswählen</label>
                  <select value={selectedClassForLogin?.id || ''} onChange={(e) => { const cls = classes.find(c => c.id === e.target.value); setSelectedClassForLogin(cls); setClassPassword(''); }} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all">
                    <option value="">-- Klasse wählen --</option>
                    {classes.map(cls => (<option key={cls.id} value={cls.id}>{cls.name} {cls.year && `(${cls.year})`}</option>))}
                  </select>
                </div>

                {selectedClassForLogin && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Klassen-Passwort</label>
                      <input type="password" value={classPassword} onChange={(e) => setClassPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && onClassLogin(selectedClassForLogin)} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" placeholder="Passwort eingeben" />
                    </div>

                    <button onClick={() => onClassLogin(selectedClassForLogin)} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      Zum Klassenbereich
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


function AdminPanelVollstaendig({ classes, saveClasses, onLogout, darkMode, toggleDarkMode }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [newClass, setNewClass] = useState({ name: '', year: '', password: '', subjects: [], announcements: [], gallery: [], timetable: [] });

  const createClass = () => {
    if (!newClass.name || !newClass.password) {
      alert('Bitte Name und Passwort eingeben');
      return;
    }

    const classToAdd = {
      id: Date.now().toString(),
      ...newClass,
      materials: [],
      homework: [],
      appointments: [],
      createdAt: new Date().toISOString()
    };

    saveClasses([...classes, classToAdd]);
    setNewClass({ name: '', year: '', password: '', subjects: [] });
    alert('Klasse erfolgreich erstellt!');
  };

  const updateClass = (classId, updates) => {
    const updatedClasses = classes.map(cls => 
      cls.id === classId ? { ...cls, ...updates } : cls
    );
    saveClasses(updatedClasses);
  };

  const deleteClass = (classId) => {
    if (window.confirm('Klasse wirklich löschen? Alle Daten gehen verloren!')) {
      saveClasses(classes.filter(cls => cls.id !== classId));
      if (selectedClassId === classId) {
        setSelectedClassId(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 transition-colors">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl shadow-lg">
                <Book className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'Georgia, serif' }}>
                  Lehrer-Dashboard
                </h1>
                <p className="text-slate-500">Vollständige Verwaltung & Organisation</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleDarkMode()}
                className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all text-slate-700 font-medium"
              >
                <LogOut className="w-5 h-5" />
                Abmelden
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Grid },
            { id: 'overview', label: 'Übersicht', icon: Users },
            { id: 'create', label: 'Neue Klasse', icon: Plus },
            { id: 'materials', label: 'Materialien', icon: FileText },
            { id: 'homework', label: 'Hausaufgaben', icon: Book },
            { id: 'appointments', label: 'Termine', icon: Calendar },
            { id: 'announcements', label: 'Ankündigungen', icon: Bell },
            { id: 'gallery', label: 'Galerie', icon: Image },
            { id: 'timetable', label: 'Stundenplan', icon: Clock },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { 
                setActiveTab(tab.id); 
                if (tab.id === 'dashboard' || tab.id === 'overview' || tab.id === 'create') setSelectedClassId(null); 
              }}
              className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'dashboard' && <Dashboard classes={classes} darkMode={darkMode} />}
        {activeTab === 'overview' && <ClassOverview classes={classes} onDeleteClass={deleteClass} onUpdateClass={updateClass} />}
        {activeTab === 'create' && <CreateClassForm newClass={newClass} setNewClass={setNewClass} onCreate={createClass} />}
        {activeTab === 'materials' && <MaterialsManager classes={classes} selectedClassId={selectedClassId} setSelectedClassId={setSelectedClassId} onUpdateClass={updateClass} />}
        {activeTab === 'homework' && <HomeworkManager classes={classes} selectedClassId={selectedClassId} setSelectedClassId={setSelectedClassId} onUpdateClass={updateClass} />}
        {activeTab === 'appointments' && <AppointmentsManager classes={classes} selectedClassId={selectedClassId} setSelectedClassId={setSelectedClassId} onUpdateClass={updateClass} />}
        {activeTab === 'announcements' && <AnnouncementsManager classes={classes} selectedClassId={selectedClassId} setSelectedClassId={setSelectedClassId} onUpdateClass={updateClass} darkMode={darkMode} />}
        {activeTab === 'gallery' && <GalleryManager classes={classes} selectedClassId={selectedClassId} setSelectedClassId={setSelectedClassId} onUpdateClass={updateClass} darkMode={darkMode} />}
        {activeTab === 'timetable' && <TimetableManager classes={classes} selectedClassId={selectedClassId} setSelectedClassId={setSelectedClassId} onUpdateClass={updateClass} darkMode={darkMode} />}
      </div>
    </div>
  );
}

// Rest of the components follow... (I'll continue in the next part due to length)
// ClassOverview Component
function ClassOverview({ classes, onDeleteClass, onUpdateClass }) {
  const [editingClassId, setEditingClassId] = useState(null);

  if (classes.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p className="text-xl text-slate-500 mb-2">Noch keine Klassen angelegt</p>
        <p className="text-slate-400">Erstellen Sie Ihre erste Klasse im Tab "Neue Klasse"</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Meine Klassen</h2>
      
      <div className="grid gap-6">
        {classes.map(cls => (
          <div key={cls.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-800 mb-1">
                  {cls.name}
                </h3>
                {cls.year && (
                  <p className="text-slate-500">Schuljahr: {cls.year}</p>
                )}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingClassId(editingClassId === cls.id ? null : cls.id)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5 text-slate-600" />
                </button>
                <button
                  onClick={() => onDeleteClass(cls.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-blue-600 font-medium">Fächer</p>
                <p className="text-2xl font-bold text-blue-700">{cls.subjects?.length || 0}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4">
                <p className="text-sm text-emerald-600 font-medium">Materialien</p>
                <p className="text-2xl font-bold text-emerald-700">{cls.materials?.length || 0}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <p className="text-sm text-amber-600 font-medium">Hausaufgaben</p>
                <p className="text-2xl font-bold text-amber-700">{cls.homework?.length || 0}</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-sm text-purple-600 font-medium">Termine</p>
                <p className="text-2xl font-bold text-purple-700">{cls.appointments?.length || 0}</p>
              </div>
            </div>

            {/* Editor */}
            {editingClassId === cls.id && (
              <ClassEditorExpanded 
                classData={cls}
                onUpdate={onUpdateClass}
                onClose={() => setEditingClassId(null)}
              />
            )}

            {/* Password Info */}
            <div className="bg-slate-50 rounded-xl p-4 mt-4">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600">
                  Klassen-Passwort: <code className="bg-white px-2 py-1 rounded font-mono text-slate-800">{cls.password}</code>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Class Editor
function ClassEditorExpanded({ classData, onUpdate, onClose }) {
  const [name, setName] = useState(classData.name);
  const [year, setYear] = useState(classData.year);
  const [password, setPassword] = useState(classData.password);
  const [subjects, setSubjects] = useState(classData.subjects || []);
  const [newSubject, setNewSubject] = useState('');

  const handleSave = () => {
    onUpdate(classData.id, { name, year, password, subjects });
    alert('Änderungen gespeichert!');
    onClose();
  };

  const addSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject('');
    }
  };

  const removeSubject = (subject) => {
    setSubjects(subjects.filter(s => s !== subject));
  };

  return (
    <div className="border-t border-slate-200 pt-4 mt-4 space-y-4">
      <h4 className="font-semibold text-slate-700 mb-3">Klasse bearbeiten</h4>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Klassenname</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Schuljahr</label>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Passwort</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Fächer</label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSubject()}
            placeholder="Neues Fach"
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
          />
          <button
            onClick={addSubject}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {subjects.map(subject => (
            <span key={subject} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
              {subject}
              <button onClick={() => removeSubject(subject)} className="hover:text-blue-900">
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <Save className="w-5 h-5" />
          Speichern
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
        >
          Abbrechen
        </button>
      </div>
    </div>
  );
}

// Create Class Form
function CreateClassForm({ newClass, setNewClass, onCreate }) {
  const [newSubject, setNewSubject] = useState('');

  const addSubject = () => {
    if (newSubject.trim() && !newClass.subjects.includes(newSubject.trim())) {
      setNewClass({ 
        ...newClass, 
        subjects: [...newClass.subjects, newSubject.trim()] 
      });
      setNewSubject('');
    }
  };

  const removeSubject = (subject) => {
    setNewClass({ 
      ...newClass, 
      subjects: newClass.subjects.filter(s => s !== subject) 
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Neue Klasse erstellen</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Klassenname *
          </label>
          <input
            type="text"
            value={newClass.name}
            onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
            placeholder="z.B. 8a, Mathe-LK, Physik 12"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Schuljahr (optional)
          </label>
          <input
            type="text"
            value={newClass.year}
            onChange={(e) => setNewClass({ ...newClass, year: e.target.value })}
            placeholder="z.B. 2024/2025"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Klassen-Passwort * 
            <span className="text-slate-400 font-normal ml-2">(Schüler benötigen dies zum Login)</span>
          </label>
          <input
            type="text"
            value={newClass.password}
            onChange={(e) => setNewClass({ ...newClass, password: e.target.value })}
            placeholder="Sicheres Passwort wählen"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Fächer (optional)
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSubject()}
              placeholder="Fach hinzufügen"
              className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            />
            <button
              onClick={addSubject}
              className="px-4 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {newClass.subjects.map(subject => (
              <span key={subject} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                {subject}
                <button onClick={() => removeSubject(subject)} className="hover:text-blue-900">
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onCreate}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <Plus className="w-6 h-6" />
          Klasse erstellen
        </button>
      </div>
    </div>
  );
}

// Materials Manager
function MaterialsManager({ classes, selectedClassId, setSelectedClassId, onUpdateClass }) {
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    link: '',
    subject: ''
  });

  const selectedClass = classes.find(c => c.id === selectedClassId);

  const addMaterial = () => {
    if (!selectedClassId) {
      alert('Bitte wählen Sie zuerst eine Klasse aus');
      return;
    }
    if (!newMaterial.title) {
      alert('Bitte geben Sie einen Titel ein');
      return;
    }

    const material = {
      ...newMaterial,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };

    const materials = [...(selectedClass.materials || []), material];
    onUpdateClass(selectedClassId, { materials });
    
    setNewMaterial({ title: '', description: '', link: '', subject: '' });
    alert('Material erfolgreich hinzugefügt!');
  };

  const deleteMaterial = (materialId) => {
    if (window.confirm('Material wirklich löschen?')) {
      const materials = selectedClass.materials.filter(m => m.id !== materialId);
      onUpdateClass(selectedClassId, { materials });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Materialien verwalten</h2>

      {/* Class Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Klasse auswählen
        </label>
        <select
          value={selectedClassId || ''}
          onChange={(e) => setSelectedClassId(e.target.value)}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 outline-none"
        >
          <option value="">-- Klasse wählen --</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>
              {cls.name} {cls.year && `(${cls.year})`}
            </option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <>
          {/* Add Material Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Neues Material hinzufügen</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Titel *</label>
                <input
                  type="text"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                  placeholder="z.B. Arbeitsblatt Kapitel 5"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Beschreibung</label>
                <textarea
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                  placeholder="Weitere Informationen zum Material"
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Link / URL <span className="text-slate-400 font-normal">(z.B. zu Google Drive, Dropbox, etc.)</span>
                </label>
                <input
                  type="url"
                  value={newMaterial.link}
                  onChange={(e) => setNewMaterial({ ...newMaterial, link: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Fach</label>
                <select
                  value={newMaterial.subject}
                  onChange={(e) => setNewMaterial({ ...newMaterial, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
                >
                  <option value="">-- Fach wählen --</option>
                  {selectedClass.subjects?.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={addMaterial}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Material hinzufügen
              </button>
            </div>
          </div>

          {/* Materials List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Vorhandene Materialien ({selectedClass.materials?.length || 0})
            </h3>

            {!selectedClass.materials || selectedClass.materials.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Noch keine Materialien vorhanden</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedClass.materials.map(material => (
                  <div key={material.id} className="border-2 border-slate-100 rounded-xl p-4 hover:border-emerald-200 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {material.subject && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                              {material.subject}
                            </span>
                          )}
                          <span className="text-xs text-slate-500">
                            {new Date(material.date).toLocaleDateString('de-DE')}
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-800 mb-1">{material.title}</h4>
                        {material.description && (
                          <p className="text-sm text-slate-600 mb-2">{material.description}</p>
                        )}
                        {material.link && (
                          <a
                            href={material.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                          >
                            <LinkIcon className="w-4 h-4" />
                            Link öffnen
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => deleteMaterial(material.id)}
                        className="ml-4 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Homework Manager - ERWEITERT MIT ABGABEN
function HomeworkManager({ classes, selectedClassId, setSelectedClassId, onUpdateClass }) {
  const [newHomework, setNewHomework] = useState({ title: '', description: '', dueDate: '', subject: '' });
  const [viewingSubmissions, setViewingSubmissions] = useState(null);
  const selectedClass = classes.find(c => c.id === selectedClassId);

  const addHomework = () => {
    if (!selectedClassId) {
      alert('Bitte wählen Sie zuerst eine Klasse aus');
      return;
    }
    if (!newHomework.title || !newHomework.dueDate) {
      alert('Bitte Titel und Fälligkeitsdatum eingeben');
      return;
    }

    const homework = { ...newHomework, id: Date.now().toString(), createdAt: new Date().toISOString(), submissions: [] };
    const homeworkList = [...(selectedClass.homework || []), homework];
    onUpdateClass(selectedClassId, { homework: homeworkList });
    
    setNewHomework({ title: '', description: '', dueDate: '', subject: '' });
    alert('Hausaufgabe erfolgreich hinzugefügt!');
  };

  const deleteHomework = (homeworkId) => {
    if (window.confirm('Hausaufgabe wirklich löschen? Alle Abgaben gehen verloren!')) {
      const homeworkList = selectedClass.homework.filter(h => h.id !== homeworkId);
      onUpdateClass(selectedClassId, { homework: homeworkList });
    }
  };

  const gradeSubmission = (hwId, submissionId, status) => {
    const homework = selectedClass.homework.map(hw => {
      if (hw.id === hwId) {
        return {
          ...hw,
          submissions: hw.submissions.map(sub =>
            sub.id === submissionId ? { ...sub, status, gradedAt: new Date().toISOString() } : sub
          )
        };
      }
      return hw;
    });
    onUpdateClass(selectedClassId, { homework });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Hausaufgaben verwalten</h2>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Klasse auswählen</label>
        <select value={selectedClassId || ''} onChange={(e) => setSelectedClassId(e.target.value)} className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white">
          <option value="">-- Klasse wählen --</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>{cls.name} {cls.year && `(${cls.year})`}</option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Neue Hausaufgabe erstellen</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Titel *</label>
                <input type="text" value={newHomework.title} onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })} placeholder="z.B. Übungsaufgaben Seite 45-47" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Beschreibung</label>
                <textarea value={newHomework.description} onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })} placeholder="Detaillierte Aufgabenbeschreibung" rows={4} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Fälligkeitsdatum *</label>
                  <input type="date" value={newHomework.dueDate} onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Fach</label>
                  <select value={newHomework.subject} onChange={(e) => setNewHomework({ ...newHomework, subject: e.target.value })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white">
                    <option value="">-- Fach wählen --</option>
                    {selectedClass.subjects?.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button onClick={addHomework} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all font-semibold flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Hausaufgabe hinzufügen
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Hausaufgaben ({selectedClass.homework?.length || 0})</h3>

            {!selectedClass.homework || selectedClass.homework.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <Book className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Noch keine Hausaufgaben vorhanden</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedClass.homework.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map(hw => {
                  const dueDate = new Date(hw.dueDate);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const isOverdue = dueDate < today;
                  const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                  const submissionCount = hw.submissions?.length || 0;

                  return (
                    <div key={hw.id} className={`border-2 rounded-xl p-4 transition-all ${isOverdue ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20' : daysUntil <= 3 ? 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20' : 'border-slate-100 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-800'}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {hw.subject && <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">{hw.subject}</span>}
                            <span className={`text-xs font-medium ${isOverdue ? 'text-red-600 dark:text-red-400' : daysUntil <= 3 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>
                              Bis: {dueDate.toLocaleDateString('de-DE')}{!isOverdue && daysUntil >= 0 && ` (${daysUntil} ${daysUntil === 1 ? 'Tag' : 'Tage'})`}{isOverdue && ' (ÜBERFÄLLIG)'}
                            </span>
                            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded text-xs font-medium">{submissionCount} Abgabe{submissionCount !== 1 ? 'n' : ''}</span>
                          </div>
                          <h4 className="font-semibold text-slate-800 dark:text-white mb-1">{hw.title}</h4>
                          {hw.description && <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{hw.description}</p>}
                          
                          {submissionCount > 0 && (
                            <button onClick={() => setViewingSubmissions(viewingSubmissions === hw.id ? null : hw.id)} className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                              {viewingSubmissions === hw.id ? 'Abgaben ausblenden' : 'Abgaben anzeigen'}
                            </button>
                          )}

                          {viewingSubmissions === hw.id && hw.submissions && (
                            <div className="mt-3 space-y-2">
                              {hw.submissions.map(sub => (
                                <div key={sub.id} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <p className="font-semibold text-slate-800 dark:text-white">{sub.studentName}</p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">Abgegeben: {new Date(sub.submittedAt).toLocaleString('de-DE')}</p>
                                      {sub.file && <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">📎 {sub.file.name}{sub.file.type === 'link' && <a href={sub.file.data} target="_blank" rel="noopener noreferrer" className="ml-2 text-indigo-600 dark:text-indigo-400 hover:underline">Link öffnen</a>}</p>}
                                      {sub.comment && <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 italic">"{sub.comment}"</p>}
                                    </div>
                                    <button onClick={() => gradeSubmission(hw.id, sub.id, 'graded')} className={`p-2 rounded-lg transition-colors ${sub.status === 'graded' ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/50'}`} title="Als bewertet markieren">
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <button onClick={() => deleteHomework(hw.id)} className="ml-4 p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Appointments Manager
function AppointmentsManager({ classes, selectedClassId, setSelectedClassId, onUpdateClass }) {
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: ''
  });

  const selectedClass = classes.find(c => c.id === selectedClassId);

  const addAppointment = () => {
    if (!selectedClassId) {
      alert('Bitte wählen Sie zuerst eine Klasse aus');
      return;
    }
    if (!newAppointment.title || !newAppointment.date) {
      alert('Bitte Titel und Datum eingeben');
      return;
    }

    const appointment = {
      ...newAppointment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const appointments = [...(selectedClass.appointments || []), appointment];
    onUpdateClass(selectedClassId, { appointments });
    
    setNewAppointment({ title: '', description: '', date: '', time: '', location: '' });
    alert('Termin erfolgreich hinzugefügt!');
  };

  const deleteAppointment = (appointmentId) => {
    if (window.confirm('Termin wirklich löschen?')) {
      const appointments = selectedClass.appointments.filter(a => a.id !== appointmentId);
      onUpdateClass(selectedClassId, { appointments });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Termine verwalten</h2>

      {/* Class Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Klasse auswählen
        </label>
        <select
          value={selectedClassId || ''}
          onChange={(e) => setSelectedClassId(e.target.value)}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 outline-none"
        >
          <option value="">-- Klasse wählen --</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>
              {cls.name} {cls.year && `(${cls.year})`}
            </option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <>
          {/* Add Appointment Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Neuen Termin erstellen</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Titel *</label>
                <input
                  type="text"
                  value={newAppointment.title}
                  onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                  placeholder="z.B. Klassenarbeit Mathematik, Elternabend"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Beschreibung</label>
                <textarea
                  value={newAppointment.description}
                  onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
                  placeholder="Weitere Informationen zum Termin"
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Datum *</label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Uhrzeit</label>
                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ort</label>
                <input
                  type="text"
                  value={newAppointment.location}
                  onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                  placeholder="z.B. Raum 204, Aula"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
                />
              </div>

              <button
                onClick={addAppointment}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Termin hinzufügen
              </button>
            </div>
          </div>

          {/* Appointments List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Vorhandene Termine ({selectedClass.appointments?.length || 0})
            </h3>

            {!selectedClass.appointments || selectedClass.appointments.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Noch keine Termine vorhanden</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedClass.appointments
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map(apt => {
                    const aptDate = new Date(apt.date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const isPast = aptDate < today;

                    return (
                      <div 
                        key={apt.id} 
                        className={`border-2 rounded-xl p-4 transition-all ${
                          isPast 
                            ? 'border-slate-200 bg-slate-50 opacity-60' 
                            : 'border-slate-100 hover:border-purple-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                isPast 
                                  ? 'bg-slate-100 text-slate-600'
                                  : 'bg-purple-100 text-purple-700'
                              }`}>
                                {aptDate.toLocaleDateString('de-DE', { 
                                  weekday: 'short', 
                                  day: '2-digit', 
                                  month: '2-digit', 
                                  year: 'numeric' 
                                })}
                              </span>
                              {apt.time && (
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {apt.time} Uhr
                                </span>
                              )}
                            </div>
                            <h4 className="font-semibold text-slate-800 mb-1">{apt.title}</h4>
                            {apt.description && (
                              <p className="text-sm text-slate-600 mb-2">{apt.description}</p>
                            )}
                            {apt.location && (
                              <p className="text-xs text-slate-500">📍 {apt.location}</p>
                            )}
                          </div>
                          <button
                            onClick={() => deleteAppointment(apt.id)}
                            className="ml-4 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Student Class View
// ==================== STUDENT VIEW ====================
function ClassViewVollstaendig({ classData, studentName, onLogout, updateClass, darkMode, toggleDarkMode }) {
  const [activeTab, setActiveTab] = useState('announcements');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-emerald-900 dark:to-teal-900 transition-colors">
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 transition-colors">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white" style={{ fontFamily: 'Georgia, serif' }}>
                  Klasse {classData.name}
                </h1>
                {classData.year && <p className="text-slate-500 dark:text-slate-400">Schuljahr {classData.year}</p>}
                <p className="text-sm text-emerald-600 dark:text-emerald-400">Angemeldet als: {studentName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={toggleDarkMode} className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-all">
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>
              <button onClick={onLogout} className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-all text-slate-700 dark:text-white font-medium">
                <LogOut className="w-5 h-5" />
                Abmelden
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {classData.subjects && classData.subjects.length > 0 && (
          <div className="mb-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-colors">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
              <Book className="w-5 h-5" />
              Fächer
            </h3>
            <div className="flex flex-wrap gap-3">
              {classData.subjects.map(subject => (
                <span key={subject} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-8 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm overflow-x-auto">
          {[
            { id: 'announcements', label: 'Ankündigungen', icon: Bell },
            { id: 'materials', label: 'Materialien', icon: FileText },
            { id: 'homework', label: 'Hausaufgaben', icon: Book },
            { id: 'appointments', label: 'Termine', icon: Calendar },
            { id: 'gallery', label: 'Galerie', icon: Image },
            { id: 'timetable', label: 'Stundenplan', icon: Clock },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${activeTab === tab.id ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 transition-colors">
          {activeTab === 'announcements' && <AnnouncementsList announcements={classData.announcements || []} darkMode={darkMode} />}
          {activeTab === 'materials' && <MaterialsList materials={classData.materials || []} />}
          {activeTab === 'homework' && <HomeworkListWithSubmission homework={classData.homework || []} studentName={studentName} updateClass={updateClass} />}
          {activeTab === 'appointments' && <AppointmentsList appointments={classData.appointments || []} />}
          {activeTab === 'gallery' && <GalleryView gallery={classData.gallery || []} />}
          {activeTab === 'timetable' && <TimetableView timetable={classData.timetable || []} />}
        </div>
      </div>
    </div>
  );
}

// Homework mit Abgabe-Funktion (für Schüler)
function HomeworkListWithSubmission({ homework, studentName, updateClass }) {
  const [submitting, setSubmitting] = useState(null);
  const [submissionData, setSubmissionData] = useState({ file: null, comment: '' });

  const submitHomework = (hwId) => {
    if (!submissionData.file) {
      alert('Bitte wähle eine Datei aus!');
      return;
    }

    const submission = {
      id: Date.now().toString(),
      studentName,
      file: submissionData.file,
      comment: submissionData.comment,
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    };

    const updatedHomework = homework.map(hw => {
      if (hw.id === hwId) {
        return { ...hw, submissions: [...(hw.submissions || []), submission] };
      }
      return hw;
    });

    updateClass({ homework: updatedHomework });
    setSubmitting(null);
    setSubmissionData({ file: null, comment: '' });
    alert('Hausaufgabe erfolgreich abgegeben!');
  };

  if (homework.length === 0) {
    return (
      <div className="text-center py-12">
        <Book className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
        <p className="text-xl text-slate-500 dark:text-slate-400">Keine aktuellen Hausaufgaben</p>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Hausaufgaben</h2>
      {homework.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map((hw) => {
        const dueDate = new Date(hw.dueDate);
        const isOverdue = dueDate < today;
        const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        const mySubmission = hw.submissions?.find(s => s.studentName === studentName);

        return (
          <div key={hw.id} className={`border-2 rounded-xl p-5 transition-all ${mySubmission ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20' : isOverdue ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20' : daysUntil <= 3 ? 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20' : 'border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {hw.subject && <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium">{hw.subject}</span>}
                <span className={`text-sm font-medium ${mySubmission ? 'text-emerald-600 dark:text-emerald-400' : isOverdue ? 'text-red-600 dark:text-red-400' : daysUntil <= 3 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>
                  {mySubmission ? '✓ Abgegeben' : `Bis: ${dueDate.toLocaleDateString('de-DE')}${!isOverdue && daysUntil >= 0 ? ` (${daysUntil} ${daysUntil === 1 ? 'Tag' : 'Tage'})` : isOverdue ? ' (ÜBERFÄLLIG)' : ''}`}
                </span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{hw.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap mb-4">{hw.description}</p>

            {mySubmission ? (
              <div className="bg-emerald-100 dark:bg-emerald-900/50 p-4 rounded-lg">
                <p className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Deine Abgabe:</p>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">📎 {mySubmission.file.name}</p>
                {mySubmission.comment && <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1 italic">"{mySubmission.comment}"</p>}
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">Abgegeben: {new Date(mySubmission.submittedAt).toLocaleString('de-DE')}</p>
                {mySubmission.status === 'graded' && <span className="inline-block mt-2 px-3 py-1 bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-medium">✓ Bewertet</span>}
              </div>
            ) : (
              <>
                {submitting === hw.id ? (
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Datei hochladen</label>
                      <FileUploadComponent onFileSelect={(file) => setSubmissionData({ ...submissionData, file })} maxSizeKB={500} />
                      {submissionData.file && <p className="text-sm text-green-600 dark:text-green-400 mt-2">✓ {submissionData.file.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Kommentar (optional)</label>
                      <textarea value={submissionData.comment} onChange={(e) => setSubmissionData({ ...submissionData, comment: e.target.value })} placeholder="Optionaler Kommentar..." rows={3} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-emerald-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => submitHomework(hw.id)} className="flex-1 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors font-semibold flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        Abgeben
                      </button>
                      <button onClick={() => { setSubmitting(null); setSubmissionData({ file: null, comment: '' }); }} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                        Abbrechen
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setSubmitting(hw.id)} className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />
                    Hausaufgabe abgeben
                  </button>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Ankündigungen für Schüler
function AnnouncementsList({ announcements, darkMode }) {
  if (announcements.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
        <p className="text-xl text-slate-500 dark:text-slate-400">Keine Ankündigungen</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Ankündigungen</h2>
      {announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(announcement => {
        const priorityColors = {
          low: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600',
          normal: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
          high: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
          urgent: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
        };

        return (
          <div key={announcement.id} className={`border-2 rounded-xl p-5 transition-colors ${priorityColors[announcement.priority]}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-white/50 dark:bg-black/20 rounded text-xs font-medium">
                {announcement.priority === 'urgent' ? '🔴 DRINGEND' : announcement.priority === 'high' ? '🟠 Wichtig' : announcement.priority === 'normal' ? '🔵 Normal' : '⚪ Info'}
              </span>
              <span className="text-xs opacity-70">{new Date(announcement.createdAt).toLocaleDateString('de-DE')}</span>
            </div>
            <h3 className="font-bold text-lg mb-2">{announcement.title}</h3>
            <p className="whitespace-pre-wrap">{announcement.content}</p>
          </div>
        );
      })}
    </div>
  );
}

// Galerie für Schüler
function GalleryView({ gallery }) {
  if (gallery.length === 0) {
    return (
      <div className="text-center py-12">
        <Image className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
        <p className="text-xl text-slate-500 dark:text-slate-400">Keine Fotos vorhanden</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Foto-Galerie</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map(image => (
          <div key={image.id} className="group">
            <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 mb-2">
              {image.type === 'base64' ? (
                <img src={image.data} alt={image.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <LinkIcon className="w-12 h-12 text-slate-400" />
                </div>
              )}
            </div>
            <p className="font-semibold text-slate-800 dark:text-white text-sm">{image.title}</p>
            {image.description && <p className="text-xs text-slate-500 dark:text-slate-400">{image.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Stundenplan für Schüler
function TimetableView({ timetable }) {
  const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

  if (timetable.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
        <p className="text-xl text-slate-500 dark:text-slate-400">Noch kein Stundenplan</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Stundenplan</h2>
      <div className="space-y-6">
        {days.map(day => {
          const dayEntries = timetable.filter(e => e.day === day).sort((a, b) => a.time.localeCompare(b.time));
          if (dayEntries.length === 0) return null;

          return (
            <div key={day}>
              <h3 className="font-bold text-slate-800 dark:text-white mb-3 text-lg">{day}</h3>
              <div className="space-y-2">
                {dayEntries.map(entry => (
                  <div key={entry.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm font-medium min-w-[80px]">{entry.time}</span>
                    <span className="font-semibold text-slate-800 dark:text-white">{entry.subject}</span>
                    {entry.room && <span className="text-sm text-slate-500 dark:text-slate-400">• {entry.room}</span>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Materials List (Student View)
function MaterialsList({ materials }) {
  if (materials.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p className="text-xl text-slate-500">Noch keine Materialien verfügbar</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Unterrichtsmaterialien</h2>
      {materials.map((material) => (
        <div key={material.id} className="border-2 border-slate-100 rounded-xl p-5 hover:border-emerald-200 hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {material.subject && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                    {material.subject}
                  </span>
                )}
                <span className="text-sm text-slate-500">
                  {new Date(material.date).toLocaleDateString('de-DE')}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{material.title}</h3>
              {material.description && (
                <p className="text-slate-600">{material.description}</p>
              )}
            </div>
            {material.link && (
              <a
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 p-3 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors"
              >
                <LinkIcon className="w-5 h-5 text-emerald-600" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Homework List (Student View)
function HomeworkList({ homework }) {
  if (homework.length === 0) {
    return (
      <div className="text-center py-12">
        <Book className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p className="text-xl text-slate-500">Keine aktuellen Hausaufgaben</p>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Hausaufgaben</h2>
      {homework
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .map((hw) => {
          const dueDate = new Date(hw.dueDate);
          const isOverdue = dueDate < today;
          const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

          return (
            <div 
              key={hw.id} 
              className={`border-2 rounded-xl p-5 transition-all ${
                isOverdue 
                  ? 'border-red-200 bg-red-50' 
                  : daysUntil <= 3
                  ? 'border-amber-200 bg-amber-50'
                  : 'border-slate-100 hover:border-emerald-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {hw.subject && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      {hw.subject}
                    </span>
                  )}
                  <span className={`text-sm font-medium ${
                    isOverdue ? 'text-red-600' : daysUntil <= 3 ? 'text-amber-600' : 'text-slate-500'
                  }`}>
                    Bis: {dueDate.toLocaleDateString('de-DE')}
                    {!isOverdue && daysUntil >= 0 && ` (${daysUntil} ${daysUntil === 1 ? 'Tag' : 'Tage'})`}
                    {isOverdue && ' (ÜBERFÄLLIG)'}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{hw.title}</h3>
              <p className="text-slate-600 whitespace-pre-wrap">{hw.description}</p>
            </div>
          );
        })}
    </div>
  );
}

// Appointments List (Student View)
function AppointmentsList({ appointments }) {
  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p className="text-xl text-slate-500">Keine anstehenden Termine</p>
      </div>
    );
  }

  const sortedAppointments = [...appointments].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Termine & Veranstaltungen</h2>
      {sortedAppointments.map((apt) => {
        const aptDate = new Date(apt.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const isPast = aptDate < today;

        return (
          <div 
            key={apt.id} 
            className={`border-2 rounded-xl p-5 transition-all ${
              isPast 
                ? 'border-slate-200 bg-slate-50 opacity-60' 
                : 'border-slate-100 hover:border-purple-200 hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    isPast 
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {aptDate.toLocaleDateString('de-DE', { 
                      weekday: 'short', 
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric' 
                    })}
                  </span>
                  {apt.time && (
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {apt.time} Uhr
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{apt.title}</h3>
                {apt.description && (
                  <p className="text-slate-600">{apt.description}</p>
                )}
                {apt.location && (
                  <p className="text-sm text-slate-500 mt-2">📍 {apt.location}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ==================== FILE UPLOAD COMPONENT ====================
function FileUploadComponent({ onFileSelect, accept = "*", maxSizeKB = 500 }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeKB = file.size / 1024;

    if (fileSizeKB > maxSizeKB) {
      const useBayernCloud = window.confirm(
        `Datei ist ${Math.round(fileSizeKB)} KB groß (Limit: ${maxSizeKB} KB).\n\n` +
        `Möchten Sie die Datei zu BayernCloud hochladen und den Link hier einfügen?\n\n` +
        `Klicken Sie "OK" für BayernCloud-Link oder "Abbrechen" zum erneuten Versuch.`
      );

      if (useBayernCloud) {
        const link = prompt('Bitte geben Sie den BayernCloud-Link ein:');
        if (link) {
          onFileSelect({ type: 'link', data: link, name: file.name });
        }
      }
      e.target.value = '';
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      onFileSelect({
        type: 'base64',
        data: event.target.result,
        name: file.name,
        mimeType: file.type
      });
      setUploading(false);
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
        disabled={uploading}
      />
      <label
        htmlFor="file-upload"
        className={`flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer ${
          uploading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {uploading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Lädt...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Datei wählen
          </>
        )}
      </label>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Max. {maxSizeKB} KB (größere Dateien → BayernCloud)
      </p>
    </div>
  );
}

// ==================== DASHBOARD ====================
function Dashboard({ classes, darkMode }) {
  const totalHomework = classes.reduce((sum, cls) => sum + (cls.homework?.length || 0), 0);
  const totalMaterials = classes.reduce((sum, cls) => sum + (cls.materials?.length || 0), 0);
  const totalAnnouncements = classes.reduce((sum, cls) => sum + (cls.announcements?.length || 0), 0);

  const upcomingAppointments = classes
    .flatMap(cls => (cls.appointments || []).map(apt => ({ ...apt, className: cls.name })))
    .filter(apt => new Date(apt.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const recentSubmissions = classes
    .flatMap(cls => (cls.homework || []).flatMap(hw => 
      (hw.submissions || []).map(sub => ({ ...sub, hwTitle: hw.title, className: cls.name }))
    ))
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Klassen</p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{classes.length}</p>
            </div>
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
              <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Hausaufgaben</p>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{totalHomework}</p>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-xl">
              <Book className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Materialien</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalMaterials}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
              <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Ankündigungen</p>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{totalAnnouncements}</p>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-xl">
              <Bell className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-colors">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Kommende Termine
          </h3>
          {upcomingAppointments.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 text-center py-8">Keine kommenden Termine</p>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((apt, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">{apt.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{apt.className}</p>
                  </div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    {new Date(apt.date).toLocaleDateString('de-DE')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 transition-colors">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Neue Abgaben
          </h3>
          {recentSubmissions.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 text-center py-8">Keine neuen Abgaben</p>
          ) : (
            <div className="space-y-3">
              {recentSubmissions.map((sub, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">{sub.studentName}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{sub.hwTitle}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    sub.status === 'graded' 
                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                      : 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                  }`}>
                    {sub.status === 'graded' ? 'Bewertet' : 'Neu'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== ANNOUNCEMENTS MANAGER ====================
function AnnouncementsManager({ classes, selectedClassId, setSelectedClassId, onUpdateClass, darkMode }) {
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', priority: 'normal' });
  const selectedClass = classes.find(c => c.id === selectedClassId);

  const addAnnouncement = () => {
    if (!selectedClassId) {
      alert('Bitte wählen Sie zuerst eine Klasse aus');
      return;
    }
    if (!newAnnouncement.title || !newAnnouncement.content) {
      alert('Bitte Titel und Inhalt eingeben');
      return;
    }

    const announcement = { ...newAnnouncement, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const announcements = [...(selectedClass.announcements || []), announcement];
    onUpdateClass(selectedClassId, { announcements });
    
    setNewAnnouncement({ title: '', content: '', priority: 'normal' });
    alert('Ankündigung erfolgreich erstellt!');
  };

  const deleteAnnouncement = (announcementId) => {
    if (window.confirm('Ankündigung wirklich löschen?')) {
      const announcements = selectedClass.announcements.filter(a => a.id !== announcementId);
      onUpdateClass(selectedClassId, { announcements });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Ankündigungen verwalten</h2>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6 transition-colors">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Klasse auswählen</label>
        <select value={selectedClassId || ''} onChange={(e) => setSelectedClassId(e.target.value)} className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-colors">
          <option value="">-- Klasse wählen --</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>{cls.name} {cls.year && `(${cls.year})`}</option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6 transition-colors">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Neue Ankündigung erstellen</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Titel *</label>
                <input type="text" value={newAnnouncement.title} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })} placeholder="z.B. Wichtig: Stundenplanänderung" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Inhalt *</label>
                <textarea value={newAnnouncement.content} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })} placeholder="Detaillierte Ankündigung..." rows={4} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Priorität</label>
                <select value={newAnnouncement.priority} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-colors">
                  <option value="low">Niedrig</option>
                  <option value="normal">Normal</option>
                  <option value="high">Hoch</option>
                  <option value="urgent">Dringend</option>
                </select>
              </div>

              <button onClick={addAnnouncement} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all font-semibold flex items-center justify-center gap-2">
                <Bell className="w-5 h-5" />
                Ankündigung veröffentlichen
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-colors">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Ankündigungen ({selectedClass.announcements?.length || 0})</h3>

            {!selectedClass.announcements || selectedClass.announcements.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Noch keine Ankündigungen</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedClass.announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(announcement => {
                  const priorityColors = {
                    low: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600',
                    normal: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
                    high: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
                    urgent: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                  };

                  return (
                    <div key={announcement.id} className={`border-2 rounded-xl p-4 transition-colors ${priorityColors[announcement.priority]}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-white/50 dark:bg-black/20 rounded text-xs font-medium">
                              {announcement.priority === 'urgent' ? '🔴 DRINGEND' : announcement.priority === 'high' ? '🟠 Wichtig' : announcement.priority === 'normal' ? '🔵 Normal' : '⚪ Info'}
                            </span>
                            <span className="text-xs opacity-70">{new Date(announcement.createdAt).toLocaleDateString('de-DE')}</span>
                          </div>
                          <h4 className="font-bold text-lg mb-2">{announcement.title}</h4>
                          <p className="whitespace-pre-wrap">{announcement.content}</p>
                        </div>
                        <button onClick={() => deleteAnnouncement(announcement.id)} className="ml-4 p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ==================== GALLERY MANAGER ====================
function GalleryManager({ classes, selectedClassId, setSelectedClassId, onUpdateClass, darkMode }) {
  const [newImage, setNewImage] = useState({ title: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const selectedClass = classes.find(c => c.id === selectedClassId);

  const addImage = () => {
    if (!selectedClassId) {
      alert('Bitte wählen Sie zuerst eine Klasse aus');
      return;
    }
    if (!newImage.title || !imageFile) {
      alert('Bitte Titel und Bild eingeben');
      return;
    }

    const image = { ...newImage, ...imageFile, id: Date.now().toString(), uploadedAt: new Date().toISOString() };
    const gallery = [...(selectedClass.gallery || []), image];
    onUpdateClass(selectedClassId, { gallery });
    
    setNewImage({ title: '', description: '' });
    setImageFile(null);
    alert('Foto erfolgreich hochgeladen!');
  };

  const deleteImage = (imageId) => {
    if (window.confirm('Foto wirklich löschen?')) {
      const gallery = selectedClass.gallery.filter(img => img.id !== imageId);
      onUpdateClass(selectedClassId, { gallery });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Foto-Galerie verwalten</h2>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6 transition-colors">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Klasse auswählen</label>
        <select value={selectedClassId || ''} onChange={(e) => setSelectedClassId(e.target.value)} className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-colors">
          <option value="">-- Klasse wählen --</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>{cls.name} {cls.year && `(${cls.year})`}</option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6 transition-colors">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Neues Foto hochladen</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Titel *</label>
                <input type="text" value={newImage.title} onChange={(e) => setNewImage({ ...newImage, title: e.target.value })} placeholder="z.B. Klassenausflug 2024" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Beschreibung</label>
                <textarea value={newImage.description} onChange={(e) => setNewImage({ ...newImage, description: e.target.value })} placeholder="Optionale Beschreibung..." rows={2} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Foto *</label>
                <FileUploadComponent onFileSelect={setImageFile} accept="image/*" maxSizeKB={500} />
                {imageFile && <p className="text-sm text-green-600 dark:text-green-400 mt-2">✓ {imageFile.name}</p>}
              </div>

              <button onClick={addImage} className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all font-semibold flex items-center justify-center gap-2">
                <Image className="w-5 h-5" />
                Foto hochladen
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-colors">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Galerie ({selectedClass.gallery?.length || 0} Fotos)</h3>

            {!selectedClass.gallery || selectedClass.gallery.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <Image className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Noch keine Fotos hochgeladen</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedClass.gallery.map(image => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                      {image.type === 'base64' ? (
                        <img src={image.data} alt={image.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <LinkIcon className="w-12 h-12 text-slate-400" />
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center p-2">
                      <p className="text-white font-semibold text-sm text-center mb-2">{image.title}</p>
                      <button onClick={() => deleteImage(image.id)} className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
// ==================== TIMETABLE MANAGER ====================
function TimetableManager({ classes, selectedClassId, setSelectedClassId, onUpdateClass, darkMode }) {
  const [newEntry, setNewEntry] = useState({ day: 'Montag', time: '', subject: '', room: '' });
  const selectedClass = classes.find(c => c.id === selectedClassId);
  const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

  const addEntry = () => {
    if (!selectedClassId) {
      alert('Bitte wählen Sie zuerst eine Klasse aus');
      return;
    }
    if (!newEntry.time || !newEntry.subject) {
      alert('Bitte Zeit und Fach eingeben');
      return;
    }

    const entry = { ...newEntry, id: Date.now().toString() };
    const timetable = [...(selectedClass.timetable || []), entry];
    onUpdateClass(selectedClassId, { timetable });
    
    setNewEntry({ day: 'Montag', time: '', subject: '', room: '' });
    alert('Eintrag erfolgreich hinzugefügt!');
  };

  const deleteEntry = (entryId) => {
    if (window.confirm('Eintrag wirklich löschen?')) {
      const timetable = selectedClass.timetable.filter(e => e.id !== entryId);
      onUpdateClass(selectedClassId, { timetable });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Stundenplan verwalten</h2>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6 transition-colors">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Klasse auswählen</label>
        <select value={selectedClassId || ''} onChange={(e) => setSelectedClassId(e.target.value)} className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-colors">
          <option value="">-- Klasse wählen --</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>{cls.name} {cls.year && `(${cls.year})`}</option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6 transition-colors">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Neuen Eintrag hinzufügen</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tag</label>
                <select value={newEntry.day} onChange={(e) => setNewEntry({ ...newEntry, day: e.target.value })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-colors">
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Uhrzeit *</label>
                <input type="time" value={newEntry.time} onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Fach *</label>
                <select value={newEntry.subject} onChange={(e) => setNewEntry({ ...newEntry, subject: e.target.value })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-colors">
                  <option value="">-- Fach wählen --</option>
                  {selectedClass.subjects?.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Raum</label>
                <input type="text" value={newEntry.room} onChange={(e) => setNewEntry({ ...newEntry, room: e.target.value })} placeholder="z.B. Raum 204" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-colors" />
              </div>
            </div>

            <button onClick={addEntry} className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all font-semibold flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Eintrag hinzufügen
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-colors">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Stundenplan ({selectedClass.timetable?.length || 0} Einträge)</h3>

            {!selectedClass.timetable || selectedClass.timetable.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Noch keine Einträge</p>
              </div>
            ) : (
              <div className="space-y-6">
                {days.map(day => {
                  const dayEntries = selectedClass.timetable.filter(e => e.day === day).sort((a, b) => a.time.localeCompare(b.time));
                  if (dayEntries.length === 0) return null;

                  return (
                    <div key={day}>
                      <h4 className="font-bold text-slate-800 dark:text-white mb-2">{day}</h4>
                      <div className="space-y-2">
                        {dayEntries.map(entry => (
                          <div key={entry.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm font-medium">{entry.time}</span>
                              <span className="font-semibold text-slate-800 dark:text-white">{entry.subject}</span>
                              {entry.room && <span className="text-sm text-slate-500 dark:text-slate-400">• {entry.room}</span>}
                            </div>
                            <button onClick={() => deleteEntry(entry.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}


export default function LehrerHomepageVollstaendig() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [classPassword, setClassPassword] = useState('');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) setDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  // Admin-Passwort (WICHTIG: In Produktion ändern!)
  const ADMIN_PASSWORD = 'Lehrer2024!';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const stored = localStorage.getItem('teacher_classes_v3_simple');
      if (stored) {
        setClasses(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Keine gespeicherten Klassen gefunden');
    }
    setLoading(false);
  };

  const saveClasses = (updatedClasses) => {
    try {
      localStorage.setItem('teacher_classes_v3_simple', JSON.stringify(updatedClasses));
      setClasses(updatedClasses);
    } catch (error) {
      alert('Fehler beim Speichern der Daten');
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setAdminPassword('');
    } else {
      alert('Falsches Admin-Passwort!');
    }
  };

  const handleClassLogin = (classItem) => {
    if (classPassword === classItem.password) {
      setSelectedClass(classItem);
      setClassPassword('');
    } else {
      alert('Falsches Klassen-Passwort!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-2xl text-slate-600 animate-pulse">Lädt...</div>
      </div>
    );
  }

  if (!isAdmin && !selectedClass) {
    return <LoginScreen 
      onAdminLogin={handleAdminLogin}
      onClassLogin={handleClassLogin}
      classes={classes}
      adminPassword={adminPassword}
      setAdminPassword={setAdminPassword}
      classPassword={classPassword}
      setClassPassword={setClassPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
    />;
  }

  if (isAdmin) {
    return <AdminPanelVollstaendig 
      classes={classes}
      saveClasses={saveClasses}
      onLogout={() => setIsAdmin(false)}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
    />;
  }

  return <ClassViewVollstaendig 
    classData={selectedClass}
    studentName={studentName}
    onLogout={() => {
      setSelectedClass(null);
      setStudentName('');
    }}
    updateClass={(updates) => {
      const updatedClasses = classes.map(c => 
        c.id === selectedClass.id ? { ...c, ...updates } : c
      );
      saveClasses(updatedClasses);
      setSelectedClass({ ...selectedClass, ...updates });
    }}
    darkMode={darkMode}
    toggleDarkMode={toggleDarkMode}
  />;
}

// Login-Bildschirm
fu
