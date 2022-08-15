import {google} from "googleapis"
import axios from "axios"
import fs from "fs"
import path from 'path';
import mime from "mime-types"
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEYFILEPATH = path.join(__dirname, "../key.json")
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
});

const drive = google.drive({version: 'v3', auth})

export async function uploadFile(file) {
    try{
      let fileMetadata = {
        'name': path.basename(file),
        'parents':  ['1I0b2y-5zj1m-IrH9danxQ8GuP4FFCbI_']
      };
   
      const {data} = await axios.get(file, {responseType: 'stream'})
      
      let media = {
        mimeType: mime.lookup(file),
        body: data
      };
      
      await drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: 'id'
      });
    }catch (error) {
    }
}