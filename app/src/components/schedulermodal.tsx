import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Phone, Mail, MapPin, User, MessageSquare, Check, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { format, addDays, startOfToday } from 'date-fns';
import { addAppointment } from '@/lib/firebase';

interface SchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const serviceTypes = [
  { value: 'emergency', label: 'Emergency Tree Removal' },
  { value: 'high-risk', label: 'High-Risk Removal' },
  { value: 'storm-damage', label: 'Storm Damage Cleanup' },
  { value: 'power-line', label: 'Power Line Clearance' },
  { value: 'estimate', label: 'Free Estimate' },
  { value: 'other', label: 'Other Service' },
];

export function SchedulerModal({ isOpen, onClose }: SchedulerModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: '',
    date: '',
    time: '',
    notes: ''
  });

  const today = startOfToday();
  const availableDates = Array.from({ length: 14 }, (_, i) => addDays(today, i));

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Add appointment to Firebase
      await addAppointment({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        serviceType: formData.serviceType,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
        status: 'pending'
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      setIsSubmitting(false);
      setError('Failed to submit appointment. Please try again or call us directly.');
      console.error('Error submitting appointment:', err);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSuccess(false);
    setError(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      serviceType: '',
      date: '',
      time: '',
      notes: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const canProceedStep1 = formData.name && formData.phone && formData.email && formData.address;
  const canProceedStep2 = formData.serviceType && formData.date && formData.time;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-black border border-gold-500/30 text-gold-400">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient-gold flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Schedule Service
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-500/30">
                <Check className="w-10 h-10 text-gold-400" />
              </div>
              <h3 className="text-xl font-bold text-gold-400 mb-2">Appointment Requested!</h3>
              <p className="text-gold-400/60 mb-6">
                Thank you {formData.name}! We've received your request for {format(new Date(formData.date), 'MMMM d, yyyy')} at {formData.time}. 
                Our team will call you at {formData.phone} to confirm.
              </p>
              <Button onClick={handleClose} className="bg-gradient-gold text-black hover:opacity-90">
                Close
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Error Alert */}
              {error && (
                <Alert className="mb-4 bg-red-500/10 border-red-500/30 text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-4 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        step >= s 
                          ? 'bg-gradient-gold text-black' 
                          : 'bg-black-50 border border-gold-500/30 text-gold-400/50'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div className={`w-8 h-0.5 mx-2 ${step > s ? 'bg-gold-500' : 'bg-gold-500/20'}`} />
                    )}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h3 className="font-semibold text-gold-400 text-lg">Contact Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gold-400/80">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/50" />
                      <Input
                        id="name"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10 bg-black-50 border-gold-500/30 text-gold-400 placeholder:text-gold-400/30 focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gold-400/80">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/50" />
                      <Input
                        id="phone"
                        placeholder="(727) 621-4041"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10 bg-black-50 border-gold-500/30 text-gold-400 placeholder:text-gold-400/30 focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gold-400/80">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/50" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 bg-black-50 border-gold-500/30 text-gold-400 placeholder:text-gold-400/30 focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gold-400/80">Service Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400/50" />
                      <Input
                        id="address"
                        placeholder="123 Main St, Sarasota, FL"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="pl-10 bg-black-50 border-gold-500/30 text-gold-400 placeholder:text-gold-400/30 focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep1}
                    className="w-full bg-gradient-gold text-black hover:opacity-90 disabled:opacity-50"
                  >
                    Continue
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h3 className="font-semibold text-gold-400 text-lg">Service Details</h3>

                  <div className="space-y-2">
                    <Label className="text-gold-400/80">Service Type *</Label>
                    <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                      <SelectTrigger className="bg-black-50 border-gold-500/30 text-gold-400">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gold-500/30">
                        {serviceTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value} className="text-gold-400 hover:bg-gold-500/10">
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gold-400/80">Select Date *</Label>
                    <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
                      {availableDates.map((date) => (
                        <button
                          key={date.toISOString()}
                          onClick={() => handleInputChange('date', date.toISOString())}
                          className={`p-2 rounded-lg text-center text-sm transition-all ${
                            formData.date === date.toISOString()
                              ? 'bg-gradient-gold text-black'
                              : 'bg-black-50 border border-gold-500/20 hover:border-gold-500/50 text-gold-400'
                          }`}
                        >
                          <div className="font-bold">{format(date, 'd')}</div>
                          <div className="text-xs opacity-70">{format(date, 'EEE')}</div>
                        </button>
                      ))}
                    </div>
                    {formData.date && (
                      <p className="text-sm text-gold-400 font-medium">
                        Selected: {format(new Date(formData.date), 'MMMM d, yyyy')}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gold-400/80">Select Time *</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleInputChange('time', time)}
                          className={`p-2 rounded-lg text-sm transition-all ${
                            formData.time === time
                              ? 'bg-gradient-gold text-black'
                              : 'bg-black-50 border border-gold-500/20 hover:border-gold-500/50 text-gold-400'
                          }`}
                        >
                          <Clock className="w-3 h-3 inline mr-1" />
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => setStep(1)} variant="outline" className="flex-1 border-gold-500/30 text-gold-400 hover:bg-gold-500/10">
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!canProceedStep2}
                      className="flex-1 bg-gradient-gold text-black hover:opacity-90 disabled:opacity-50"
                    >
                      Continue
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h3 className="font-semibold text-gold-400 text-lg">Additional Notes</h3>

                  <div className="bg-black-50 rounded-lg p-4 space-y-2 text-sm border border-gold-500/20">
                    <p><span className="text-gold-400/60">Name:</span> <span className="text-gold-400">{formData.name}</span></p>
                    <p><span className="text-gold-400/60">Phone:</span> <span className="text-gold-400">{formData.phone}</span></p>
                    <p><span className="text-gold-400/60">Service:</span> <span className="text-gold-400">{serviceTypes.find(t => t.value === formData.serviceType)?.label}</span></p>
                    <p><span className="text-gold-400/60">Date:</span> <span className="text-gold-400">{formData.date && format(new Date(formData.date), 'MMMM d, yyyy')}</span></p>
                    <p><span className="text-gold-400/60">Time:</span> <span className="text-gold-400">{formData.time}</span></p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-gold-400/80">Additional Information (Optional)</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gold-400/50" />
                      <Textarea
                        id="notes"
                        placeholder="Describe the tree situation, access issues, or any other details..."
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        className="pl-10 min-h-[100px] bg-black-50 border-gold-500/30 text-gold-400 placeholder:text-gold-400/30 focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => setStep(2)} variant="outline" className="flex-1 border-gold-500/30 text-gold-400 hover:bg-gold-500/10">
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-gold text-black hover:opacity-90"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</>
                      ) : (
                        'Request Appointment'
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
