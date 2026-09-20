import { useState } from 'react';
export function useTooltip() {
 const [isVisible, setIsVisible] = useState(false);
 const show = () => setIsVisible(true);
 const hide = () => setIsVisible(false);
 return { isVisible, show, hide };
}