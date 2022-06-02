import { InitiateAuthCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { Config, ConfigService } from "./configService"
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from "./authServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Profile, ProfileContextProps } from "../context/ProfileContextProvider";



const configService = new ConfigService()
const authService = new AuthService()

export class ProfileService {
    private readonly url = 'https://foto.techkronik.com';

    constructor() { }

    async createProfile(profile: Profile) {
        const config = await configService.fetchAppConfig()

        return await fetch(`${this.url}/createProfile`, {
            method: 'POST',
            body: JSON.stringify({
                tableName: config.dynamodb.profileTablename,
                region: config.region,
                item: { ...profile }
            })
        })
            .then(data => {
                console.log(data)
                return data
            })
            .catch(error => console.log(error))
    }

    async getProfile(id: string) {
        const config = await configService.fetchAppConfig()

        return await fetch(`${this.url}/getProfile`, {
            method: 'POST',
            body: JSON.stringify({
                tableName: config.dynamodb.profileTablename,
                region: config.region,
                profileId: id
            })
        })
            .then(res => res.json())
    }

    async updateProfile(profile: Profile) {
        const config = await configService.fetchAppConfig()

        return await fetch(`${this.url}/updateProfile`, {
            method: 'POST',
            body: JSON.stringify({
                tableName: config.dynamodb.profileTablename,
                region: config.region,
                item: { ...profile }
            })
        })
            .then(res => res.json())
            .catch(error => console.log(error))
    }

    getProfileAtStartup(profileContext: ProfileContextProps) {
        setTimeout(async () => {
            const token = await AsyncStorage.getItem('AccessToken');

            const isAuth = authService.isAuthenticated(token!);

            if (isAuth) {
                const user = await authService.getUserFromAccessToken(token!);
                const profileId = user?.UserAttributes?.find(
                    (attr) => attr.Name === 'custom:profileId'
                )?.Value!;

                profileContext.onGetProfile(profileId);
            }
        }, 1000);
    };



}