import { Module } from '@nestjs/common';
import { ConfigModule }from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './client/user/user.controller';
import { AuthController } from './client/auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : '.env',
      isGlobal : true
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport : Transport.TCP,
        options : {
          host : String(process.env.AUTH_HOST),
          port : Number(process.env.AUTH_PORT),
        }
      }
    ]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport : Transport.TCP,
        options : {
          host : String(process.env.USER_HOST),
          port : Number(process.env.USER_PORT),
        }
      }
    ]),
    ClientsModule.register([
      {
        name: 'EDU_SERVICE',
        transport : Transport.TCP,
        options : {
          host : String(process.env.EDU_HOST),
          port : Number(process.env.EDU_PORT)
        }
      }
    ])
  ],
  controllers : [
    UserController,
    AuthController
  ]
})
export class AppModule {}
   