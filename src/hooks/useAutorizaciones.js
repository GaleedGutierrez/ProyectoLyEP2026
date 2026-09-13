import { AutorizacionesContext } from '@context/AutorizacionesContext';
import { useContext } from 'react';

const useAutorizaciones = () => useContext(AutorizacionesContext);

export default useAutorizaciones;
