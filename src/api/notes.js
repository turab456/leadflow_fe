import { apiFetch } from './client.js';

export const getNotesByLead = async (leadId) => apiFetch(`/api/leads/${leadId}/notes`);
export const createNoteForLead = async (leadId, body) => apiFetch(`/api/leads/${leadId}/notes`, { method: 'POST', body });
export const deleteNote = async (noteId) => apiFetch(`/api/notes/${noteId}`, { method: 'DELETE' });
