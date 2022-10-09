import { createContext } from "react";
import React, { useState } from 'react'
//The type of variable you'll pass through, might be an object with all the varibles inside.

type contextType = {
    refContainer: React.MutableRefObject<HTMLDivElement>,
    setRefContainer: (refContainer: React.MutableRefObject<HTMLDivElement>)=> void,
    animationIDs: number[],
    setAnimationIDs: (animationIDs: number[])=> void,
    direction: number,
    setDirection: (direction: number) => void,
    delay: number,
    setDelay: (delay: number) => void,
    background: boolean,
    setBackground: (background: boolean)=> void,
    record: boolean,
    setRecord: (background: boolean)=> void,
}

export const AxieContext = createContext<contextType>(null);

interface Props {
    children: React.ReactNode;
}
//The provider that will wrap the app.tsx components, variables will go inside of 'value' prop.  
const AxieProvider: React.FC<Props> = ({ children }) => {

    const [refContainer, setRefContainer] = useState<React.MutableRefObject<HTMLDivElement>>(null)
    const [animationIDs, setAnimationIDs] = useState<number[]>([2, 3, 4, 5])
    const [direction, setDirection] = useState<number>(1)
    const [delay, setDelay] = useState<number>(0)
    const [background, setBackground] = useState<boolean>(false)
    const [record, setRecord] = useState<boolean>(false)

    return (
        <div>
            <AxieContext.Provider value={ { refContainer, setRefContainer, animationIDs, setAnimationIDs, direction, setDirection, delay, setDelay, background, setBackground, record, setRecord } }>
                {children}
            </AxieContext.Provider>
        </div>
    );
}

export default AxieProvider;