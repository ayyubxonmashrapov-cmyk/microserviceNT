import {PartialType} from '@nestjs/mapped-types'
import { CreateYDto } from './user-create.dto';

export class UpdateUserdto extends PartialType(CreateYDto){}