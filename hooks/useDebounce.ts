import { useState, useEffect } from 'react';
export function useDebounce<T>(value: T, delay: number): 
T {
 // Состояние для отложенного значения
 const [debouncedValue, setDebouncedValue] = useState<T>
 (value);
 useEffect(() => {
 // Устанавливаем таймер, который обновит значение после задержки
 const handler = setTimeout(() => {
 setDebouncedValue(value);
 }, delay);
 // Очищаем таймер при изменении value/delay или размонтировании
 return () => clearTimeout(handler);
 }, [value, delay]);
 // Возвращаем отложенное значение
 return debouncedValue;
}
