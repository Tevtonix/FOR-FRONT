import React from 'react';
interface WithTooltipProps{
    tooltipText: string;
}
export function withTooltip<P extends object>
(WrappedComponent:React.ComponentType<P>){
    return function TooltipHOC(
        {tooltipText, ...props}
        :WithTooltipProps&P){
        return (<div style={{ 
            position: 'relative', 
            display: 'inline-block' }}>
            <WrappedComponent {...(props as P)} 
            />
            <span style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'black', 
                color:'white', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                whiteSpace: 'nowrap', 
                fontSize: '12px'}}>
                {tooltipText}
            </span>
        </div>
        );    
    };
}