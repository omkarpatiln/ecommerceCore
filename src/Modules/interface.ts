interface MAIN_PROFILE_DATA {
  EMAIL_ID: string;
  ID: string;
  IS_ACTIVE: boolean;
  IS_ID: boolean;
  LAST_SEEN: string;
  LAST_USED: string;
  MOBILE_NUMBER: string;
  NAME: string;
  MESSAGE_TEXT: string;
  PASSWORD: string;
  POINTS: number;
  PROFILE_PIC: string;
  REGISTERED_DATE: string;
  ReferCode: number;
  SECURITY_PIN: string;
  UserEnteredReferCode: string;
}
interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
interface CartItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;

  rating: {
    rate: number;
    count: number;
  };
}

export type { MAIN_PROFILE_DATA, Products, CartItem };
