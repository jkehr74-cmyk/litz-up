import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Phone, Mail, MapPin, Clock, 
  CheckCircle, XCircle, AlertCircle, Trash2, 
  ArrowLeft, RefreshCw, Search, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { format } from 'date-fns';
import { 
  getAppointments, 
  updateAppointmentStatus, 
  deleteAppointment, 
  deleteAllAppointments,
  type Appointment 
} from '@/lib/firebase';

const serviceTypeLabels: Record<string, string> = {
  'emergency': 'Emergency Tree Removal',
  'high-risk': 'High-Risk Removal',
  'storm-damage': 'Storm Damage Cleanup',
  'power-line': 'Power Line Clearance',
  'estimate': 'Free Estimate',
  'other': 'Other Service'
};

const statusColors: Record<string, string> = {
  'pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'confirmed': 'bg-green-500/20 text-green-400 border-green-500/30',
  'completed': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'cancelled': 'bg-red-500/20 text-red-400 border-red-500/30'
};

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments. Please check your Firebase configuration.');
      console.error('Error loading appointments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: Appointment['status']) => {
    try {
      await updateAppointmentStatus(id, newStatus);
      // Update local state
      setAppointments(prev => prev.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
    } catch (err) {
      setError('Failed to update appointment status.');
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      try {
        await deleteAppointment(id);
        setAppointments(prev => prev.filter(app => app.id !== id));
      } catch (err) {
        setError('Failed to delete appointment.');
        console.error('Error deleting appointment:', err);
      }
    }
  };

  const handleClearAll = async () => {
    if (confirm('Are you sure you want to delete ALL appointments? This cannot be undone.')) {
      try {
        await deleteAllAppointments();
        setAppointments([]);
      } catch (err) {
        setError('Failed to delete all appointments.');
        console.error('Error clearing appointments:', err);
      }
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  };

  return (
    <div className="min-h-screen bg-black text-gold-400">
      {/* Header */}
      <header className="border-b border-gold-500/20 bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Site</span>
              </a>
              <div className="h-6 w-px bg-gold-500/30" />
              <h1 className="text-xl font-bold text-gradient-gold">Admin Dashboard</h1>
            </div>
            <Button 
              onClick={loadAppointments}
              variant="outline"
              size="sm"
              className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 bg-red-500/10 border-red-500/30 text-red-400">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          {[
            { label: 'Total', value: stats.total, color: 'text-gold-400' },
            { label: 'Pending', value: stats.pending, color: 'text-yellow-400' },
            { label: 'Confirmed', value: stats.confirmed, color: 'text-green-400' },
            { label: 'Completed', value: stats.completed, color: 'text-blue-400' },
            { label: 'Cancelled', value: stats.cancelled, color: 'text-red-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-black-50 border border-gold-500/20 rounded-xl p-4 text-center">
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-gold-400/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/50" />
            <Input
              placeholder="Search by name, phone, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black-50 border-gold-500/30 text-gold-400 placeholder:text-gold-400/30"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-black-50 border border-gold-500/30 rounded-md px-4 py-2 text-gold-400 focus:outline-none focus:border-gold-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Button 
              onClick={handleClearAll}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </motion.div>

        {/* Appointments List */}
        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
            <p className="text-gold-400/60 mt-4">Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-black-50 border border-gold-500/20 rounded-xl"
          >
            <Calendar className="w-16 h-16 text-gold-400/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gold-400 mb-2">No Appointments Found</h3>
            <p className="text-gold-400/60">
              {appointments.length === 0 
                ? "No appointments have been scheduled yet." 
                : "No appointments match your search criteria."}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {filteredAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-black-50 border border-gold-500/20 rounded-xl p-6 hover:border-gold-500/40 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Left: Customer Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-gold-400">{appointment.name}</h3>
                      <Badge className={`${statusColors[appointment.status]} border`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-gold-400/70">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${appointment.phone}`} className="hover:text-gold-400">
                          {appointment.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gold-400/70">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${appointment.email}`} className="hover:text-gold-400">
                          {appointment.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gold-400/70 md:col-span-2">
                        <MapPin className="w-4 h-4" />
                        {appointment.address}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gold-500/10">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gold-400" />
                          <span className="text-gold-400">
                            {format(new Date(appointment.date), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gold-400" />
                          <span className="text-gold-400">{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-gold-400" />
                          <span className="text-gold-400/70">
                            {serviceTypeLabels[appointment.serviceType] || appointment.serviceType}
                          </span>
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <div className="mt-3 text-sm text-gold-400/60">
                          <span className="text-gold-400/40">Notes:</span> {appointment.notes}
                        </div>
                      )}

                      <div className="mt-3 text-xs text-gold-400/40">
                        Requested: {appointment.createdAt ? format(appointment.createdAt.toDate(), 'MMM d, yyyy h:mm a') : 'N/A'}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleUpdateStatus(appointment.id!, 'confirmed')}
                        size="sm"
                        className={`${appointment.status === 'confirmed' ? 'bg-green-500/30' : 'bg-green-500/20 hover:bg-green-500/30'} text-green-400`}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Confirm
                      </Button>
                      <Button
                        onClick={() => handleUpdateStatus(appointment.id!, 'completed')}
                        size="sm"
                        className={`${appointment.status === 'completed' ? 'bg-blue-500/30' : 'bg-blue-500/20 hover:bg-blue-500/30'} text-blue-400`}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Complete
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleUpdateStatus(appointment.id!, 'cancelled')}
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleDelete(appointment.id!)}
                        size="sm"
                        variant="outline"
                        className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
