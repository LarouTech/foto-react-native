import validator from 'validator';
import { ProfileContextProps } from '../context/ProfileContextProvider';
import { ProfileService } from '../services/profileService';


export interface ProfileFormSchema {
  name: string;
  id: string;
  label: string;
}


export interface ProfileFormState {
  email?: {
    value?: string,
    isValid?: boolean
  };
  firstName?: {
    value?: string,
    isValid?: boolean
  };
  lastName?: {
    value?: string,
    isValid?: boolean
  };
  username?: {
    value?: string,
    isValid?: boolean
  };
  birthdate?: {
    value?: string | Date,
    isValid?: boolean
  };
}



export enum ProfileFormActionTypes {
  'ON_INPUT_CHANGE' = 'ON_INPUT_CHANGE'
}

export interface ProfileFormAction {
  type: ProfileFormActionTypes;
  payload: string | Date;
  fieldName: string;
}


export const formStateReducer = (
  state: ProfileFormState,
  action: ProfileFormAction
): ProfileFormState => {


  switch (action.type) {
    case ProfileFormActionTypes.ON_INPUT_CHANGE:
      return {
        ...state,
        [action.fieldName]: {
          value: action.payload,
        }
      } as ProfileFormState;

    default:
      return state;
  }
};