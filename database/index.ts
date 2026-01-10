/**
 * Database Models Index
 * Centralized export point for all Mongoose models
 * Allows importing models from a single location throughout the application
 */

export { default as Event } from './event.model';
export { default as Booking } from './booking.model';

// Re-export types for convenient imports
export type { IEvent } from './event.model';
export type { IBooking } from './booking.model';
