// Lehrer-Homepage - Erweiterte Version mit allen Features
// Komplett in einer Datei für einfaches Deployment

import React, { useState, useEffect } from 'react';
import { Calendar, Upload, Book, Users, Lock, Plus, X, Download, Eye, EyeOff, Trash2, Edit2, Check, AlertCircle, LogOut, FileText, Link as LinkIcon, Save, Clock, Image, Bell, Grid, Sun, Moon, BarChart3, User, CheckCircle, XCircle, Loader, Send } from 'lucide-react';

export default function LehrerHomepageErweitert() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [classPassword, setClassPassword] = useState('');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [studentName, setStudentName] = useState('');

  const ADMIN_PASSWORD = 'Lehrer2024!';

  useEffect(() => {
    loadData();
    loadDarkMode();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const loadData = () => {
    try {
      const stored = localStorage.getItem('teacher_classes_v3');
      if (stored) {
        setClasses(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Keine gespeicherten Klassen gefunden');
    }
    setLoading(false);
  };

  const loadDarkMode = () => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setDarkMode(JSON.parse(saved));
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const saveClasses = (updatedClasses) => {
    try {
      localStorage.setItem('teacher_classes_v3', JSON.stringify(updatedClasses));
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
      if (!studentName.trim()) {
        alert('Bitte gib deinen Namen ein!');
        return;
      }
      setSelectedClass(classItem);
      setClassPassword('');
    } else {
      alert('Falsches Klassen-Passwort!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-2xl text-slate-600 dark:text-slate-300 animate-pulse">Lädt...</div>
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
    return <AdminPanel 
      classes={classes}
      saveClasses={saveClasses}
      onLogout={() => setIsAdmin(false)}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
    />;
  }

  return <StudentView 
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

// Wegen Zeichenlimit sende ich die Datei aufgeteilt.
// Dies ist Teil 1 von 3. Fortsetzen?
