export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
};

export type ContactForm = {
  firstName: string;
  lastName: string;
  age: number;
  photo?: string;
};

export type GetListContact = {
  data: Contact[];
};

export type GetContact = {
  data: Contact;
};

export type RootStackParamList = {
  List: undefined;
  Form: {isEdit: boolean};
  ChooseAvatar: {isEdit: boolean};
  Detail: {id: string};
};
