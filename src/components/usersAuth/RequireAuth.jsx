/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useLocation, Navigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const RequireAuth = ({children, ...rest}) =>{
	const {currentUser} = useAuth()
	return(
		<Routes>
		<Route
		{...rest}
		render = {() =>currentUser
			?children
			:<Navigate to={'/login'}/>
		}
		/>
		</Routes>
	)
	
}
export default RequireAuth