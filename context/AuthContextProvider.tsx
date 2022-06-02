import { createContext, useContext, useReducer } from 'react';
import { AuthService } from '../services/authServices';
import jwtDecode from 'jwt-decode';

export interface AuthState {
  email: string;
  sub: string;
  isAuth: boolean;
  authTime: number;
}

export interface AuthContextProps {
  payload: AuthState;
  onLogin: (accessToken: string) => void;
  onLogout: () => void;
}

const initAuthContext: AuthContextProps = {
  payload: {
    email: null!,
    sub: null!,
    isAuth: null!,
    authTime: null!
  },
  onLogin: null!,
  onLogout: null!
};

export const AuthContext = createContext(initAuthContext);

//REDUCER
interface AuthReducerActions {
  type: AuthReducerActionsType;
  payload?: AuthState;
}

enum AuthReducerActionsType {
  'SET_AUTH_STATE' = 'SET_AUTH_STATE',
  'LOGOUT' = 'LOGOUT'
}

export const authReducer = (state: AuthState, action: AuthReducerActions) => {
  switch (action.type) {
    case AuthReducerActionsType.SET_AUTH_STATE:
      return {
        ...action.payload
      } as AuthState;

    case AuthReducerActionsType.LOGOUT:
      return {
        email: null!,
        sub: null!,
        isAuth: null!,
        authTime: null!
      } as AuthState;

    default:
      return state;
  }
};

//AUTH CONTEXT PROVIDER
interface AuthContextProviderProps {
  children: JSX.Element;
}

function AuthContextProvider(props: AuthContextProviderProps) {
  const [authState, dispatchAuthState] = useReducer(
    authReducer,
    initAuthContext.payload
  );

  const authService = new AuthService();

  //LOGIN HANDLER
  const onLogin = async (accessToken: string): Promise<void> => {
    const decoded: any = jwtDecode(accessToken);
    const isAuth = authService.isAuthenticated(accessToken);

    if (!isAuth) {
      onLogout();
    }

    dispatchAuthState({
      type: AuthReducerActionsType.SET_AUTH_STATE,
      payload: {
        email: decoded['username'],
        sub: decoded['sub'],
        authTime: decoded['auth_time'],
        isAuth: authService.isAuthenticated(accessToken)
      }
    });
  };

  //LOGOUT HANDLER
  const onLogout = () => {
    dispatchAuthState({
      type: AuthReducerActionsType.LOGOUT
    });
  };

  const contextValue: AuthContextProps = {
    payload: authState,
    onLogin: onLogin,
    onLogout: onLogout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
