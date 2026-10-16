import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateYDto } from "./dto/user-create.dto";
import { firstValueFrom } from 'rxjs'
import { UpdateUserdto } from "./dto/user_update.dto";
import { successRes } from "../../helper/succesRes"

@Controller('users')
export class UserController {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy
    ) { }

    @Post('create')
    async create(@Body() dto: CreateYDto) {
        return successRes(  
            await firstValueFrom(this.userClient.send({ cmd: 'createUser' }, dto)),
            201
        )
    }

    @Get('findAll')
    async findAll() {
        return successRes(
            await firstValueFrom(this.userClient.send({ cmd: 'findAll' }, {})),
        )
    }

    @Get('findOne/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return successRes(
            await firstValueFrom(this.userClient.send({ cmd: 'findOne' }, { id })),
        )
    }

    @Patch('update/:id')
    async update( 
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUserdto
    ) {
        return successRes(
            await firstValueFrom(this.userClient.send({ cmd: 'updateUser' }, { id, dto }))
        )
    }

    @Delete('delete/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return successRes(
            await firstValueFrom(this.userClient.send({ cmd: 'removeUser' }, { id }))
        )
    }
}