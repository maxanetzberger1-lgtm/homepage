import React, { useState, useEffect } from 'react';
import { Calendar, Upload, Book, Users, Lock, Plus, X, Download, Eye, EyeOff, Trash2, Edit2, Check, AlertCircle, LogOut, FileText, Link as LinkIcon, Save, Clock, Sun, Moon, Image, Bell, Grid, BarChart3, User, CheckCircle, XCircle, Loader, Send } from 'lucide-react';

// ==================== TOAST NOTIFICATIONS ====================
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500'
  };

  return (
    <div className={`fixed top-4 right-4 ${colors[type]} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in z-50`}>
      <span>{message}</span>
      <button onClick={onClose} className="hover:bg-white/20 rounded p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Toast Hook
function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const ToastContainer = () => (
    toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
  );

  return { showToast, ToastContainer };
}

// ==================== HOMEWORK STATUS HELPER ====================
function getHomeworkStatus(dueDate) {
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntil = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  if (daysUntil < 0) {
    return { status: 'overdue', color: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800', textColor: 'text-red-600 dark:text-red-400', label: 'ÜBERFÄLLIG' };
  }
  if (daysUntil <= 3) {
    return { status: 'urgent', color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800', textColor: 'text-amber-600 dark:text-amber-400', label: `${daysUntil} Tag${daysUntil !== 1 ? 'e' : ''}` };
  }
  return { status: 'normal', color: 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600', textColor: 'text-slate-600 dark:text-slate-400', label: `${daysUntil} Tage` };
}

// ==================== SUBMISSION PROGRESS ====================
function SubmissionProgress({ totalStudents = 20, submissions = [] }) {
  const submittedCount = submissions.length;
  const percentage = totalStudents > 0 ? Math.round((submittedCount / totalStudents) * 100) : 0;

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-slate-600 dark:text-slate-300 font-medium">Abgaben</span>
        <span className="text-slate-600 dark:text-slate-300">{submittedCount}/{totalStudents} ({percentage}%)</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 overflow-hidden">
        <div className={`h-full transition-all duration-500 ${percentage >= 100 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}


// Hauptkomponente


// Login-Bildschirm


// ==================== HELPER FUNCTIONS ====================
const downloadFile = (file, filename) => {
  if (file.type === 'base64') {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = filename || file.name || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (file.type === 'link') {
    window.open(file.data, '_blank');
  }
};

// ==================== FILE UPLOAD ====================
function FileUploadComponent({ onFileSelect, accept = "*", maxSizeKB = 500 }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileSizeKB = file.size / 1024;

    if (fileSizeKB > maxSizeKB) {
      const useBayernCloud = window.confirm(`Datei ist ${Math.round(fileSizeKB)} KB groß (Limit: ${maxSizeKB} KB).\n\nMöchten Sie die Datei zu BayernCloud hochladen und den Link hier einfügen?`);
      if (useBayernCloud) {
        const link = prompt('Bitte geben Sie den BayernCloud-Link ein:');
        if (link) onFileSelect({ type: 'link', data: link, name: file.name });
      }
      e.target.value = '';
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      onFileSelect({ type: 'base64', data: event.target.result, name: file.name, mimeType: file.type });
      setUploading(false);
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative">
      <input type="file" accept={accept} onChange={handleFileChange} className="hidden" id="file-upload" disabled={uploading} />
      <label htmlFor="file-upload" className={`flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
        {uploading ? <><Loader className="w-5 h-5 animate-spin" />Lädt...</> : <><Upload className="w-5 h-5" />Datei wählen</>}
      </label>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Max. {maxSizeKB} KB</p>
    </div>
  );
}

// ==================== DASHBOARD ====================
function Dashboard({ classes }) {
  const totalHomework = classes.reduce((sum, cls) => sum + (cls.homework?.length || 0), 0);
  const totalMaterials = classes.reduce((sum, cls) => sum + (cls.materials?.length || 0), 0);
  
  const recentSubmissions = classes
    .flatMap(cls => (cls.homework || []).flatMap(hw => (hw.submissions || []).map(sub => ({ ...sub, hwTitle: hw.title, className: cls.name }))))
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
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
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
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
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
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
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
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
                  <p className="text-sm text-slate-500 dark:text-slate-400">{sub.hwTitle} • {sub.className}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${sub.status === 'graded' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {sub.status === 'graded' ? 'Bewertet' : 'Neu'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


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
function AdminPanelVollstaendig({ classes, saveClasses, onLogout, darkMode, toggleDarkMode }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [newClass, setNewClass] = useState({ name: '', year: '', password: '', subjects: [], gallery: [], customTabs: [] });

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
        <div className="flex gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm overflow-x-auto">
          <button
            onClick={() => { setActiveTab('dashboard'); setSelectedClassId(null); }}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Grid className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={() => { setActiveTab('overview'); setSelectedClassId(null); }}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Übersicht
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'create'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Neue Klasse
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'materials'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Materialien
          </button>
          <button
            onClick={() => setActiveTab('homework')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'homework'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Hausaufgaben
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'appointments'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Termine
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Image className="w-4 h-4" />
            Galerie
          </button>
          <button
            onClick={() => setActiveTab('customtabs')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'customtabs'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Edit2 className="w-4 h-4" />
            Eigene Tabs
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <ClassOverview 
            classes={classes}
            onDeleteClass={deleteClass}
            onUpdateClass={updateClass}
          />
        )}

        {activeTab === 'create' && (
          <CreateClassForm 
            newClass={newClass}
            setNewClass={setNewClass}
            onCreate={createClass}
          />
        )}

        {activeTab === 'materials' && (
          <MaterialsManager 
            classes={classes}
            selectedClassId={selectedClassId}
            setSelectedClassId={setSelectedClassId}
            onUpdateClass={updateClass}
          />
        )}

        {activeTab === 'homework' && (
          <HomeworkManager 
            classes={classes}
            selectedClassId={selectedClassId}
            setSelectedClassId={setSelectedClassId}
            onUpdateClass={updateClass}
          />
        )}

        {activeTab === 'appointments' && (
          <AppointmentsManager 
            classes={classes}
            selectedClassId={selectedClassId}
            setSelectedClassId={setSelectedClassId}
            onUpdateClass={updateClass}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard classes={classes} />
        )}

        {activeTab === 'gallery' && (
          <GalleryManager 
            classes={classes}
            selectedClassId={selectedClassId}
            setSelectedClassId={setSelectedClassId}
            onUpdateClass={updateClass}
          />
        )}

        {activeTab === 'customtabs' && (
          <CustomTabManager 
            classes={classes}
            selectedClassId={selectedClassId}
            setSelectedClassId={setSelectedClassId}
            onUpdateClass={updateClass}
          />
        )}
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
  const [currentPath, setCurrentPath] = useState([]);
  const [newFolder, setNewFolder] = useState('');
  const [newMaterial, setNewMaterial] = useState({ title: '', description: '', subject: '' });
  const [materialFile, setMaterialFile] = useState(null);
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const selectedClass = classes.find(c => c.id === selectedClassId);

  // Helper: Navigate in folder structure
  const getCurrentFolder = () => {
    if (!selectedClass) return null;
    let folder = { children: selectedClass.materials || [] };
    for (let name of currentPath) {
      folder = folder.children.find(item => item.name === name && item.type === 'folder');
      if (!folder) return null;
    }
    return folder;
  };

  // Helper: Update materials with new structure
  const updateMaterials = (newMaterials) => {
    onUpdateClass(selectedClassId, { materials: newMaterials });
  };

  // Add folder
  const addFolder = () => {
    if (!selectedClassId || !newFolder.trim()) {
      alert('Bitte Ordnername eingeben');
      return;
    }

    const folder = { id: Date.now().toString(), name: newFolder, type: 'folder', children: [] };
    const materials = [...(selectedClass.materials || [])];
    
    if (currentPath.length === 0) {
      materials.push(folder);
    } else {
      // Add to subfolder
      let target = { children: materials };
      for (let name of currentPath) {
        target = target.children.find(item => item.name === name && item.type === 'folder');
      }
      target.children.push(folder);
    }

    updateMaterials(materials);
    setNewFolder('');
    setShowFolderInput(false);
  };

  // Add file
  const addFile = () => {
    if (!selectedClassId || !newMaterial.title || !materialFile) {
      alert('Bitte Titel und Datei eingeben');
      return;
    }

    const file = { id: Date.now().toString(), name: newMaterial.title, type: 'file', file: materialFile, description: newMaterial.description, subject: newMaterial.subject, date: new Date().toISOString() };
    const materials = [...(selectedClass.materials || [])];
    
    if (currentPath.length === 0) {
      materials.push(file);
    } else {
      let target = { children: materials };
      for (let name of currentPath) {
        target = target.children.find(item => item.name === name && item.type === 'folder');
      }
      target.children.push(file);
    }

    updateMaterials(materials);
    setNewMaterial({ title: '', description: '', subject: '' });
    setMaterialFile(null);
  };

  // Delete item
  const deleteItem = (itemId) => {
    if (!window.confirm('Wirklich löschen?')) return;

    const materials = [...(selectedClass.materials || [])];
    
    if (currentPath.length === 0) {
      const filtered = materials.filter(item => item.id !== itemId);
      updateMaterials(filtered);
    } else {
      let target = { children: materials };
      for (let name of currentPath) {
        target = target.children.find(item => item.name === name && item.type === 'folder');
      }
      target.children = target.children.filter(item => item.id !== itemId);
      updateMaterials(materials);
    }
  };

  const currentFolder = getCurrentFolder();

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Materialien verwalten</h2>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Klasse auswählen</label>
        <select value={selectedClassId || ''} onChange={(e) => { setSelectedClassId(e.target.value); setCurrentPath([]); }} className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white">
          <option value="">-- Klasse wählen --</option>
          {classes.map(cls => <option key={cls.id} value={cls.id}>{cls.name} {cls.year && `(${cls.year})`}</option>)}
        </select>
      </div>

      {selectedClass && (
        <>
          {/* Breadcrumbs */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 mb-6">
            <div className="flex items-center gap-2 flex-wrap transition-all">
              <button onClick={() => setCurrentPath([])} className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">📁 Root</button>
              {currentPath.map((folder, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-slate-400">/</span>
                  <button onClick={() => setCurrentPath(currentPath.slice(0, idx + 1))} className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">{folder}</button>
                </div>
              ))}
            </div>
          </div>

          {/* Search + Sort */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Suche nach Datei oder Ordner..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
              >
                <option value="name">Nach Name (A-Z)</option>
                <option value="date">Nach Datum (Neueste)</option>
                <option value="type">Nach Typ (Ordner zuerst)</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Create Folder */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">📁 Ordner erstellen</h3>
              {showFolderInput ? (
                <div className="space-y-3">
                  <input type="text" value={newFolder} onChange={(e) => setNewFolder(e.target.value)} placeholder="Ordnername (z.B. Mathe, Arbeitsblätter)" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                  <div className="flex gap-2">
                    <button onClick={addFolder} className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Erstellen</button>
                    <button onClick={() => { setShowFolderInput(false); setNewFolder(''); }} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg">Abbrechen</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setShowFolderInput(true)} className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-semibold flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Neuer Ordner
                </button>
              )}
            </div>

            {/* Upload File */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">📄 Datei hochladen</h3>
              <div className="space-y-3">
                <input type="text" value={newMaterial.title} onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })} placeholder="Titel *" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                <FileUploadComponent onFileSelect={setMaterialFile} maxSizeKB={500} />
                {materialFile && <p className="text-sm text-green-600 dark:text-green-400">✓ {materialFile.name}</p>}
                <button onClick={addFile} className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 font-semibold flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5" />
                  Hochladen
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              Inhalt ({currentFolder?.children?.length || 0} Einträge)
            </h3>

            {(() => {
              let items = currentFolder?.children || [];
              
              // Search filter
              if (searchTerm) {
                items = items.filter(item => 
                  item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
              }
              
              // Sort
              items = [...items].sort((a, b) => {
                if (sortBy === 'name') return a.name.localeCompare(b.name);
                if (sortBy === 'date') return (b.uploadedAt || b.date || 0) > (a.uploadedAt || a.date || 0) ? 1 : -1;
                if (sortBy === 'type') {
                  if (a.type === 'folder' && b.type !== 'folder') return -1;
                  if (a.type !== 'folder' && b.type === 'folder') return 1;
                  return a.name.localeCompare(b.name);
                }
                return 0;
              });
              
              return items;
            })().length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Ordner ist leer</p>
              </div>
            ) : (
              <div className="space-y-2">
                {(() => {
                  let items = currentFolder?.children || [];
                  if (searchTerm) items = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
                  items = [...items].sort((a, b) => {
                    if (sortBy === 'name') return a.name.localeCompare(b.name);
                    if (sortBy === 'date') return (b.uploadedAt || b.date || 0) > (a.uploadedAt || a.date || 0) ? 1 : -1;
                    if (sortBy === 'type') {
                      if (a.type === 'folder' && b.type !== 'folder') return -1;
                      if (a.type !== 'folder' && b.type === 'folder') return 1;
                      return a.name.localeCompare(b.name);
                    }
                    return 0;
                  });
                  return items;
                })().map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      {item.type === 'folder' ? (
                        <>
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                          </div>
                          <button onClick={() => setCurrentPath([...currentPath, item.name])} className="text-left flex-1">
                            <p className="font-semibold text-slate-800 dark:text-white">📁 {item.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{item.children?.length || 0} Einträge</p>
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                            <Download className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800 dark:text-white">{item.name}</p>
                            {item.description && <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>}
                            {item.file && (
                              <button onClick={() => downloadFile(item.file, item.name)} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-1 flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                {item.file.name}
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    <button onClick={() => deleteItem(item.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
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


function HomeworkManager({ classes, selectedClassId, setSelectedClassId, onUpdateClass }) {
  const [newHomework, setNewHomework] = useState({ title: '', description: '', dueDate: '', subject: '' });
  const [viewingSubmissions, setViewingSubmissions] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const selectedClass = classes.find(c => c.id === selectedClassId);

  const addHomework = () => {
    if (!selectedClassId || !newHomework.title || !newHomework.dueDate) {
      alert('Bitte alle Pflichtfelder ausfüllen');
      return;
    }
    const homework = { ...newHomework, id: Date.now().toString(), createdAt: new Date().toISOString(), submissions: [] };
    const homeworkList = [...(selectedClass.homework || []), homework];
    onUpdateClass(selectedClassId, { homework: homeworkList });
    setNewHomework({ title: '', description: '', dueDate: '', subject: '' });
    alert('Hausaufgabe hinzugefügt!');
  };

  const deleteHomework = (homeworkId) => {
    if (window.confirm('Hausaufgabe löschen? Alle Abgaben gehen verloren!')) {
      const homeworkList = selectedClass.homework.filter(h => h.id !== homeworkId);
      onUpdateClass(selectedClassId, { homework: homeworkList });
    }
  };

  const gradeSubmission = (hwId, submissionId) => {
    const homework = selectedClass.homework.map(hw => {
      if (hw.id === hwId) {
        return { ...hw, submissions: hw.submissions.map(sub => sub.id === submissionId ? { ...sub, status: 'graded', gradedAt: new Date().toISOString() } : sub) };
      }
      return hw;
    });
    onUpdateClass(selectedClassId, { homework });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Hausaufgaben verwalten</h2>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Klasse</label>
        <select value={selectedClassId || ''} onChange={(e) => setSelectedClassId(e.target.value)} className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white">
          <option value="">-- Klasse wählen --</option>
          {classes.map(cls => <option key={cls.id} value={cls.id}>{cls.name} {cls.year && `(${cls.year})`}</option>)}
        </select>
      </div>

      {selectedClass && (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Neue Hausaufgabe</h3>
            <div className="space-y-4">
              <input type="text" value={newHomework.title} onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })} placeholder="Titel *" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
              <textarea value={newHomework.description} onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })} placeholder="Beschreibung" rows={4} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
              <div className="grid md:grid-cols-2 gap-4">
                <input type="date" value={newHomework.dueDate} onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })} className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                <select value={newHomework.subject} onChange={(e) => setNewHomework({ ...newHomework, subject: e.target.value })} className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white">
                  <option value="">-- Fach --</option>
                  {selectedClass.subjects?.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                </select>
              </div>
              <button onClick={addHomework} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 font-semibold flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />Hausaufgabe hinzufügen
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Hausaufgaben ({selectedClass.homework?.length || 0})</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-3 mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Suche Hausaufgabe..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white text-sm"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white text-sm"
              >
                <option value="all">Alle</option>
                <option value="overdue">Überfällig</option>
                <option value="urgent">Dringend</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            {!selectedClass.homework || selectedClass.homework.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <Book className="w-12 h-12 mx-auto mb-3 opacity-50" /><p>Noch keine Hausaufgaben</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedClass.homework.filter(hw => {
                  // Search filter
                  if (searchTerm && !hw.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
                      !hw.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return false;
                  }
                  // Status filter
                  if (filterStatus !== 'all') {
                    const status = getHomeworkStatus(hw.dueDate).status;
                    if (filterStatus !== status) return false;
                  }
                  return true;
                }).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map(hw => {
                  const status = getHomeworkStatus(hw.dueDate);
                  const submissionCount = hw.submissions?.length || 0;

                  return (
                    <div key={hw.id} className={`border-2 rounded-xl p-transition-all duration-200 hover:shadow-lg 4 ${status.color}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {hw.subject && <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">{hw.subject}</span>}
                            <span className={`text-xs font-medium ${status.textColor}`}>Bis: {new Date(hw.dueDate).toLocaleDateString('de-DE')} • {status.label}</span>
                            {submissionCount > 0 && <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded text-xs font-medium">{submissionCount} Abgabe{submissionCount !== 1 ? 'n' : ''}</span>}
                          </div>
                          <h4 className="font-semibold text-slate-800 dark:text-white mb-1">{hw.title}</h4>
                          {hw.description && <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{hw.description}</p>}
                          
                          <SubmissionProgress totalStudents={20} submissions={hw.submissions || []} />
                          
                          {submissionCount > 0 && (
                            <button onClick={() => setViewingSubmissions(viewingSubmissions === hw.id ? null : hw.id)} className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                              {viewingSubmissions === hw.id ? 'Abgaben ausblenden' : 'Abgaben anzeigen'}
                            </button>
                          )}

                          {viewingSubmissions === hw.id && hw.submissions && (
                            <div className="mt-3 space-y-2">
                              {hw.submissions.map(sub => (
                                <div key={sub.id} className="bg-white dark:bg-slate-700 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <p className="font-semibold text-slate-800 dark:text-white">{sub.studentName}</p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">Abgegeben: {new Date(sub.submittedAt).toLocaleString('de-DE')}</p>
                                      {sub.file && (
                                        <button 
                                          onClick={() => downloadFile(sub.file, `${sub.studentName}_${hw.title}`)} 
                                          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-1 flex items-center gap-1"
                                        >
                                          <Download className="w-3 h-3" />
                                          {sub.file.name}
                                        </button>
                                      )}
                                      {sub.comment && <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 italic">"{sub.comment}"</p>}
                                    </div>
                                    <button onClick={() => gradeSubmission(hw.id, sub.id)} className={`p-2 rounded-lg ${sub.status === 'graded' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50'}`} title="Als bewertet markieren">
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <button onClick={() => deleteHomework(hw.id)} className="ml-4 p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg">
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
function GalleryManager({ classes, selectedClassId, setSelectedClassId, onUpdateClass }) {
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
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Foto-Galerie</h2>

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
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Neues Foto</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Titel *</label>
                <input type="text" value={newImage.title} onChange={(e) => setNewImage({ ...newImage, title: e.target.value })} placeholder="z.B. Klassenausflug 2024" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Beschreibung</label>
                <textarea value={newImage.description} onChange={(e) => setNewImage({ ...newImage, description: e.target.value })} placeholder="Optionale Beschreibung..." rows={2} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Foto *</label>
                <FileUploadComponent onFileSelect={setImageFile} accept="image/*" maxSizeKB={500} />
                {imageFile && <p className="text-sm text-green-600 dark:text-green-400 mt-2">✓ {imageFile.name}</p>}
              </div>

              <button onClick={addImage} className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl hover:from-pink-600 hover:to-rose-600 font-semibold flex items-center justify-center gap-2">
                <Image className="w-5 h-5" />
                Foto hochladen
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Galerie ({selectedClass.gallery?.length || 0} Fotos)</h3>

            {!selectedClass.gallery || selectedClass.gallery.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <Image className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Noch keine Fotos</p>
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
                      <button onClick={() => deleteImage(image.id)} className="p-2 bg-red-500 hover:bg-red-600 rounded-lg">
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

// ==================== GALLERY VIEW (STUDENT) ====================
function GalleryView({ gallery }) {
  if (!gallery || gallery.length === 0) {
    return (
      <div className="text-center py-12">
        <Image className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
        <p className="text-xl text-slate-500 dark:text-slate-400">Keine Fotos</p>
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


// ==================== CUSTOM TAB MANAGER ====================
function CustomTabManager({ classes, selectedClassId, setSelectedClassId, onUpdateClass }) {
  const [editingTab, setEditingTab] = useState(null);
  const [newTabName, setNewTabName] = useState('');
  const [showNewTab, setShowNewTab] = useState(false);
  const [newElement, setNewElement] = useState({ type: 'text', content: '' });
  const [editingElement, setEditingElement] = useState(null);

  const selectedClass = classes.find(c => c.id === selectedClassId);
  const customTabs = selectedClass?.customTabs || [];

  // Create new tab
  const createTab = () => {
    if (!newTabName.trim()) {
      alert('Bitte Tab-Namen eingeben');
      return;
    }
    const tab = { id: Date.now().toString(), name: newTabName, elements: [] };
    const tabs = [...customTabs, tab];
    onUpdateClass(selectedClassId, { customTabs: tabs });
    setNewTabName('');
    setShowNewTab(false);
    setEditingTab(tab.id);
  };

  // Delete tab
  const deleteTab = (tabId) => {
    if (!window.confirm('Tab wirklich löschen?')) return;
    const tabs = customTabs.filter(t => t.id !== tabId);
    onUpdateClass(selectedClassId, { customTabs: tabs });
    setEditingTab(null);
  };

  // Add element to tab
  const addElement = (tabId) => {
    if (!newElement.content.trim()) {
      alert('Bitte Inhalt eingeben');
      return;
    }
    const tabs = customTabs.map(tab => {
      if (tab.id === tabId) {
        const element = { id: Date.now().toString(), ...newElement };
        return { ...tab, elements: [...tab.elements, element] };
      }
      return tab;
    });
    onUpdateClass(selectedClassId, { customTabs: tabs });
    setNewElement({ type: 'text', content: '' });
  };

  // Delete element
  const deleteElement = (tabId, elementId) => {
    const tabs = customTabs.map(tab => {
      if (tab.id === tabId) {
        return { ...tab, elements: tab.elements.filter(e => e.id !== elementId) };
      }
      return tab;
    });
    onUpdateClass(selectedClassId, { customTabs: tabs });
  };

  // Move element
  const moveElement = (tabId, elementId, direction) => {
    const tabs = customTabs.map(tab => {
      if (tab.id === tabId) {
        const elements = [...tab.elements];
        const idx = elements.findIndex(e => e.id === elementId);
        if (direction === 'up' && idx > 0) {
          [elements[idx], elements[idx - 1]] = [elements[idx - 1], elements[idx]];
        } else if (direction === 'down' && idx < elements.length - 1) {
          [elements[idx], elements[idx + 1]] = [elements[idx + 1], elements[idx]];
        }
        return { ...tab, elements };
      }
      return tab;
    });
    onUpdateClass(selectedClassId, { customTabs: tabs });
  };

  // Update element
  const updateElement = (tabId, elementId, newContent) => {
    const tabs = customTabs.map(tab => {
      if (tab.id === tabId) {
        return { ...tab, elements: tab.elements.map(e => e.id === elementId ? { ...e, content: newContent } : e) };
      }
      return tab;
    });
    onUpdateClass(selectedClassId, { customTabs: tabs });
    setEditingElement(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Eigene Tabs verwalten</h2>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Klasse auswählen</label>
        <select value={selectedClassId || ''} onChange={(e) => { setSelectedClassId(e.target.value); setEditingTab(null); }} className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-indigo-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white">
          <option value="">-- Klasse wählen --</option>
          {classes.map(cls => <option key={cls.id} value={cls.id}>{cls.name} {cls.year && `(${cls.year})`}</option>)}
        </select>
      </div>

      {selectedClass && (
        <>
          {/* Create New Tab */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">📑 Neuer Tab</h3>
            {showNewTab ? (
              <div className="space-y-3">
                <input type="text" value={newTabName} onChange={(e) => setNewTabName(e.target.value)} placeholder="Tab-Name (z.B. 'Wichtige Links', 'Infos')" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                <div className="flex gap-2">
                  <button onClick={createTab} className="flex-1 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600">Erstellen</button>
                  <button onClick={() => { setShowNewTab(false); setNewTabName(''); }} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg">Abbrechen</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowNewTab(true)} className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 font-semibold flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Neuen Tab erstellen
              </button>
            )}
          </div>

          {/* Existing Tabs */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Vorhandene Tabs ({customTabs.length})</h3>
            {customTabs.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">Noch keine eigenen Tabs erstellt</p>
            ) : (
              <div className="flex gap-2 flex-wrap">
                {customTabs.map(tab => (
                  <button key={tab.id} onClick={() => setEditingTab(tab.id)} className={`px-4 py-2 rounded-lg font-medium transition-all ${editingTab === tab.id ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'}`}>
                    {tab.name} ({tab.elements.length})
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tab Editor */}
          {editingTab && customTabs.find(t => t.id === editingTab) && (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  ✏️ Bearbeite: {customTabs.find(t => t.id === editingTab).name}
                </h3>
                <button onClick={() => deleteTab(editingTab)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Tab löschen
                </button>
              </div>

              {/* Add Element */}
              <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-3">Element hinzufügen</h4>
                <div className="space-y-3">
                  <select value={newElement.type} onChange={(e) => setNewElement({ ...newElement, type: e.target.value, content: '' })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white">
                    <option value="heading">📌 Überschrift</option>
                    <option value="text">📝 Textblock</option>
                    <option value="list">📋 Liste</option>
                    <option value="link">🔗 Link</option>
                  </select>
                  
                  {newElement.type === 'heading' && (
                    <input type="text" value={newElement.content} onChange={(e) => setNewElement({ ...newElement, content: e.target.value })} placeholder="Überschrift..." className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                  )}
                  {newElement.type === 'text' && (
                    <textarea value={newElement.content} onChange={(e) => setNewElement({ ...newElement, content: e.target.value })} placeholder="Text..." rows={4} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                  )}
                  {newElement.type === 'list' && (
                    <textarea value={newElement.content} onChange={(e) => setNewElement({ ...newElement, content: e.target.value })} placeholder="Ein Punkt pro Zeile..." rows={4} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                  )}
                  {newElement.type === 'link' && (
                    <div className="space-y-2">
                      <input type="text" value={newElement.content} onChange={(e) => setNewElement({ ...newElement, content: e.target.value })} placeholder="Link-Text|URL (z.B. 'Google|https://google.com')" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                      <p className="text-xs text-slate-500 dark:text-slate-400">Format: Text|URL</p>
                    </div>
                  )}
                  
                  <button onClick={() => addElement(editingTab)} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Element hinzufügen
                  </button>
                </div>
              </div>

              {/* Elements List */}
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-3">
                  Elemente ({customTabs.find(t => t.id === editingTab).elements.length})
                </h4>
                {customTabs.find(t => t.id === editingTab).elements.length === 0 ? (
                  <p className="text-slate-500 dark:text-slate-400 text-center py-8">Noch keine Elemente hinzugefügt</p>
                ) : (
                  <div className="space-y-3">
                    {customTabs.find(t => t.id === editingTab).elements.map((elem, idx) => (
                      <div key={elem.id} className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                            {elem.type === 'heading' ? '📌 Überschrift' : elem.type === 'text' ? '📝 Text' : elem.type === 'list' ? '📋 Liste' : '🔗 Link'}
                          </span>
                          <div className="flex gap-1">
                            <button onClick={() => moveElement(editingTab, elem.id, 'up')} disabled={idx === 0} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded disabled:opacity-30">↑</button>
                            <button onClick={() => moveElement(editingTab, elem.id, 'down')} disabled={idx === customTabs.find(t => t.id === editingTab).elements.length - 1} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded disabled:opacity-30">↓</button>
                            <button onClick={() => setEditingElement(elem.id)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded">✏️</button>
                            <button onClick={() => deleteElement(editingTab, elem.id)} className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500">🗑️</button>
                          </div>
                        </div>
                        {editingElement === elem.id ? (
                          <div className="space-y-2">
                            <textarea value={elem.content} onChange={(e) => updateElement(editingTab, elem.id, e.target.value)} rows={3} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                            <button onClick={() => setEditingElement(null)} className="px-3 py-1 bg-emerald-500 text-white rounded text-sm">Fertig</button>
                          </div>
                        ) : (
                          <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{elem.content.substring(0, 100)}{elem.content.length > 100 ? '...' : ''}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ==================== CUSTOM TAB RENDERER (STUDENT VIEW) ====================
function CustomTabRenderer({ customTabs }) {
  if (!customTabs || customTabs.length === 0) return null;

  const [activeCustomTab, setActiveCustomTab] = useState(customTabs[0]?.id);
  const currentTab = customTabs.find(t => t.id === activeCustomTab);

  return (
    <>
      {/* Custom Tabs Buttons */}
      {customTabs.map(tab => (
        <button key={tab.id} onClick={() => setActiveCustomTab(tab.id)} className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${activeCustomTab === tab.id ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
          {tab.name}
        </button>
      ))}

      {/* Render Current Tab */}
      {activeCustomTab && currentTab && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
          <div className="space-y-6">
            {currentTab.elements.map(elem => {
              if (elem.type === 'heading') {
                return <h2 key={elem.id} className="text-2xl font-bold text-slate-800 dark:text-white">{elem.content}</h2>;
              }
              if (elem.type === 'text') {
                return <p key={elem.id} className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{elem.content}</p>;
              }
              if (elem.type === 'list') {
                return (
                  <ul key={elem.id} className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                    {elem.content.split('\n').filter(line => line.trim()).map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                );
              }
              if (elem.type === 'link') {
                const [text, url] = elem.content.split('|');
                return (
                  <a key={elem.id} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                    🔗 {text}
                  </a>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </>
  );
}


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
                        className={`border-2 rounded-xl p-transition-all duration-200 hover:shadow-lg 4 transition-all ${
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
function ClassViewVollstaendig({ classData, studentName, onLogout, updateClass, darkMode, toggleDarkMode }) {
  const [activeTab, setActiveTab] = useState('materials');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-emerald-900 dark:to-teal-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 transition-colors">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'Georgia, serif' }}>
                  Klasse {classData.name}
                </h1>
                {classData.year && (
                  <p className="text-slate-500">Schuljahr {classData.year}</p>
                )}
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
        {/* Subjects Overview */}
        {classData.subjects && classData.subjects.length > 0 && (
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
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

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm">
          <button
            onClick={() => setActiveTab('materials')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'materials'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-5 h-5" />
            Materialien
          </button>
          <button
            onClick={() => setActiveTab('homework')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'homework'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Book className="w-5 h-5" />
            Hausaufgaben
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'appointments'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Termine
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Image className="w-5 h-5" />
            Galerie
          </button>
          <CustomTabRenderer customTabs={classData.customTabs || []} />
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {activeTab === 'materials' && <MaterialsList materials={classData.materials || []} />}
          {activeTab === 'homework' && <HomeworkList homework={classData.homework || []} studentName={studentName} updateClass={updateClass} />}
          {activeTab === 'appointments' && <AppointmentsList appointments={classData.appointments || []} />}
          {activeTab === 'gallery' && <GalleryView gallery={classData.gallery || []} />}
        </div>
      </div>
    </div>
  );
}

// Materials List (Student View)
function MaterialsList({ materials }) {
  const [currentPath, setCurrentPath] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const getCurrentFolder = () => {
    let folder = { children: materials || [] };
    for (let name of currentPath) {
      folder = folder.children.find(item => item.name === name && item.type === 'folder');
      if (!folder) return null;
    }
    return folder;
  };

  const currentFolder = getCurrentFolder();

  if (!materials || materials.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
        <p className="text-xl text-slate-500 dark:text-slate-400">Keine Materialien</p>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="mb-6">
        <div className="flex items-center gap-2 flex-wrap transition-all">
          <button onClick={() => setCurrentPath([])} className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">📁 Root</button>
          {currentPath.map((folder, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-slate-400">/</span>
              <button onClick={() => setCurrentPath(currentPath.slice(0, idx + 1))} className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">{folder}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Search + Sort */}
      <div className="mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Suche..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
          >
            <option value="name">Nach Name</option>
            <option value="date">Nach Datum</option>
            <option value="type">Nach Typ</option>
          </select>
        </div>
      </div>

      {(() => {
        let items = currentFolder?.children || [];
        if (searchTerm) items = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        items = [...items].sort((a, b) => {
          if (sortBy === 'name') return a.name.localeCompare(b.name);
          if (sortBy === 'date') return (b.uploadedAt || b.date || 0) > (a.uploadedAt || a.date || 0) ? 1 : -1;
          if (sortBy === 'type') {
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;
            return a.name.localeCompare(b.name);
          }
          return 0;
        });
        return items;
      })().length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-xl text-slate-500 dark:text-slate-400">Ordner ist leer</p>
        </div>
      ) : (
        <div className="space-y-3">
          {(() => {
            let items = currentFolder?.children || [];
            if (searchTerm) items = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
            items = [...items].sort((a, b) => {
              if (sortBy === 'name') return a.name.localeCompare(b.name);
              if (sortBy === 'date') return (b.uploadedAt || b.date || 0) > (a.uploadedAt || a.date || 0) ? 1 : -1;
              if (sortBy === 'type') {
                if (a.type === 'folder' && b.type !== 'folder') return -1;
                if (a.type !== 'folder' && b.type === 'folder') return 1;
                return a.name.localeCompare(b.name);
              }
              return 0;
            });
            return items;
          })().map(item => (
            <div key={item.id} className="bg-white dark:bg-slate-700 p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:shadow-md transition-shadow">
              {item.type === 'folder' ? (
                <button onClick={() => setCurrentPath([...currentPath, item.name])} className="w-full text-left flex items-center gap-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white text-lg">📁 {item.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.children?.length || 0} Einträge</p>
                  </div>
                </button>
              ) : (
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Download className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 dark:text-white">{item.name}</p>
                    {item.description && <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{item.description}</p>}
                    {item.subject && <span className="inline-block mt-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">{item.subject}</span>}
                    {item.file && (
                      <button onClick={() => downloadFile(item.file, item.name)} className="mt-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        Herunterladen
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


function HomeworkList({ homework, studentName, updateClass }) {
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
        <p className="text-xl text-slate-500 dark:text-slate-400">Keine Hausaufgaben</p>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-4">
      {homework.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map((hw) => {
        const dueDate = new Date(hw.dueDate);
        const isOverdue = dueDate < today;
        const status = getHomeworkStatus(hw.dueDate);
        const mySubmission = hw.submissions?.find(s => s.studentName === studentName);

        return (
          <div key={hw.id} className={`border-2 rounded-xl p-transition-all duration-200 hover:shadow-lg 5 transition-all ${mySubmission ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20' : status.color}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {hw.subject && <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium">{hw.subject}</span>}
                <span className={`text-sm font-medium ${mySubmission ? 'text-emerald-600 dark:text-emerald-400' : status.textColor}`}>
                  {mySubmission ? '✓ Abgegeben' : `Bis: ${new Date(hw.dueDate).toLocaleDateString('de-DE')} • ${status.label}`}
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
                      <button onClick={() => submitHomework(hw.id)} className="flex-1 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 font-semibold flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />Abgeben
                      </button>
                      <button onClick={() => { setSubmitting(null); setSubmissionData({ file: null, comment: '' }); }} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600">
                        Abbrechen
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setSubmitting(hw.id)} className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 font-semibold flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />Hausaufgabe abgeben
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
            className={`border-2 rounded-xl p-transition-all duration-200 hover:shadow-lg 5 transition-all ${
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
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      studentName={studentName}
      setStudentName={setStudentName}
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