import instance from '../configs/axios';
import {ContactForm, GetContact, GetListContact} from '../types';

export const getContacts = async () => {
  return instance.get<GetListContact>('/contact');
};

export const getContact = async (id: string) => {
  return instance.get<GetContact>(`/contact/${id}`);
};

export const postContact = async (params: ContactForm) => {
  return instance.post('/contact', params);
};

export const putContact = async (id: string, params: ContactForm) => {
  return instance.put(`/contact/${id}`, params);
};

export const deleteContact = async (id: string) => {
  return instance.delete(`/contact/${id}`);
};
