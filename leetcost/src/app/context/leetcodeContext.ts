import React, { Dispatch, SetStateAction } from "react";

interface leetcodeContextType {
    leetcodeData: any;
    setLeetcodeData: Dispatch<SetStateAction<any>>;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
}

const LeetcodeContext = React.createContext<leetcodeContextType | undefined>(undefined);

export default LeetcodeContext;