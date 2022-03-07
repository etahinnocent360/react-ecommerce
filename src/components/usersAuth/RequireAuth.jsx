/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useLocation, Navigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const RequireAuth = ({children, ...rest}) =>{
	const {currentUser} = useAuth()
	const location = useLocation()
	return(
		<Routes>
		<Route
		{...rest}
		render = {() =>currentUser
			?children
			:<Navigate to={'/login'} replace state={{from:location.pathname}} />
		}
		/>
		</Routes>
	)
	
}
export default RequireAuth