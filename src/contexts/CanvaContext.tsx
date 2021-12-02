import { createContext, ReactNode, useContext, useState } from "react";

type CanvaContextData = {
  lineConfig: lineConfigType;
  setLineConfig: React.Dispatch<React.SetStateAction<lineConfigType>>;
};

type CanvaContextProviderProps = {
  children: ReactNode;
};

export type lineConfigType = {
  width: number;
  color: string;
  dashed: boolean;
};

export const CanvaContext = createContext({} as CanvaContextData);

export function CanvaContextProvider({ children }: CanvaContextProviderProps) {
  const [lineConfig, setLineConfig] = useState<lineConfigType>({
    width: 1,
    color: "black",
    dashed: false,
  });

  return (
    <CanvaContext.Provider
      value={{
        lineConfig,
        setLineConfig,
      }}
    >
      {children}
    </CanvaContext.Provider>
  );
}

export const useCanva = () => {
  return useContext(CanvaContext);
};
