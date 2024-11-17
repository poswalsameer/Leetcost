'use client';
import React, { useState } from 'react'
import LeetcodeContext from './leetcodeContext';

function LeetcodeContextProvider({children}: {children: React.ReactNode}) {

    const [username, setUsername] = useState<string>('');
    const [leetcodeData, setLeetcodeData] = useState<any>({});

    return (
        <LeetcodeContext.Provider value={{leetcodeData, setLeetcodeData, username, setUsername}}>
        {children}
        </LeetcodeContext.Provider>
    )
}

export default LeetcodeContextProvider
