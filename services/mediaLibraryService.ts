import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { AuthService } from "./authServices";
import { ConfigService } from "./configService";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export enum PictureFormat {
  'ORIGINAL' = 'original',
  'THUMBNAILS' = 'thumbnails'
}


export class MediaLibraryService {
  private readonly configService = new ConfigService().fetchAppConfig();
  private readonly authService = new AuthService()


  constructor() { }

  //INIT S3 CLIENT
  private async initS3Client() {
    const config = await this.configService

    return new S3Client({
      region: config.region,
      credentials: await this.authService.getCognitoCredentials()

    })
  }


  async uploadPicture(file: Blob, keyId: string, format?: PictureFormat) {
    const client = await this.initS3Client()
    const config = await this.configService
    const identityId = (await this.authService.getIdentityId()).IdentityId


    const command = new PutObjectCommand({
      Bucket: config.s3.pictureRepoBucketName,
      Body: file,
      Key: `${config.project.name}/${!format ? 'original' : format}/${identityId}/${keyId}.jpg`,
      ContentType: file.type,
      ContentLength: file.size
    })

    const response = await client.send(command)
    return response
  }

  async getPictureUrl(keyId: string, format: PictureFormat) {
    const client = await this.initS3Client()
    const config = await this.configService
    const identityId = (await this.authService.getIdentityId()).IdentityId


    const command = new GetObjectCommand({
      Bucket: config.s3.pictureRepoBucketName,
      Key: `${config.project.name}/${!format ? 'original' : format}/${identityId}/${keyId}.jpg`,
    })

    return getSignedUrl(client, command, { expiresIn: 5000 })

  }

  async deleteProfilePictures(keyId: string) {
    try {
      await this.deletePicture(keyId, PictureFormat.ORIGINAL)
      await this.deletePicture(keyId, PictureFormat.THUMBNAILS)
    } catch (error) {
      console.log(error)
      return error
    }

  }

  async deletePicture(keyId: string, format: PictureFormat) {
    const client = await this.initS3Client()
    const config = await this.configService
    const identityId = (await this.authService.getIdentityId()).IdentityId


    const command = new DeleteObjectCommand({
      Bucket: config.s3.pictureRepoBucketName,
      Key: `${config.project.name}/${format}/${identityId}/${keyId}.jpg`,
    })

    const response = await client.send(command)
    return response

  }


  async convertURitoBlob(uri: string) {
    const response = await fetch(uri)
    const blob = await response.blob();
    return blob as Blob;
  };








}