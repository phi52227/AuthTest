import React from 'react';

export type RootStackParamList = {
  Menu: undefined;
  Phone: {
    setPhoneAuth: React.Dispatch<React.SetStateAction<boolean>>;
  };
  Address: {
    setAddressAuth: React.Dispatch<React.SetStateAction<boolean>>;
  };
  CompareAddr: {
    address: string;
    afterCheck: (value: boolean) => void;
  };
};
