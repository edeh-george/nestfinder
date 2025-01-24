import { useState, createContext } from "react";

 const PaymentContext = createContext();

export default PaymentContext;

export const PaymentProvider = ({ children }) =>{
    const [price, setPrice] = useState(0);

    return (
        <PaymentContext.Provider value={{ price, setPrice }}>
          {children}
        </PaymentContext.Provider>
      );
};