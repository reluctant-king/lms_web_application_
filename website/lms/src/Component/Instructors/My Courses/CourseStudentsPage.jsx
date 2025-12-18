import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Download, Users, UserCheck, Trophy, 
  Mail, CalendarDays, TrendingUp, MoreHorizontal, 
  ArrowUpRight, BookOpen, Clock, ChevronDown, X
} from 'lucide-react';
import axios from 'axios';

const CourseStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const courseId = window.location.pathname.split("/").pop();


  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/course_students/${courseId}`
        );

        const mapped = res.data.students.map((s) => ({
          id: s._id,
          name: s.name,
          email: s.email,
          enrolledDate: new Date(s.enrolledAt).toLocaleDateString(),
          progress: Math.floor(Math.random() * 100),
          status: "active",
          lastActive: "2 hours ago",
          coursesCompleted: Math.floor(Math.random() * 5),
        }));

        setStudents(mapped);
        setFilteredStudents(mapped);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [courseId]);

  // Filtering logic
  useEffect(() => {
    const filtered = students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        statusFilter === 'all' || student.status === statusFilter;

      return matchesSearch && matchesFilter;
    });

    setFilteredStudents(filtered);
  }, [searchTerm, statusFilter, students]);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return { 
          bg: 'bg-emerald-50', 
          text: 'text-emerald-700', 
          dot: 'bg-emerald-500',
          label: 'Active' 
        };
      case 'completed':
        return { 
          bg: 'bg-violet-50', 
          text: 'text-violet-700', 
          dot: 'bg-violet-500',
          label: 'Completed' 
        };
      case 'inactive':
        return { 
          bg: 'bg-slate-50', 
          text: 'text-slate-700', 
          dot: 'bg-slate-400',
          label: 'Inactive' 
        };
      default:
        return { 
          bg: 'bg-slate-50', 
          text: 'text-slate-700', 
          dot: 'bg-slate-400',
          label: 'Unknown' 
        };
    }
  };

  const getProgressConfig = (progress) => {
    if (progress >= 80) return { color: 'bg-emerald-500', ring: 'ring-emerald-500/20' };
    if (progress >= 50) return { color: 'bg-blue-500', ring: 'ring-blue-500/20' };
    if (progress >= 25) return { color: 'bg-amber-500', ring: 'ring-amber-500/20' };
    return { color: 'bg-rose-500', ring: 'ring-rose-500/20' };
  };

  const exportStudents = () => {
    const csv = [
      ['Name', 'Email', 'Enrolled Date', 'Progress', 'Status'],
      ...filteredStudents.map(s => [s.name, s.email, s.enrolledDate, `${s.progress}%`, s.status])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-600 font-medium">Loading students...</p>
        </div>
      </div>
    );
  }

  const activeStudents = students.filter(s => s.status === 'active').length;
  const avgProgress = students.length > 0 
    ? Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length) 
    : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-gradient-to-b from-violet-600 to-purple-600 rounded-full"></div>
                <h1 className="text-3xl font-bold text-slate-900">Students</h1>
              </div>
              <p className="text-slate-600 ml-5">Manage and track student progress in your course</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={exportStudents}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all hover:border-slate-400"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-violet-500/30 transition-all">
                <Users className="w-4 h-4" />
                Add Student
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Students */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-violet-100 rounded-xl">
                <Users className="w-6 h-6 text-violet-600" />
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold">
                <TrendingUp className="w-3 h-3" />
                12%
              </span>
            </div>
            <p className="text-slate-600 text-sm font-medium mb-1">Total Students</p>
            <p className="text-3xl font-bold text-slate-900">{students.length}</p>
            <p className="text-xs text-slate-500 mt-2">↑ 8 new this month</p>
          </div>

          {/* Active Students */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <UserCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-emerald-700 font-medium">Live</span>
              </div>
            </div>
            <p className="text-slate-600 text-sm font-medium mb-1">Active Students</p>
            <p className="text-3xl font-bold text-slate-900">{activeStudents}</p>
            <p className="text-xs text-slate-500 mt-2">{((activeStudents/students.length)*100).toFixed(0)}% of total</p>
          </div>

          {/* Avg Progress */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs text-slate-500 font-medium">Average</span>
            </div>
            <p className="text-slate-600 text-sm font-medium mb-1">Course Progress</p>
            <p className="text-3xl font-bold text-slate-900">{avgProgress}%</p>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full" style={{ width: `${avgProgress}%` }}></div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Trophy className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-xs text-slate-500 font-medium">0%</span>
            </div>
            <p className="text-slate-600 text-sm font-medium mb-1">Completed</p>
            <p className="text-3xl font-bold text-slate-900">0</p>
            <p className="text-xs text-slate-500 mt-2">No completions yet</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-100 transition-all"
              >
                <Filter className="w-4 h-4" />
                {statusFilter === 'all' ? 'All Status' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showFilterMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-20">
                  {['all', 'active', 'completed', 'inactive'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors ${
                        statusFilter === status ? 'text-violet-600 bg-violet-50' : 'text-slate-700'
                      }`}
                    >
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Active Filters */}
            {(searchTerm || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="inline-flex items-center gap-2 px-4 py-3 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>

          {/* Filter Tags */}
          {(searchTerm || statusFilter !== 'all') && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
              {searchTerm && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 text-violet-700 rounded-lg text-sm font-medium">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="hover:bg-violet-100 rounded p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {statusFilter !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
                  Status: {statusFilter}
                  <button onClick={() => setStatusFilter('all')} className="hover:bg-emerald-100 rounded p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Students List */}
        <div className="space-y-4">
          {filteredStudents.map((student, index) => {
            const statusConfig = getStatusConfig(student.status);
            const progressConfig = getProgressConfig(student.progress);
            
            return (
              <div
                key={student.id}
                className="bg-white rounded-2xl border border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Student Info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-400 via-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {student.name.charAt(0)}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusConfig.dot} rounded-full border-2 border-white`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-slate-900 mb-1 truncate">{student.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5 truncate">
                            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                            {student.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="flex-1 max-w-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600">Progress</span>
                        <span className="text-sm font-bold text-slate-900">{student.progress}%</span>
                      </div>
                      <div className="relative w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`${progressConfig.color} h-2 rounded-full transition-all duration-1000`}
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <CalendarDays className="w-4 h-4" />
                        <span className="font-medium">{student.enrolledDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{student.lastActive}</span>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${statusConfig.bg} ${statusConfig.text} rounded-lg text-xs font-semibold`}>
                        <div className={`w-1.5 h-1.5 ${statusConfig.dot} rounded-full`}></div>
                        {statusConfig.label}
                      </span>
                      
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors group/btn">
                        <MoreHorizontal className="w-5 h-5 text-slate-400 group-hover/btn:text-slate-600" />
                      </button>
                      
                      <button className="inline-flex items-center gap-1.5 px-4 py-2 text-violet-600 hover:bg-violet-50 rounded-lg font-medium transition-all group/view">
                        View
                        <ArrowUpRight className="w-4 h-4 group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No students found</h3>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              We couldn't find any students matching your criteria. Try adjusting your filters or search term.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Results Summary */}
        {filteredStudents.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filteredStudents.length}</span> of{' '}
              <span className="font-semibold text-slate-900">{students.length}</span> students
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseStudentsPage;