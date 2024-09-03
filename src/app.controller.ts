import { BadRequestException, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer'
import { extname } from 'path';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/uploadXML')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadDir = './uploads';
          if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
          }
          cb(null, uploadDir); // Save to ./uploads directory
        },
        filename: (req, file, cb) => {
          const timestamp = Date.now();
          const random = Math.round(Math.random() * 1E9);
          const ext = extname(file.originalname);
          const filename = `${timestamp}-${random}${ext}`;
          console.log(`Saving file as: ${filename} in ./uploads`);
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(xml)$/)) {
          return cb(new BadRequestException('Only XML files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadXML(@UploadedFile() file: Multer.File): Promise<any> {
    if (!file) {
      throw new BadRequestException('File is not provided or invalid!');
    }
    
    console.log('File uploaded successfully:', file.filename);
    
    // Forward the filename to the service for further processing
    await this.appService.processUploadedFile(file.filename);

    // Return a JSON response
    return {
      message: `File ${file.filename} uploaded and processed successfully!`,
      filename: file.filename,
    };
  }

}


