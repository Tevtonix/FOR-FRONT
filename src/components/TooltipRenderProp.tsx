import { useState } from 'react';
interface TooltipRenderProps {
 children: (props: { isVisible: boolean; show: () => void; hide: () => void }) =>
React.ReactNode;
 text: string;
}
const TooltipRenderProp: React.FC<TooltipRenderProps> = ({ children, text }) => {
 const [isVisible, setIsVisible] = useState(false);
 const show = () => setIsVisible(true);
 const hide = () => setIsVisible(false);
 return (
 <>
 {children({ isVisible, show, hide })}
 {isVisible && (
 <span style={{
 position: 'absolute',
 bottom: '100%',
 left: '50%',
 transform: 'translateX(-50%)',
 background: 'black', color: 'white', padding: '4px 8px', borderRadius:
'4px',
 whiteSpace: 'nowrap', fontSize: '12px'
 }}>
 {text}
 </span>
 )}
 </>
 );
};
export default TooltipRenderProp;
