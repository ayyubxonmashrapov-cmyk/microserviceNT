import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { SingInDto } from "./dto/sign-in.dto";
import { successRes } from "../../helper/succesRes";
import { firstValueFrom } from 'rxjs'

@Controller('auth')
export class AuthController{
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient : ClientProxy
    ){}

    @Post('signin')
    async signIn(@Body() dto : SingInDto){
        return successRes(
            await firstValueFrom(this.authClient.send({ cmd : 'signIn' }, dto)),
            201
        )
    }
    
    @Post()
    async signout(){
        return 
    }
} 