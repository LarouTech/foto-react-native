import { BehaviorSubject, from, lastValueFrom, take, tap } from "rxjs"

export interface Config {
    project: {
        name: string,
        domainName: string
    },
    region: string
    cognito: {
        userPoolId: string,
        userPoolClientId: string,
        identityPoolId: string
    },
    dynamodb: {
        profileTablename: string,
    },
    s3: {
        pictureRepoBucketName: string
    }
}

export class ConfigService {
    private readonly configUrl = 'https://foto.techkronik.com/config'

    constructor() { }

    async fetchAppConfig(): Promise<Config> {
        return await fetch(this.configUrl, {
            method: 'POST',
            body: JSON.stringify({
                region: 'us-east-1',
                parameter: '/foto/dev/config'
            })
        })
            .then(res => res.json())
            .then(json => JSON.parse(json.Value))
    };

}