import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';

// Firebase configuration - Replace with your own config from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "gold-palm-solutions.firebaseapp.com",
  projectId: "gold-palm-solutions",
  storageBucket: "gold-palm-solutions.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Collection reference
const appointmentsCollection = collection(db, 'appointments');

// Types
export interface Appointment {
  id?: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  date: string;
  time: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Timestamp;
}

// Add a new appointment
export async function addAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<string> {
  try {
    const docRef = await addDoc(appointmentsCollection, {
      ...appointment,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding appointment:', error);
    throw error;
  }
}

// Get all appointments
export async function getAppointments(): Promise<Appointment[]> {
  try {
    const q = query(appointmentsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Appointment));
  } catch (error) {
    console.error('Error getting appointments:', error);
    throw error;
  }
}

// Update appointment status
export async function updateAppointmentStatus(
  id: string, 
  status: Appointment['status']
): Promise<void> {
  try {
    const appointmentRef = doc(db, 'appointments', id);
    await updateDoc(appointmentRef, { status });
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
}

// Delete an appointment
export async function deleteAppointment(id: string): Promise<void> {
  try {
    const appointmentRef = doc(db, 'appointments', id);
    await deleteDoc(appointmentRef);
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
}

// Delete all appointments (for admin use)
export async function deleteAllAppointments(): Promise<void> {
  try {
    const querySnapshot = await getDocs(appointmentsCollection);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting all appointments:', error);
    throw error;
  }
}
