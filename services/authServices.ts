import { AdminGetUserCommand, AuthenticationResultType, CognitoIdentityProviderClient, ConfirmForgotPasswordCommand, ConfirmSignUpCommand, ConfirmSignUpCommandOutput, EmailConfigurationType, ForgotPasswordCommand, GetUserCommand, InitiateAuthCommand, InitiateAuthCommandOutput, SignUpCommand, SignUpCommandOutput, UpdateUserAttributesCommand } from "@aws-sdk/client-cognito-identity-provider";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { Config, ConfigService } from "./configService";
import { BehaviorSubject, from, lastValueFrom, map, Observable, of, take, tap } from "rxjs";
import { v4 as uuidv4 } from 'uuid';
import { AuthContextProps } from "../context/AuthContextProvider";
import { ProfileContextProps } from "../context/ProfileContextProvider";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentity, CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";


export class AuthService {
    private _config = new BehaviorSubject<Config>(null!)
    private client?: CognitoIdentityProviderClient
    private readonly config = new ConfigService().fetchAppConfig()


    constructor() {
        this.setConfig()
    }

    //INIT CONFIG FROM CONFIG SERVICE 
    setConfig() {
        const config$ = from(new ConfigService().fetchAppConfig())
            .pipe(
                tap(res => {
                    this._config.next(res)
                    this.client = new CognitoIdentityProviderClient({
                        region: res.region
                    })
                })
            )

        lastValueFrom(config$)
    }

    //GET COGNITO CREDENTIALS
    async getCognitoCredentials() {
        const idToken = await AsyncStorage.getItem('IdToken')
        const config = await this.config

        return fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: config.region }),
            identityPoolId: config.cognito.identityPoolId,
            logins: {
                [`cognito-idp.${config.region}.amazonaws.com/${config.cognito.userPoolId}`]: idToken!
            }
        })
    }

    //GET IDENTITY ID
    async getIdentityId() {
        const idToken = await AsyncStorage.getItem('IdToken')
        const config = await this.config

        const client = new CognitoIdentity({
            region: config.region,
            credentials: await this.getCognitoCredentials()
        })

        return client.getId({
            IdentityPoolId: config.cognito.identityPoolId,
            Logins: {
                [`cognito-idp.${config.region}.amazonaws.com/${config.cognito.userPoolId}`]: idToken!
            }
        })

    }

    //COGNITO SIGNUPCOMMAND
    signin(email: string, passsword: string): Promise<SignUpCommandOutput | undefined> {
        const command = new SignUpCommand({
            ClientId: this._config.getValue().cognito?.userPoolClientId,
            Username: email,
            Password: passsword,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email
                }
            ]
        });

        const response = this.client?.send(command);
        return response!
    }

    //COGNITO CONFIRMSIGNUPCOMMAND
    confirmSignup(email: string, code: string): Promise<ConfirmSignUpCommandOutput> {
        const command = new ConfirmSignUpCommand({
            ClientId: this._config.getValue().cognito?.userPoolClientId,
            ConfirmationCode: code,
            Username: email
        });

        const response = this.client!.send(command);
        return response;
    };

    //COGNITO LOGIN
    initAuthCommand(email: string, password: string): Promise<InitiateAuthCommandOutput> {
        const command = new InitiateAuthCommand({
            ClientId: this._config.getValue().cognito?.userPoolClientId,
            AuthFlow: 'USER_PASSWORD_AUTH',
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
            }
        });

        const response = this.client?.send(command)
        return response!;
    };

    //LOGIN HANDLER
    async onLoginHandler(email: string, password: string, authContext: AuthContextProps, profileContext: ProfileContextProps): Promise<InitiateAuthCommandOutput> {
        const authResponse = await this
            .initAuthCommand(email, password)
            .then((res) => {

                authContext.onLogin(res.AuthenticationResult?.AccessToken!)!;
                return res;
            });

        const id = uuidv4();
        const user = await this.getUserFromAccessToken(
            authResponse.AuthenticationResult!.AccessToken!
        );

        const isNewuser = user?.UserAttributes?.find(
            (attr) => attr.Name === 'custom:profileId'
        );

        if (!isNewuser) {
            profileContext.onCreateProfile({
                id: id,
                email: user?.Username,
                cognitoSub: user?.UserAttributes?.find((attr) => attr.Name === 'sub')
                    ?.Value!,
                creationDate: new Date().toISOString(),
                firstName: '',
                lastName: '',
                lastModified: new Date().toISOString(),
                username: '',
                birthdate: '',
                imageKeyId: ''
            });

            const response = await this.addProfileIdAttribute(
                id,
                authResponse.AuthenticationResult?.AccessToken!
            );
        } else {
        }

        await this.setJwtTokens(authResponse.AuthenticationResult!);

        const profileId = user?.UserAttributes?.find(
            (attr) => attr.Name === 'custom:profileId'
        )?.Value;

        profileContext.onGetProfile(profileId!);

        return authResponse;

    };

    //COGNITO FORGOT PASSWORD
    forgotPassword(email: string) {
        const command = new ForgotPasswordCommand({
            ClientId: this._config.getValue().cognito.userPoolClientId,
            Username: email
        })

        const response = this.client?.send(command)
        return response!;
    }

    //COGNITO CONFIRM FORGOT PASSWORD
    confirmForgotPassword(email: string, password: string, code: string) {
        const command = new ConfirmForgotPasswordCommand({
            ClientId: this._config.getValue().cognito.userPoolClientId,
            ConfirmationCode: code,
            Username: email,
            Password: password
        })

        const response = this.client?.send(command)
        return response!;
    }

    //GET COGNITO USER FROM ACCESS TOKEN
    async getUserFromAccessToken(accessToken: string) {
        const command = new GetUserCommand({
            AccessToken: accessToken
        })

        const response = this.client?.send(command)
        return response
    }

    //GET USER FROM USER POOL ID AND USERNAME,
    async getUserFromEmail(email: string) {

        const config = await this.config


        const command = new AdminGetUserCommand({
            UserPoolId: config.cognito.userPoolId,
            Username: email
        })

        const response = this.client?.send(command)
        return response
    }

    //ADD PROFILE ID ATTRIBUTE
    async addProfileIdAttribute(profileId: string, accessToken: string) {
        const command = new UpdateUserAttributesCommand({
            AccessToken: accessToken,
            UserAttributes: [
                {
                    Name: 'custom:profileId',
                    Value: profileId
                }
            ]
        })

        const response = this.client?.send(command)
        return response
    }


    //COGNITO LOGOUT
    async onLogout(): Promise<void> {
        await AsyncStorage.removeItem('AccessToken');
        await AsyncStorage.removeItem('IdToken');
        await AsyncStorage.removeItem('RefreshToken');
    }

    //STORE TOKENS to ASYNC STORAGE
    async setJwtTokens(authResult: AuthenticationResultType) {
        await AsyncStorage.setItem('AccessToken', authResult.AccessToken!).catch(error => { return })
        await AsyncStorage.setItem('IdToken', authResult.IdToken!).catch(error => { return })
        await AsyncStorage.setItem('RefreshToken', authResult.RefreshToken!).catch(error => { return })

    }

    //CHECK IF ACCESS TOKEN IS VALID
    isAuthenticated(accessToken: string): boolean {
        let alive: number = null!

        if (accessToken) {
            const decoded: any = jwtDecode(accessToken);
            const now = Math.round(Date.now() / 1000);
            alive = decoded['exp'] - now;
        }

        if (alive > 0) {
            return true;
        }

        return false;
    };




}