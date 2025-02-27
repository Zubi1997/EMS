

import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the drawer navigation params
export type DrawerParamList = {
  HomeScreen: undefined;
  Profile: undefined;
  AllSales: undefined;
  Login:undefined
  SaleDetail: { item: SaleItem } ;
  AddSale: undefined;
};

// Define the type for stack navigation if you're using a stack
export type RootStackParamList = {
  Login: undefined;
  Drawer: undefined; // This is for your drawer navigator inside a stack
};

// Define navigation prop types
export type ProfileScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Profile'>;
export type HomeScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'HomeScreen'>;
export type SaleDetailNavigationProp = NativeStackNavigationProp<DrawerParamList, 'SaleDetail'>;
export type AddSaleNavigationProp = NativeStackNavigationProp<DrawerParamList, 'AddSale'>;


// constants/types.ts

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  area_id: number;
  store_id: number;
  status: number;
  isCheckIn: boolean;
  isCheckOut: boolean;
  token: string | null;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: number;
  deleted_at: string | null;
  email_verified_at: string | null;
  is_email_verify: number;
  otp: string | null;
};

export type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
};

export type SaleItem = {
  id: string;
  name: string;
  price: number;
  // Add other fields as necessary
};