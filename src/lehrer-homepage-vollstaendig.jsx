import React, { useState, useEffect } from 'react';
import { Calendar, Upload, Book, Users, Lock, Plus, X, Download, Eye, EyeOff, Trash2, Edit2, Check, AlertCircle, LogOut, FileText, Link as LinkIcon, Save, Clock, Sun, Moon } from 'lucide-react';

// Hauptkomponente


// Login-Bildschirm
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
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [newClass, setNewClass] = useState({ name: '', year: '', password: '', subjects: [] });

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

// Homework Manager
function HomeworkManager({ classes, selectedClassId, setSelectedClassId, onUpdateClass }) {
  const [newHomework, setNewHomework] = useState({
    title: '',
    description: '',
    dueDate: '',
    subject: ''
  });

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

    const homework = {
      ...newHomework,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const homeworkList = [...(selectedClass.homework || []), homework];
    onUpdateClass(selectedClassId, { homework: homeworkList });
    
    setNewHomework({ title: '', description: '', dueDate: '', subject: '' });
    alert('Hausaufgabe erfolgreich hinzugefügt!');
  };

  const deleteHomework = (homeworkId) => {
    if (window.confirm('Hausaufgabe wirklich löschen?')) {
      const homeworkList = selectedClass.homework.filter(h => h.id !== homeworkId);
      onUpdateClass(selectedClassId, { homework: homeworkList });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Hausaufgaben verwalten</h2>

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
          {/* Add Homework Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Neue Hausaufgabe erstellen</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Titel *</label>
                <input
                  type="text"
                  value={newHomework.title}
                  onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })}
                  placeholder="z.B. Übungsaufgaben Seite 45-47"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Beschreibung</label>
                <textarea
                  value={newHomework.description}
                  onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })}
                  placeholder="Detaillierte Aufgabenbeschreibung"
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Fälligkeitsdatum *</label>
                  <input
                    type="date"
                    value={newHomework.dueDate}
                    onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Fach</label>
                  <select
                    value={newHomework.subject}
                    onChange={(e) => setNewHomework({ ...newHomework, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 outline-none"
                  >
                    <option value="">-- Fach wählen --</option>
                    {selectedClass.subjects?.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={addHomework}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Hausaufgabe hinzufügen
              </button>
            </div>
          </div>

          {/* Homework List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Vorhandene Hausaufgaben ({selectedClass.homework?.length || 0})
            </h3>

            {!selectedClass.homework || selectedClass.homework.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Book className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Noch keine Hausaufgaben vorhanden</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedClass.homework
                  .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                  .map(hw => {
                    const dueDate = new Date(hw.dueDate);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const isOverdue = dueDate < today;
                    const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

                    return (
                      <div 
                        key={hw.id} 
                        className={`border-2 rounded-xl p-4 transition-all ${
                          isOverdue 
                            ? 'border-red-200 bg-red-50' 
                            : daysUntil <= 3
                            ? 'border-amber-200 bg-amber-50'
                            : 'border-slate-100 hover:border-amber-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {hw.subject && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                  {hw.subject}
                                </span>
                              )}
                              <span className={`text-xs font-medium ${
                                isOverdue ? 'text-red-600' : daysUntil <= 3 ? 'text-amber-600' : 'text-slate-500'
                              }`}>
                                Bis: {dueDate.toLocaleDateString('de-DE')}
                                {!isOverdue && daysUntil >= 0 && ` (${daysUntil} ${daysUntil === 1 ? 'Tag' : 'Tage'})`}
                                {isOverdue && ' (ÜBERFÄLLIG)'}
                              </span>
                            </div>
                            <h4 className="font-semibold text-slate-800 mb-1">{hw.title}</h4>
                            {hw.description && (
                              <p className="text-sm text-slate-600 whitespace-pre-wrap">{hw.description}</p>
                            )}
                          </div>
                          <button
                            onClick={() => deleteHomework(hw.id)}
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
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {activeTab === 'materials' && <MaterialsList materials={classData.materials || []} />}
          {activeTab === 'homework' && <HomeworkList homework={classData.homework || []} />}
          {activeTab === 'appointments' && <AppointmentsList appointments={classData.appointments || []} />}
        </div>
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